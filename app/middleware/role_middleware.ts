import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, roles: string[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized({ message: 'Not authenticated' })
    }

    if (!roles.includes(user.role)) {
      return ctx.response.forbidden({ message: 'Access denied' })
    }

    return next()
  }
}
