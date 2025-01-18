import { Injectable } from "@nestjs/common";
import { Prisma, Member } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { MembersRepository } from "src/repositories/members.repository";

@Injectable()
export class PrismaMembersRepository implements MembersRepository {
  constructor (private prismaService: PrismaService) {}
  
  async update(id: string, data: Prisma.MemberUpdateInput): Promise<Member | null> {
    const member = await this.prismaService.member.update({
      where: { id }, 
      data
    })

    return member
  }
  
  async findByEmail(email: string): Promise<Member | null> {
    const member =  await this.prismaService.member.findUnique({
      where: {
        email
      }
    })

    return member
  }

  async findById(id: string): Promise<Member | null> {
    const member = await this.prismaService.member.findUnique({
      where: { 
        id
      }
    })

    return member
  }

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