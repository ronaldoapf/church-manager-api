import { Status } from '@prisma/client'
import { IsDate, IsEmail, IsEnum, IsString, IsUUID } from 'class-validator'

export class UpdateMemberDto {
  @IsUUID()
  id: string

  @IsString()
  name?: string

  @IsEmail()
  email?: string

  @IsString()
  address?: string

  @IsString()
  birthDate?: Date

  @IsString()
  phone?: string

  @IsEnum(() => ['ACTIVE', 'INACTIVE'])
  status?: Status

  constructor(
    id: string,
    name: string,
    email: string,
    address: string,
    birthDate: Date,
    phone: string,
    status: Status,
  ) {
    this.id = id
    if (name) this.name = name
    if (email) this.email = email
    if (address) this.address = address
    if (birthDate) this.birthDate = birthDate
    if (phone) this.phone = phone
    if (status) this.status = status
  }
}
