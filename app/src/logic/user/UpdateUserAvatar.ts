import { errors, validators } from 'com'
import { context } from '..'

const { validatePassword } = validators
const { ContentError } = errors

/**
 * Updates the user avatar
 * 
 * @param {string} avatarImage The new avatar url
 * @param {string} password The user password
 * 
 * @returns {Promise} A Promise that resolves when the user avatar is updated successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string new avatar url or password
 * @throws {ContentError} On empty avatar image or the avatar image is the same as the old one.
 * @throws {RangeError} On password length lower than 6 characters
 * @throws {AuthError} On wrong credentials
 */

type ErrorType = keyof typeof errors;

export default function UpdateUserAvatar(avatarImage: string, password: string): Promise<void> {
    validatePassword(password)
    if(typeof avatarImage !== 'string') throw new ContentError('The avatar is not a string')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/userAvatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ avatarImage, password })
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}