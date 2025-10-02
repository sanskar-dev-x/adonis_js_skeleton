import type { HttpContext } from '@adonisjs/core/http'
import { DocumentService } from '#services/document_service'

export default class DocumentsController {
  private documentService: DocumentService

  constructor() {
    this.documentService = new DocumentService()
  }

  public async uploadDocs({ request, response, auth }: HttpContext) {
    try {
      const data = request.only(['title', 'description'])

      const document = request.file('document', {
        size: '5mb',
        extnames: ['pdf', 'jpg', 'png'],
      })

      const user = auth.user!

      const doc = await this.documentService.uploadDoc(data, document, user)

      return response.created({ message: 'Documents Uploaded Successfull', doc })
    } catch (error) {
      return response.badRequest({ message: error.message, error: error })
    }
  }

  public async getDocs({ response, auth }: HttpContext) {
    try {
      const user = auth.user!
      const docs = await this.documentService.getDocs(user)
      return response.ok({ message: 'Documents Retrieved Successfull', docs })
    } catch (error) {
      return response.badRequest({ message: error.message, error: error })
    }
  }

  public async getFileDocs({ response, auth, params }: HttpContext) {
    try {
      const docId = params.id
      const user = auth.user!
      const docs = await this.documentService.getFileDocs(user, docId)
      return response.ok({ message: 'File Retrieved Successfull', docs })
    } catch (error) {
      return response.badRequest({ message: error.message, error: error })
    }
  }

  public async deleteDocs({ response, auth, params }: HttpContext) {
    try {
      const docId = params.id
      const user = auth.user!
      const doc = await this.documentService.deleteDocs(user, docId)

      return response.ok({ message: 'Documents Deleted Successfull', doc })
    } catch (error) {
      return response.badRequest({ message: error.message, error: error })
    }
  }

  public async editDocs({ request, response, auth, params }: HttpContext) {
    try {
      const docId = params.id
      const user = auth.user!
      const data = request.only(['title', 'description'])

      const doc = await this.documentService.editDocs(user, docId, data)

      return response.ok({ message: 'Documents Edited Successfull', doc })
    } catch (error) {
      return response.badRequest({ message: error.message, error: error })
    }
  }
}
