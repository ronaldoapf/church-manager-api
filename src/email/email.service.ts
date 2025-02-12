import { Injectable, InternalServerErrorException, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import * as sib from 'sib-api-v3-sdk';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment';

@Injectable()
export class EmailService {
  private client;

  constructor(
    private readonly prisma: PrismaService,
  ) {
    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      throw new InternalServerErrorException('Brevo API key is not defined');
    }

    this.client = sib.ApiClient.instance;
    const apiKey = this.client.authentications['api-key'];
    apiKey.apiKey = brevoApiKey;
  }

  generateRandomCode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  async sendVerificationCode(to: string, from: string) {
    const user = await this.prisma.user.findUnique({ where: { email: to } });

    if (!user) {
      throw new NotFoundException('Usuário destinatário não encontrado');
    }

    const senderUser = await this.prisma.user.findUnique({
      where: { email: from },
    });

    if (!senderUser) {
      throw new NotFoundException('Remetente não encontrado');
    }

    const department = await this.prisma.department.findFirst({
      where: {
        users: {
          some: {
            id: senderUser.id,
          },
        },
      },
    });

    if (!department) {
      throw new NotFoundException('Departamento não encontrado para o remetente.');
    }

    const userAlreadyInDepartment = await this.prisma.department.findFirst({
      where: {
        id: department.id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });

    if (userAlreadyInDepartment) {
      throw new ConflictException('Usuário já é membro deste departamento.');
    }

    let verificationCode: string;
    let expiresAt: Date;

    if (user.verificationExpiresAt && moment().isBefore(user.verificationExpiresAt)) {
      throw new BadRequestException('O código ainda está válido. Tente novamente após alguns minutos.');
    }

    verificationCode = this.generateRandomCode();
    expiresAt = moment().add(3, 'minutes').toDate();

    await this.prisma.user.update({
      where: { email: to },
      data: {
        verificationCode,
        verificationExpiresAt: expiresAt,
        verificationSender: from,
      },
    });

    const apiInstance = new sib.TransactionalEmailsApi();
    const sendSmtpEmail = new sib.SendSmtpEmail();

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = 'Seu código de verificação';
    sendSmtpEmail.textContent = `Seu código de verificação é: ${verificationCode}. Ele expira em 3 minutos.`;
    sendSmtpEmail.htmlContent = `<h1>Seu código de verificação é: ${verificationCode}</h1><p>Ele expira em 3 minutos.</p>`;
    sendSmtpEmail.sender = { email: from };

    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      return { message: 'Email enviado com sucesso', statusCode: 201 };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao enviar e-mail');
    }
  }

  async verifyCode(email: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.verificationCode) {
      throw new NotFoundException('Usuário não encontrado ou código não gerado.');
    }

    if (moment().isAfter(user.verificationExpiresAt)) {
      throw new BadRequestException('O código expirou.');
    }

    if (user.verificationCode !== code) {
      throw new BadRequestException('Código inválido.');
    }

    if (!user.verificationSender) {
      throw new InternalServerErrorException('Remetente não encontrado.');
    }

    const senderUser = await this.prisma.user.findUnique({
      where: { email: user.verificationSender },
    });

    if (!senderUser) {
      throw new NotFoundException('Remetente não encontrado.');
    }

    const department = await this.prisma.department.findFirst({
      where: {
        users: {
          some: {
            id: senderUser.id,
          },
        },
      },
    });

    if (!department) {
      throw new NotFoundException('Departamento não encontrado para o remetente.');
    }

    const userAlreadyInDepartment = await this.prisma.department.findFirst({
      where: {
        id: department.id,
        users: {
          some: {
            id: user.id,
          },
        },
      },
    });

    if (userAlreadyInDepartment) {
      throw new ConflictException('Usuário já é membro deste departamento.');
    }

    await this.prisma.department.update({
      where: {
        id: department.id,
      },
      data: {
        users: {
          connect: { id: user.id },
        },
      },
    });

    return { message: 'Código verificado com sucesso e usuário adicionado ao departamento.', statusCode: 200 };
  }
}
