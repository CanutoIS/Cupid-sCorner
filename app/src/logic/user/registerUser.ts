// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore 
import { validators, errors } from 'com'

const { validateName, validateEmail, validatePassword } = validators
const { ContentError } = errors

/**
 * Registers a user as seller
 * 
 * @param name The name of the seller user
 * @param email The seller user's email
 * @param password The seller user's password
 * @param passwordConfirm The seller user's password
 * 
 * @returns A Promise that resolves when the registration is successful, or rejects with an error message if registration fails
 * 
 * @throws {TypeError} On non-string name, email or password
 * @throws {ContentError} On empty name or email, or not valid email
 * @throws {RangeError} On password length lower than 6 characters or user's name too long
 */

type ErrorType = keyof typeof errors;

export default function registerAsSeller(name: string, email: string, password: string, passwordConfirm: string): Promise<void> {
    validateName(name, 'user name')
    validateEmail(email, 'user email')
    validatePassword(password, 'user password')
    validatePassword(passwordConfirm, 'user password confirm')

    if(password.trim() !== passwordConfirm.trim()) throw new ContentError('The passwords do not match.')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, passwordConfirm })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}