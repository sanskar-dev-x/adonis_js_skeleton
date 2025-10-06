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
import DocumentsController from '#controllers/documents_controller'

router
  .group(() => {
    router.post('/register', async (ctx) => {
      return new AuthController().register(ctx)
    })

    router.post('/login', async (ctx) => {
      return new AuthController().login(ctx)
    })

    router
      .post('/logout', async (ctx) => {
        return new AuthController().logout(ctx)
      })
      .use(middleware.auth({ guards: ['api'] }))
  })
  .prefix('auth')

router
  .group(() => {
    router.post('/upload', async (ctx) => {
      return new DocumentsController().uploadDocs(ctx)
    })

    router
      .delete('/delete/:id', async (ctx) => {
        return new DocumentsController().deleteDocs(ctx)
      })
      .use(middleware.permission(['delete']))

    router.get('/', async (ctx) => {
      return new DocumentsController().getDocs(ctx)
    })

    router.get('/:id', async (ctx) => {
      return new DocumentsController().getFileDocs(ctx)
    })

    router.patch('/edit/:id', async (ctx) => {
      return new DocumentsController().editDocs(ctx)
    })
  })
  .prefix('docs')
  .use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    router.post('/getAll', async (ctx) => {
      return new DocumentsController().getAllDocs(ctx)
    })
  })
  .prefix('admin')
  .use([middleware.auth({ guards: ['api'] }), middleware.role(['admin'])])
