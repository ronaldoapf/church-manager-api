import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/dtos/login-dto';
import { RegisterDto } from 'src/dtos/register-dto'; 
import { MembersRepository } from 'src/repositories/members.repository';
import { Member } from '@prisma/client'; 

interface RegisterResponse {
  newMember: any; 
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly membersRepository: MembersRepository,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const member = await this.membersRepository.findByEmail(email);
    if (!member) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: member.id, email: member.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    const { email, password, name, birthDate, address, phone } = registerDto;

    const existingMember = await this.membersRepository.findByEmail(email);
    if (existingMember) {
      throw new ConflictException("Member with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = await this.membersRepository.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      address,
      phone,  
    });

    if (!newMember) {
      throw new ConflictException("Failed to create a new member");
    }

    const payload = { sub: newMember.id, email: newMember.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      newMember,
      access_token: accessToken,
    };
  }

  async validateUser(payload: any): Promise<Member | null> {
    const { sub: memberId } = payload;
    const member = await this.membersRepository.findById(memberId);
    if (!member) {
      throw new UnauthorizedException('User not found');
    }
    return member;
  }
}
