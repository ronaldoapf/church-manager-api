import { Member, Prisma } from '@prisma/client';

export abstract class MembersRepository {
  abstract create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>;
  abstract findByEmail(email: string): Promise<Member | null>;
  abstract findById(id: string): Promise<Member | null>;
  abstract update(id: string, data: Prisma.MemberUncheckedUpdateInput): Promise<Member | null>;
  abstract getAll(query?: any): Promise<Member[]>;
}
