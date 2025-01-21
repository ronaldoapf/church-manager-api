import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembersRepository } from 'src/repositories/members.repository';
import { Member, Prisma } from '@prisma/client';

@Injectable()
export class PrismaMembersRepository implements MembersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MemberUncheckedCreateInput): Promise<Member> {
    return this.prisma.member.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.MemberUncheckedUpdateInput): Promise<Member | null> {
    return this.prisma.member.update({
      where: { id },
      data,
    });
  }

  async getAll(query?: any): Promise<Member[]> {
    return this.prisma.member.findMany(query);
  }

  async findManyMembers(filter: Prisma.MemberFindManyArgs): Promise<Member[]> {
    return this.prisma.member.findMany(filter);
  }

  async countMembers(filter: Prisma.MemberCountArgs): Promise<number> {
    return this.prisma.member.count(filter);
  }
}
