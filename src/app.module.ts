import { Module } from '@nestjs/common';
import { MemberController } from './http/controllers/member.controller';
import { PrismaService } from './prisma/prisma.service';
import { MembersRepository } from './repositories/members.repository';
import { PrismaMembersRepository } from './prisma/repositories/prisma-members.repository';

@Module({
  exports: [MembersRepository],
  controllers: [MemberController],
  providers: [
    PrismaService,
    {
      provide: MembersRepository,
      useClass: PrismaMembersRepository,
    },
  ],
})
export class AppModule {}
