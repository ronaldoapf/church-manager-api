import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateDepartmentDto } from './dto/create-department.dto';
import type { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.department.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        events: {
          select: {
            id: true,
            name: true,
            startDate: true,
            location: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return await this.prismaService.department.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
        events: {
          select: {
            id: true,
            name: true,
            startDate: true,
            location: true,
          },
        },
      },
    });
  }

  async create(data: CreateDepartmentDto) {
    return await this.prismaService.department.create({
      data,
    });
  }

  async update(data: UpdateDepartmentDto) {
    const { id } = data;

    return await this.prismaService.department.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.department.delete({
      where: {
        id,
      },
    });
  }

  async addUser(departmentId: string, userId: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingUser = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        users: {
          where: {
            id: userId,
          },
        },
      },
    });

    if (existingUser && existingUser.users.length > 0) {
      throw new Error('User already exists in the department');
    }

    await this.prismaService.department.update({
      where: {
        id: departmentId,
      },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });

    return { message: 'User added to department' };
  }

  async removeUser(departmentId: string, userId: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingUser = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        users: {
          where: {
            id: userId,
          },
        },
      },
    });

    if (!existingUser || existingUser.users.length === 0) {
      throw new Error('User not found in the department');
    }

    await this.prismaService.department.update({
      where: {
        id: departmentId,
      },
      data: {
        users: {
          disconnect: { id: userId },
        },
      },
    });
  }

  async addEvent(departmentId: string, eventId: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const existingEvent = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        events: {
          where: {
            id: eventId,
          },
        },
      },
    });

    if (existingEvent && existingEvent.events.length > 0) {
      throw new Error('Event already exists in the department');
    }

    await this.prismaService.department.update({
      where: {
        id: departmentId,
      },
      data: {
        events: {
          connect: { id: eventId },
        },
      },
    });

    return { message: 'Event added to department' };
  }

  async removeEvent(departmentId: string, eventId: string) {
    const department = await this.prismaService.department.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        events: true,
      }
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const existingEvent = department.events.some(event => event.id === eventId);

    if (!existingEvent) {
      throw new Error('Event not found in the department');
    }

    await this.prismaService.department.update({
      where: {
        id: departmentId,
      },
      data: {
        events: {
          disconnect: { id: eventId },
        },
      },
    });

    return { message: 'Event removed from department' };
  }
}
