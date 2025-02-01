import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    type: 'string',
    description: 'Member e-mail',
    example: 'johndoe@email.com',
  })
  @IsEmail({}, { message: 'Must be a valid e-mail' })
  email: string

  @ApiProperty({
    type: 'string',
    description: 'Member password',
    example: '12345678',
  })
  @IsString()
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}
