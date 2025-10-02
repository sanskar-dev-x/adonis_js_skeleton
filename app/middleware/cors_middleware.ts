import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CorsMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    // console.log(ctx)

    const { response, request } = ctx

    response.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.header('Access-Control-Allow-Credentials', 'true')

    // Handle preflight requests (OPTIONS)
    if (request.method() === 'OPTIONS') {
      return response.status(204)
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}