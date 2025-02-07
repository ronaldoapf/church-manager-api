import { Test, TestingModule } from '@nestjs/testing';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.event.findMany()
  }

  async findById(id: string) {
    return await this.prismaService.event.findUnique({
      where: {
        id,
      }
    })
  }

  async create(data: CreateEventDto) {
    return await this.prismaService.event.create({
      data,
    })
  }

  async update(data: UpdateEventDto) {
    const { id } = data;

    return await this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        ...data,
      }
    })
  }

  async remove(id: string) {
    return await this.prismaService.event.delete({
      where: {
        id,
      }
    })
  }
}
