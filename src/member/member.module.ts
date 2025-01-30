import { Module } from '@nestjs/common'
import { MemberController } from './member.controller'
import { MemberService } from './member.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [MemberController],
  providers: [MemberService, PrismaService, JwtService, AuthGuard],
})
export class MemberModule {}
