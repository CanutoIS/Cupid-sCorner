import { validators, errors } from 'com'
import { context } from '..';

const { validateEmail, validatePassword } = validators

/**
 * Login a user as seller
 * 
 * @param email The seller user's email
 * @param password The seller user's password
 * 
 * @returns A Promise that resolves when the login is successful, or rejects with an error message if login fails
 * 
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty or not valid email
 * @throws {RangeError} On password length lower than 6 characters
 */

type ErrorType = keyof typeof errors;

export default function loginAsSeller(email: string, password: string): Promise<void> {
    validateEmail(email, 'user email')
    validatePassword(password, 'user password')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        if (res.status === 200) {
            const token = await res.json()
            
            context.token = token

            return
        }

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}