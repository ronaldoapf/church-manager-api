import { Module } from '@nestjs/common'
import { MemberController } from './member.controller'
import { MemberService } from './member.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [MemberController],
  providers: [MemberService, PrismaService],
})
export class MemberModule {}
