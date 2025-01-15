import { Controller, Get } from "@nestjs/common";
import { MembersRepository } from "src/repositories/members.repository";

@Controller('/members')
export class MemberController {
  constructor(private membersRepository: MembersRepository) {}

  @Get()
  async getUser() {
    const users = await this.membersRepository.getAll()

    return { users }
  }
}