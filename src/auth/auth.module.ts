import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { MemberService } from 'src/member/member.service'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sokdaoskdi9234isadomaos',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, PrismaService, MemberService],
  controllers: [AuthController],
})
export class AuthModule {}
