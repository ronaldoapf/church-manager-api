import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginDto } from 'src/dtos/login-dto';
import type { RegisterDto } from 'src/dtos/register-dto';

interface RegisterResponse {
  newMember: any; 
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const token = await this.authService.login({ email, password });

    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { access_token: token.access_token };
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    const { newMember, access_token } = await this.authService.register(registerDto);

    return { newMember, access_token };
  }
}
