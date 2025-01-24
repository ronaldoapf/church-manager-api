import { IsUUID } from 'class-validator'

export class MemberParamDto {
  @IsUUID()
  id: string

  constructor(id: string) {
    this.id = id
  }
}
