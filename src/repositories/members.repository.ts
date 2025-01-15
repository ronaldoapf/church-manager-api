import { Member, Prisma } from "@prisma/client";

export abstract class MembersRepository {
  abstract create(data: Prisma.MemberUncheckedCreateInput): Promise<Member>
  abstract getAll(): Promise<Member[]>
}