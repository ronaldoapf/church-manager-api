import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MembersRepository } from './repositories/members.repository';
import { PrismaMembersRepository } from './prisma/repositories/prisma-members.repository';
import { ConfigModule } from '@nestjs/config';
import { MembersController } from './http/controllers/members';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  exports: [MembersRepository],
  controllers: [MembersController],
  providers: [
    PrismaService,
    {
      provide: MembersRepository,
      useClass: PrismaMembersRepository,
    },
  ],
})
export class AppModule {}
