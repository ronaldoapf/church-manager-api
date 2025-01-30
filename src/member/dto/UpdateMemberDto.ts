import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Status } from '@prisma/client'
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator'

export class UpdateMemberDto {
  @ApiProperty({
    type: 'string',
    title: 'Member ID',
    example: '9401a98a-c1bb-4506-8077-6a509741fe21',
  })
  @IsUUID()
  id: string

  @ApiPropertyOptional({
    type: 'string',
    title: 'Member name',
    example: 'John Doe',
  })
  @IsString()
  name?: string

  @ApiPropertyOptional({
    type: 'string',
    title: 'Member e-mail',
    example: 'johndoe@email.com',
  })
  @IsEmail()
  email?: string

  @ApiPropertyOptional({
    type: 'string',
    title: 'Member address',
    example: 'Rua dos bobos, 0',
  })
  @IsString()
  address?: string

  @ApiPropertyOptional({
    type: 'string',
    title: 'Member birth date',
    example: '1997-08-24T03:10:40.700Z',
  })
  @IsString()
  birthDate?: Date

  @ApiPropertyOptional({
    type: 'string',
    title: 'Member phone',
    example: '34991192543',
  })
  @IsString()
  phone?: string

  @ApiPropertyOptional({
    type: 'array',
    title: 'Member status',
    enum: ['ACTIVE', 'INACTIVE'],
  })
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
