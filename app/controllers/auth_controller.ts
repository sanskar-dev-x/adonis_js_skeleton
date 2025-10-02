import { AuthService } from '#services/auth_services'
import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, loginUserValidator } from '#validators/user'

export default class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  public async register({ request, response }: HttpContext) {
    try {
      const payload = await createUserValidator.validate(request.all())

      const user = await this.authService.register(payload)

      return response.created({ message: 'User Registration Successfull', user })
    } catch (error) {
      return response.badRequest({ message: "User Registration Failed" })
    }
  }

  public async login({ request, response, auth }: HttpContext) {
    try {
      const payload = await loginUserValidator.validate(request.all())

      const user = await this.authService.login(payload)

      const token = await auth.use('api').createToken(user)

      return response.created({ message: 'User LoggedIn Successfull', token: token.toJSON() })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await auth.check()
      return response.ok({ message: 'User Logged Out' })
    } catch (error) {
      return response.badRequest({ message: error.messages })
    }
  }
}
