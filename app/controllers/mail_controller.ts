import type { HttpContext } from '@adonisjs/core/http'
import mail from '@adonisjs/mail/services/main'

export default class MailController {
  async store({ request, response }: HttpContext) {
    const { from, subject, text } = request.only(['from', 'subject', 'text'])

    try {
      const result = await mail.send((message) => {
        message.to(process.env.MAIL_FROM_ADDRESS!).from(from).subject(subject).text(text)
      })

      response.ok({ message: 'Mail sent successfully', data: result })
    } catch (error) {
        console.error('Mail sending failed:', error)
        response.badRequest({ message: 'Mail sending failed', error })
    }
  }
}
