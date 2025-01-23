import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Must be a valid e-mail' })
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  name: string

  @IsDateString({})
  birthDate: Date

  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })
  address: string

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
