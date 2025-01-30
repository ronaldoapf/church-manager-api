import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { LoginDto } from 'src/auth/dto/login-dto'
import { MemberService } from 'src/member/member.service'
import { RegisterDto } from './dto/register-dto'

interface PayloadSub {
  sub: string
  email: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly membersService: MemberService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const member = await this.membersService.findByEmail(email)

    if (!member) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(password, member.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: PayloadSub = { sub: member.id, email: member.email }
    const accessToken = await this.jwtService.signAsync(payload)

    return {
      access_token: accessToken,
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name, birthDate, address, phone } = registerDto

    const existingMember = await this.membersService.findByEmail(email)

    if (existingMember) {
      throw new ConflictException('Member with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const birthMonth = new Date(birthDate).getMonth() + 1

    await this.membersService.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      address,
      phone,
      birthMonth,
    })
  }

  async validateUser(payload: PayloadSub) {
    const { sub: memberId } = payload
    const member = await this.membersService.findById(memberId)
    if (!member) {
      throw new UnauthorizedException('User not found')
    }

    return member
  }
}
