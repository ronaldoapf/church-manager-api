import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    type: 'string',
    title: 'Department Name',
    example: 'Worship',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    title: 'Department description',
    example: 'Department with focus in musics and ministrations',
  })
  @IsString()
  description: string;

  constructor(
    name: string,
    description: string,
  ) {
    this.name = name;
    this.description = description;
  }
}
