/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

import mail from '@adonisjs/mail/services/main'

router.post('/mail', async ()=>{
    await mail.send((message) => {
      message
        .to('sanskargour321@gmail.com')
        .from(process.env.MAIL_FROM_ADDRESS!)
        .subject('Test email')
        .text('This is a test from Adonis Mail')
    })
})