import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    type: 'string',
    title: 'Event ID',
    example: '9401a98a-c1bb-4506-8077-6a509741fe21',
  })
  
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    type: 'string',
    title: 'Event Name',
    example: 'Conference Teen 2025',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: 'string',
    title: 'Event start date',
    example: '2026-08-24T03:10:40.700Z',
  })
  @IsDate()
  @IsOptional() 
  startDate?: Date;

  @ApiPropertyOptional({
    type: 'string',
    title: 'Event end date',
    example: '2026-08-24T03:12:40.700Z',
  })
  @IsDate()
  @IsOptional() 
  endDate?: Date; 

  @ApiPropertyOptional({
    type: 'string',
    title: 'Address event',
    example: 'Av. José Fonseca e Silva',
  })
  @IsString()
  @IsOptional() 
  location?: string; 
  
  @ApiPropertyOptional({
    type: 'string',
    title: 'Description event',
    example: 'Conferência de desenvolvimento profissional',
  })
  @IsString()
  @IsOptional() 
  description?: string;

  @ApiPropertyOptional({
    type: 'string',
    title: 'Conference type',
    example: 'Conferência de Jovens',
  })
  @IsString()
  @IsOptional() 
  type?: string;

  @ApiProperty({
    type: 'boolean',
    title: 'Event active status',
    example: true,
  })
  @IsBoolean()
  @IsOptional() 
  isActive?: boolean;

  constructor(
    id: string,
    name: string,
    startDate: Date,
    endDate: Date,
    location: string,
    description: string,
    type: string,
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.description = description;
    this.type = type;
    this.isActive = true;
  }
}
