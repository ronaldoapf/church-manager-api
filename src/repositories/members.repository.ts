import { Member, Prisma } from "@prisma/client";

export abstract class MembersRepository {
  abstract update(id: string, data: Prisma.MemberUncheckedUpdateInput): Promise<Member | null>
  abstract findByEmail(email: string): Promise<Member | null>
  abstract create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>
  abstract findById(id: string): Promise<Member | null>
  abstract getAll(query?: any): Promise<Member[]>
}