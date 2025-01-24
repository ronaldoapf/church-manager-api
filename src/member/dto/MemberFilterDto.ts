import { Status } from '@prisma/client'
import { IsDate, IsEnum, IsOptional } from 'class-validator'
import { PaginationDto } from 'src/common/dtos/pagination-dto'

export class MemberFilterDto extends PaginationDto {
  @IsOptional()
  @IsDate()
  startBirthDate?: Date

  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE'])
  status?: Status

  @IsOptional()
  @IsDate()
  endBirthDate?: Date

  constructor(status: Status, endBirthDate: string, startBirthDate: string) {
    super()
    if (startBirthDate) this.startBirthDate = new Date(startBirthDate)
    if (endBirthDate) this.startBirthDate = new Date(startBirthDate)
    this.status = status ?? Status.ACTIVE
  }
}
