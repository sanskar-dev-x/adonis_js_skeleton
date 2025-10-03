import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { Exception } from '@adonisjs/core/exceptions'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest extends LoginRequest {
  fullName: string
  role: 'user' | 'admin'
}

export class AuthService {
  public async register(payload: RegisterRequest) {
    const user = await User.create({
      email: payload.email,
      fullName: payload.fullName,
      password: await hash.make(payload.password),
      role: payload.role
    })

    return user
  }

  public async login(payload: LoginRequest) {
    const user = await User.findBy({
      email: payload.email,
    })

    if (!user) {
      throw new Exception('User not found', { status: 404 })
    }

    const isValid = await hash.verify(user.password, payload.password)

    if (!isValid) {
      throw new Exception('Invalid credentials', { status: 401 })
    }

    return user
  }
}
