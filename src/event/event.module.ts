import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard'
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, JwtService, AuthGuard],
})
export class EventModule {}
