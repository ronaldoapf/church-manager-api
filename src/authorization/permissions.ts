import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from './authorization.factory'
import { User } from './models/Member'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can }) {
    can('manage', 'all')
  },
  MEMBER(user, { can }) {
    can('invite', 'User')
    can('manage', 'User', { id: { $eq: user.id } })
  },
}
