import Document from '#models/document'
import { Exception } from '@adonisjs/core/exceptions'
import app from '@adonisjs/core/services/app'
import { promises as fs } from 'node:fs'

interface DocumentPayload {
  title: string | null
  description: string | null
}

interface User {
  id: number
}

export class DocumentService {
  public async uploadDoc(data: DocumentPayload, document: any, user: User) {
    if (!document) {
      throw new Exception('Please upload a file')
    }

    if (!document.isValid) {
      throw new Exception('Uploaded File Not Valid')
    }

    const filePath = app.makePath(`public/uploads/${user.id}`)

    await document.move(filePath, {
      name: `${Date.now()}_${document.clientName}`,
    })

    const newDoc = await Document.create({
      title: data.title,
      description: data.description,
      filename: document.fileName!,
      url: `uploads/${user.id}/${document.fileName}`,
      userId: user.id,
    })

    if (!newDoc) {
      throw new Exception('Error Uploading File')
    }

    return newDoc
  }

  public async getDocs(user: User) {
    const docs = await Document.query().where('user_id', user.id)

    if (!docs) {
      throw new Exception('Error Retrieving  File')
    }

    return docs
  }

  public async getAllDocs() {
    const docs = await Document.query().preload('user')


    if (docs.length === 0) {
      return []
    }

    return docs
  }

  public async getFileDocs(user: User, docId: string) {
    const docs = await Document.query().where('id', docId).where('user_id', user.id).first()

    if (!docs) {
      throw new Exception('Error Retrieving  File')
    }

    return docs
  }

  public async deleteDocs(user: User, docId: string) {
    const doc = await Document.query().where('id', docId).where('user_id', user.id).first()

    if (!doc) {
      throw new Exception('Document not found or not owned by you')
    }

    const filePath = app.makePath(`public/${doc.url}`)

    try {
      await fs.unlink(filePath)
    } catch (error) {
      console.error('File deletion error:', error)
    }

    await doc.delete()

    return doc
  }

  public async editDocs(user: User, docId: string, data: DocumentPayload) {
    const doc = await Document.query().where('id', docId).where('user_id', user.id).first()

    if (!doc) {
      throw new Exception('Document not found or not owned by you')
    }

    doc.title = data.title
    doc.description = data.description
    await doc.save()

    return doc
  }
}
