import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaMembersRepository } from 'src/prisma/repositories/prisma-members.repository'; 
import { MembersRepository } from 'src/repositories/members.repository'; 
import { PrismaService } from 'src/prisma/prisma.service';  

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'sokdaoskdi9234isadomaos', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  providers: [
    AuthService,
    PrismaService, 
    {
      provide: MembersRepository,
      useClass: PrismaMembersRepository, 
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
