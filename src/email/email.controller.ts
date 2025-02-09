import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-code')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    description: 'Enviar o código de verificação',
    type: Object,
  })
  @UseGuards(AuthGuard)
  async sendVerificationCode(
    @Body() body: { to: string },
    @Request() req: any,
  ) {
    const { to } = body;
    const from = req.user.email;
    return await this.emailService.sendVerificationCode(to, from);
  }

  @Post('/verify-code')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'Verificar o código de verificação',
    type: Object,
  })
  async verifyCode(
    @Body() body: { email: string; code: string },
  ) {
    const { email, code } = body;
    return await this.emailService.verifyCode(email, code);
  }
}
