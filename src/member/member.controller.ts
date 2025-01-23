import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
} from '@nestjs/common'
import { MemberService } from './member.service'
import { UpdateMemberDto } from './dto/UpdateMemberDto'
import { MemberParamDto } from './dto/MemberParamDto'
import { MemberFilterDto } from './dto/MemberFilterDto'

@Controller('/members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @HttpCode(200)
  async getMembers(@Query() filter: MemberFilterDto) {
    const members = await this.memberService.findManyAndCount(filter)

    return { members }
  }

  @Get('/:id')
  @HttpCode(200)
  async getMember(@Param() param: MemberParamDto) {
    const { id } = param

    const member = await this.memberService.findById(id)

    return { member }
  }

  @Put('/:id')
  @HttpCode(200)
  async updateMember(
    @Param() param: MemberParamDto,
    @Body() body: UpdateMemberDto,
  ) {
    const { id } = param

    const { email, address, birthDate, name, phone } = body

    const member = await this.memberService.update({
      id,
      name,
      phone,
      email,
      address,
      birthDate,
    })

    return { member }
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteMember(@Param() param: MemberParamDto) {
    const { id } = param

    await this.memberService.update({
      id,
      status: 'INACTIVE',
    })
  }

  @Put('/:id/activate')
  @HttpCode(200)
  async activateMember(@Param() param: MemberParamDto) {
    const { id } = param

    await this.memberService.update({
      id,
      status: 'ACTIVE',
    })
  }
}
