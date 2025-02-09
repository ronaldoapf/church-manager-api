import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard'
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService, JwtService, AuthGuard],
})
export class DepartmentModule {}
