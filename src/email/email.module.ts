import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  providers: [EmailService, PrismaService, JwtService, AuthGuard],
  controllers: [EmailController]
})
export class EmailModule {}
