/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').render('pages/home')

router.post('/register', async (ctx) => {
  return new AuthController().register(ctx)
})

router
  .post('/login', async (ctx) => {
    return new AuthController().login(ctx)
  })

router
  .post('/logout', async (ctx) => {
    return new AuthController().logout(ctx)
  })
  .use(middleware.auth({ guards: ['api'] }))
