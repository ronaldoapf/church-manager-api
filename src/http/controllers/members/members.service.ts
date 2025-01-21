import { Injectable } from '@nestjs/common';
import type { FilterAgeDto } from 'src/dtos/filter-age.dto';
import { MembersRepository } from 'src/repositories/members.repository';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MembersRepository) {}

  async filterByAge(filterDto: FilterAgeDto) {
    const { ageRange, page = 1 } = filterDto;

    if (!ageRange) {
      throw new Error('Faixa etária não fornecida');
    }

    const [minAge, maxAge] = ageRange.split('-').map(Number);

    const members = await this.memberRepository.findManyMembers({
      where: {
        birthDate: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)),
          lt: new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
        },
      },
      skip: (page - 1) * 10,
      take: 10,
    });

    const total = await this.memberRepository.countMembers({
      where: {
        birthDate: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - maxAge)),
          lt: new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
        },
      },
    });

    return {
      data: members,
      total,
      page,
      totalPages: Math.ceil(total / 10),
    };
  }
}