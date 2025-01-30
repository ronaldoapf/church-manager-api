import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { permissions } from './permissions'
import { userSubject } from './subjects/user'
import { User } from './models/Member'
import { z } from 'zod'

const appAbilitiesSchema = z.union([
  userSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

@Injectable()
export class AuthorizationFactory {
  defineAbilitiesFor(user: User) {
    const builder = new AbilityBuilder(createAppAbility)
    if (typeof permissions[user.role] !== 'function') {
      throw new Error(`Permissions for role ${user.role} not found.`)
    }

    permissions[user.role](user, builder)

    const ability = builder.build({
      detectSubjectType(subject) {
        return subject.__typename
      },
    })

    return ability
  }
}
