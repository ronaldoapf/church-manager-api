import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsDate, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';  

export class CreateEventDto {
  @ApiProperty({
    type: 'string',
    title: 'Event Name',
    example: 'Conference Teen 2025',
  })
  @IsString()
  name: string;

  
  @ApiProperty({
    type: 'string',
    title: 'Event start date',
    example: '2026-08-24T03:10:40.700Z',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))  
  startDate: Date;

  @ApiProperty({
    type: 'string',
    title: 'Event end date',
    example: '2026-08-24T03:12:40.700Z',
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))  
  endDate: Date;

  @ApiProperty({
    type: 'string',
    title: 'Address event',
    example: 'Av. José Fonseca e Silva',
  })
  @IsString()
  location: string;

  @ApiProperty({
    type: 'string',
    title: 'Event description',
    example: 'Conferência de desenvolvimento profissional',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'string',
    title: 'Event type',
    example: 'Conferência de Jovens',
  })
  @IsString()
  type: string;

  @ApiProperty({
    type: 'boolean',
    title: 'Event active status',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    type: 'string',
    title: 'Creator User ID',
    example: '9401a98a-c1bb-4506-8077-6a509741fe21',
  })
  @IsUUID()
  createdById: string;

  constructor(
    name: string,
    startDate: Date,
    endDate: Date,
    location: string,
    description: string,
    type: string,
    isActive: boolean = true,
    createdById: string,
  ) {
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.description = description;
    this.type = type;
    this.isActive = isActive;
    this.createdById = createdById;
  }
}
