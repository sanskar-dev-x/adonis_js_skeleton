/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import MailController from '#controllers/mail_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')


router.resource('/mail', MailController)
