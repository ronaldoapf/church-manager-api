import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty({
    type: 'string',
    description: 'Request password code',
    example: 'cd88a83c-2c45-4637-8473-4ca6ac2a81fd',
  })
  @IsUUID()
  code: string

  @ApiProperty({
    type: 'string',
    description: 'New password user account',
  })
  @IsString()
  password: string

  constructor(code: string, password: string) {
    this.code = code
    this.password = password
  }
}
