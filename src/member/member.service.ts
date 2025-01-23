import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateMemberDto } from './dto/UpdateMemberDto'
import { MemberFilterDto } from './dto/MemberFilterDto'
import { Prisma, Status } from '@prisma/client'

interface FindManyAndCountProps {
  status?: Status
  startBirthDate?: Date
  endBirthDate?: Date
}

@Injectable()
export class MemberService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.member.findMany({
      omit: {
        password: true,
      },
    })
  }

  async findManyAndCount(filter: MemberFilterDto) {
    const { page, status, startBirthDate, endBirthDate, limit } = filter

    const skip = (page - 1) * limit
    const omit = {
      password: true,
    }

    const where: FindManyAndCountProps = {}

    if (status) where.status = status

    if (startBirthDate) where.startBirthDate = startBirthDate

    if (endBirthDate) where.endBirthDate = endBirthDate

    const [data, total] = await Promise.all([
      this.prismaService.member.findMany({
        skip,
        omit,
        where,
        take: limit,
      }),
      this.prismaService.member.count({ where }),
    ])

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string) {
    return await this.prismaService.member.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })
  }

  async findByEmail(email: string) {
    return this.prismaService.member.findUnique({
      where: { email },
    })
  }

  async create(data: Prisma.MemberUncheckedCreateInput) {
    return this.prismaService.member.create({
      data,
    })
  }

  async update(data: UpdateMemberDto) {
    const { id } = data

    return await this.prismaService.member.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
      omit: {
        password: true,
      },
    })
  }
}
