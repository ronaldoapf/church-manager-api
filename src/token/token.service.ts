import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class TokenService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string) {
    return this.prismaService.token.create({
      data: {
        type: 'PASSWORD_RECOVERY',
        userId,
      },
    })
  }

  async findByToken(token: string) {
    return this.prismaService.token.findUnique({
      where: {
        id: token,
      },
    })
  }
}
