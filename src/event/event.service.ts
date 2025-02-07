import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.event.findMany({
      include: {
        eventMembers: {
          select: {
            user: {
              select: {
                id: true, 
                name: true,   
                role: true,   
              },
            },
          },
        },
      },
    }).then(events => {
      return events.map(event => ({
        ...event,
        eventMembers: event.eventMembers.map(member => ({
          id: member.user.id,
          name: member.user.name,
          role: member.user.role,
        })),
      }));
    });
  }

  async findById(id: string) {
    return await this.prismaService.event.findUnique({
      where: {
        id,
      },
      include: {
        eventMembers: {
          select: {
            user: {
              select: {
                id: true,   
                name: true,  
                role: true,   
              },
            },
          },
        },
      },
    }).then(event => {
      if (!event) return null;
      
      return {
        ...event,
        eventMembers: event.eventMembers.map(member => ({
          id: member.user.id,
          name: member.user.name,
          role: member.user.role,
        })),
      };
    });
  }

  async create(data: CreateEventDto) {
    return await this.prismaService.event.create({
      data,
    });
  }

  async update(data: UpdateEventDto) {
    const { id } = data;

    return await this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.event.delete({
      where: {
        id,
      },
    });
  }

  async addMember(eventId: string, userId: string) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingMember = await this.prismaService.eventMember.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    });

    if (existingMember) {
      throw new Error('User is already a member of this event');
    }

    const eventMember = await this.prismaService.eventMember.create({
      data: {
        userId,
        eventId,
      },
    });

    return eventMember;
  }

  async removeMember(eventId: string, userId: string) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });
  
    if (!event) {
      throw new Error('Event not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    if (!user) {
      throw new Error('User not found');
    }

    const eventMember = await this.prismaService.eventMember.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
  
    if (!eventMember) {
      throw new Error('User is not a member of this event');
    }

    await this.prismaService.eventMember.delete({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
  
    return { message: 'Member removed from event' };
  }
  
}
