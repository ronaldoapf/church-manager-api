import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MembersRepository } from './repositories/members.repository';
import { PrismaMembersRepository } from './prisma/repositories/prisma-members.repository';
import { MembersController } from './http/controllers/members';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  })],
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
