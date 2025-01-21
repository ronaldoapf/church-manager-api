import { ConflictException, Injectable } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { RegisterDto } from "src/dtos/register-dto";
import type { MembersRepository } from "src/repositories/members.repository";
import bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly membersRepository: MembersRepository,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, birthDate, address, phone } = registerDto;

    const existingMember = await this.membersRepository.findByEmail(email);
    if (existingMember) {
      throw new ConflictException('Member with this email already exists');
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
      throw new ConflictException('Failed to create a new member');
    }

    const payload = { sub: newMember.id, email: newMember.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      newMember,
      access_token: accessToken,
    };
  }
}
