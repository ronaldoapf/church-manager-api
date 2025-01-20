import { 
  Body, 
  ConflictException, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  Param, 
  Post, 
  Put, 
  Query, 
  UsePipes 
} from "@nestjs/common";
import { MembersRepository } from "src/repositories/members.repository";
import { createMemberBodySchema, CreateMemberBodySchema, UpdateMemberBodySchema } from "./types";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";


interface MemberParams {
  id: string
}

@Controller('/members')
export class MembersController {
  constructor(private membersRepository: MembersRepository) {}

  @Get()
  @HttpCode(200)
  async getMembers(@Query() query: any) {
    const members = await this.membersRepository.getAll()

    return { members }
  }

  @Get("/:id")
  @HttpCode(200)
  async getMember(@Param() { id }: MemberParams) {
    const member = await this.membersRepository.findById(id)

    return { member }
  }

  @Put("/:id")
  @HttpCode(200)
  async updateMember(@Param() param: MemberParams, @Body() body: UpdateMemberBodySchema) {
    
    const { address, birthDate, name, phone } = body
    
    const member = await this.membersRepository.update(param.id, {
      address, birthDate, name, phone
    })
    
    return { member }
  }

  @Delete("/:id")
  @HttpCode(200)
  async deleteMember(@Param() param: MemberParams) {
    
    const member = await this.membersRepository.update(param.id, { status: 'INACTIVE' })
    
    return { member }
  }

  @Put("/:id/activate")
  @HttpCode(200)
  async activateMember(@Param() param: MemberParams) {
    
    const member = await this.membersRepository.update(param.id, { status: 'ACTIVE' })
    
    return { member }
  }
}