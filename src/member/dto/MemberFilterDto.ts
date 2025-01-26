import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Status } from '@prisma/client'
import { IsDateString, IsEnum, IsOptional } from 'class-validator'
import { PaginationDto } from 'src/common/dtos/pagination-dto'

export class MemberFilterDto extends PaginationDto {
  @ApiProperty({
    type: 'string',
    description: 'Member birth date',
    example: '1997-08-24T03:10:40.700Z',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: Date

  @ApiPropertyOptional({
    type: 'array',
    enum: ['ACTIVE', 'INACTIVE'],
    description: 'Member status',
    example: 'ACTIVE',
    default: 'ACTIVE',
  })
  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE'])
  status?: Status

  constructor(status: Status, birthDate: string) {
    super()
    if (birthDate) this.birthDate = new Date(birthDate)
    this.status = status ?? Status.ACTIVE
  }
}
