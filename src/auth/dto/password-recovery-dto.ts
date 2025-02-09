import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class PasswordRecoveryDto {
  @ApiProperty({
    type: 'string',
    description: 'User e-mail',
    example: 'johndoe@email.com',
  })
  @IsEmail({}, { message: 'Must be a valid e-mail' })
  email: string

  constructor(email: string) {
    this.email = email
  }
}
