import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export class EventParamDto {
  @ApiProperty({
    type: 'string',
    title: 'Event ID',
    example: '9401a98a-c1bb-4506-8077-6a509741fe21',
  })
  @IsUUID()
  id: string

  constructor(id: string) {
    this.id = id
  }
  
}