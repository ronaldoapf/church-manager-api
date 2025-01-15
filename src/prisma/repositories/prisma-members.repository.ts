import { Injectable } from "@nestjs/common";
import { Prisma, Member } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { MembersRepository } from "src/repositories/members.repository";

@Injectable()
export class PrismaMembersRepository implements MembersRepository {
  constructor (private prismaService: PrismaService) {}

  async create(data: Prisma.MemberUncheckedCreateInput): Promise<Member> {
    const member = await this.prismaService.member.create({
      data
    })

    return member
  }

  async getAll(): Promise<Member[]> {
    const members = await this.prismaService.member.findMany()

    return members
  }

}