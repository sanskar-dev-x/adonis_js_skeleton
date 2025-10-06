import { RolePermissions } from '#config/permissions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class PermissionMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn, actions: string[]) {
    const user = auth.user!

    // tells TS : user.role will always be one of the keys inside RolePermissions ('user' or 'admin')
    const userPermissions = RolePermissions[user.role as keyof typeof RolePermissions]

    const hasPermission = actions.every((action) => userPermissions.includes(action))

    if (!hasPermission) {
      return response.forbidden({ message: 'You do not have permission for this action.' })
    }

    const output = await next()
    return output
  }
}
