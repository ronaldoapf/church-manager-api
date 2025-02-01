import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    type: 'string',
    description: 'Member e-mail',
    example: 'johndoe@email.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Must be a valid e-mail' })
  email: string

  @ApiProperty({
    type: 'string',
    description: 'Member password',
  })
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty({
    type: 'string',
    description: 'Member name',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  name: string

  @ApiProperty({
    type: 'string',
    description: 'Member birth date',
    example: '1997-08-24T03:10:40.700Z',
    required: true,
  })
  @IsDateString()
  birthDate: Date

  @ApiProperty({
    type: 'string',
    description: 'Member address',
    example: 'Rua dos bobos, 0',
    required: true,
  })
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  address: string

  @ApiPropertyOptional({
    type: 'string',
    description: 'Member phone number',
    example: '34991192543',
  })
  @IsPhoneNumber('BR')
  phone?: string

  constructor(
    email: string,
    password: string,
    name: string,
    birthDate: Date,
    address: string,
    phone?: string,
  ) {
    this.email = email
    this.password = password
    this.name = name
    this.birthDate = birthDate
    this.address = address
    if (phone) {
      this.phone = phone
    }
  }
}
