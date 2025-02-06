import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserParamDto } from './dto/user-param-dto'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { UserFilterDto } from './dto/user-filter-dto'
import { UpdateUserDto } from './dto/update-user-dto'

@ApiTags('members')
@UseGuards(AuthGuard)
@Controller('/members')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(200)
  async getMembers(@Query() filter: UserFilterDto) {
    const members = await this.userService.findManyAndCount(filter)

    return { members }
  }

  @Get('/:id')
  @HttpCode(200)
  async getMember(@Param() param: UserParamDto) {
    const { id } = param

    const member = await this.userService.findById(id)

    return { member }
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteMember(@Param() param: UserParamDto) {
    const { id } = param

    await this.userService.update({
      id,
      status: 'INACTIVE',
    })
  }

  @Put('/:id')
  @HttpCode(200)
  async updateMember(
    @Param() param: UserParamDto,
    @Body() body: UpdateUserDto,
  ) {
    const { id } = param

    const { email, address, birthDate, name, phone } = body

    const member = await this.userService.update({
      id,
      name,
      phone,
      email,
      address,
      birthDate,
    })

    return { member }
  }

  @Put('/:id/activate')
  @HttpCode(200)
  async activateMember(@Param() param: UserParamDto) {
    const { id } = param

    await this.userService.update({
      id,
      status: 'ACTIVE',
    })
  }
}
