import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register-dto'
import { LoginDto } from './dto/login-dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from './auth.guard'

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto

    const token = await this.authService.login({ email, password })

    if (!token) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return { access_token: token.access_token }
  }

  @Post('/register')
  @ApiBody({ type: RegisterDto })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto)
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @ApiBody({ type: RegisterDto })
  async getUserProfile(@Req() request) {
    const user = await this.authService.validateUser(request.user)
    return {
      user,
    }
  }
}
