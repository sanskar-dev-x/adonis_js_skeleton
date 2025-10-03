import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().toLowerCase().trim(),
        fullName: vine.string().minLength(3).maxLength(20).toLowerCase().trim(),
        password: vine.string().minLength(6).maxLength(256),
       role: vine.enum(['admin', 'user']),
    })
)

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().toLowerCase().trim(),
        password: vine.string().minLength(6).maxLength(256),
    })
)