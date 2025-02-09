import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { JwtService } from '@nestjs/jwt'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, AuthGuard],
})
export class UserModule {}
