import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import type { LoginDto } from 'src/auth/dto/login-dto'
import { RegisterDto } from './dto/register-dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto

    const token = await this.authService.login({ email, password })

    if (!token) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return { access_token: token.access_token }
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto)
  }
}
