import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({
    type: 'string',
    title: 'Department ID',
    example: '9401a98a-c1bb-4506-8077-6a509741f2e21',
  })
  @IsUUID()
  id!: string;

  @ApiPropertyOptional({
    type: 'string',
    title: 'Department Name',
    example: 'Worship',
  })
  @IsString()
  @IsOptional()
  name?: string;
  
  @ApiPropertyOptional({
    type: 'string',
    title: 'Description Department',
    example: 'Department with focus in musics and ministrations',
  })
  @IsString()
  @IsOptional() 
  description?: string;

  constructor(
    id: string,
    name: string,
    description: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
