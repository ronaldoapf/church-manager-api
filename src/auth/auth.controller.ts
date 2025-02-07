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
import { PasswordRecoveryDto } from './dto/password-recovery-dto'
import { ResetPasswordDto } from './dto/reset-password-dto'

@ApiTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
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
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RegisterDto })
  async getUserProfile(@Req() request) {
    const user = await this.authService.validateUser(request.user)
    return {
      user,
    }
  }

  @Post('/password/recovery')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: PasswordRecoveryDto })
  async requestPasswordReset(@Body() body: PasswordRecoveryDto) {
    const { email } = body
    const token = await this.authService.requestPasswordReset(email)

    return {
      token: token.id,
      message: 'Password reset request sent',
    }
  }

  @Post('/password/reset')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() body: ResetPasswordDto) {
    const { code, password } = body

    const token = await this.authService.resetPassword({ code, password })
  }
}
