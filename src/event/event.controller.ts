import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard'
import type { EventParamDto } from './dto/event-param-dto';

@ApiTags('event')
@UseGuards(AuthGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  findAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findById(id);
  }

  @Post()
  @ApiBody({ type: CreateEventDto })
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  @Put(':id')
  @HttpCode(200)
  async updateEvent(
    @Param() param: EventParamDto,
    @Body() body: UpdateEventDto,
  ) {
    const { id } = param;

    const { name, startDate, endDate, location, description, type, isActive } = body;

    const event = await this.eventService.update({
      id,
      name,
      startDate,
      endDate,
      location,
      description,
      type,
      isActive,
    });

    return { event };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}

