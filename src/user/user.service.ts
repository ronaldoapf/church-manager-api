import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma, Status } from '@prisma/client'
import { calculatePagination } from 'src/utils/calculate-pagination'
import { UserFilterDto } from './dto/user-filter-dto'
import { UpdateUserDto } from './dto/update-user-dto'

interface FindManyAndCountProps {
  status?: Status
  birthMonth?: number
  endBirthDate?: Date
}

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    })
  }

  async findManyAndCount(filter: UserFilterDto) {
    const { page, status, birthDate, limit } = filter

    const { skip } = calculatePagination({ page, limit })

    const omit = {
      password: true,
    }

    const where: FindManyAndCountProps = {}

    if (status) where.status = status

    if (birthDate) {
      where.birthMonth = new Date(birthDate).getMonth() + 1
    }

    const [data, total] = await Promise.all([
      this.prismaService.user.findMany({
        skip,
        omit,
        where,
        take: limit,
      }),
      this.prismaService.user.count({ where }),
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
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    })
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    return this.prismaService.user.create({
      data,
    })
  }

  async update(data: UpdateUserDto) {
    const { id } = data

    return await this.prismaService.user.update({
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
