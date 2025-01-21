import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  Param, 
  Put, 
  Query, 
  UsePipes 
} from "@nestjs/common";
import { MembersRepository } from "src/repositories/members.repository";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { CreateMemberBodySchema, UpdateMemberBodySchema } from "./types";
import type { FilterAgeDto } from "src/dtos/filter-age.dto";


interface MemberParams {
  id: string;
}

@Controller('/members')
export class MembersController {
  constructor(private membersRepository: MembersRepository) {}

  @Get()
  @HttpCode(200)
  async getMembers(@Query() query: FilterAgeDto) {
    const { ageRange, page = 1 } = query;

    const filter: any = {};

    if (ageRange) {
      const [minAge, maxAge] = ageRange.split('-').map(Number);
      filter.birthDate = {
        gte: new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)),
        lt: new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
      };
    }

    const skip = (page - 1) * 10;
    const take = 10;

    const members = await this.membersRepository.findManyMembers({
      where: filter,
      skip,
      take,
    });

    const total = await this.membersRepository.countMembers({
      where: filter,
    });

    return {
      data: members,
      total,
      page,
      totalPages: Math.ceil(total / 10),
    };
  }

  @Get("/:id")
  @HttpCode(200)
  async getMember(@Param() { id }: MemberParams) {
    const member = await this.membersRepository.findById(id);
    return { member };
  }

  @Put("/:id")
  @HttpCode(200)
  async updateMember(@Param() param: MemberParams, @Body() body: UpdateMemberBodySchema) {
    const { address, birthDate, name, phone } = body;
    const member = await this.membersRepository.update(param.id, {
      address, birthDate, name, phone
    });
    return { member };
  }

  @Delete("/:id")
  @HttpCode(200)
  async deleteMember(@Param() param: MemberParams) {
    const member = await this.membersRepository.update(param.id, { status: 'INACTIVE' });
    return { member };
  }

  @Put("/:id/activate")
  @HttpCode(200)
  async activateMember(@Param() param: MemberParams) {
    const member = await this.membersRepository.update(param.id, { status: 'ACTIVE' });
    return { member };
  }
}
