import { errors } from 'com'
import { context } from '..'

/**
 * Retrieves user information
 * 
 * @returns A Promise that resolves when the retrieval of user information is successful, or rejects with an error message if retrieval fails
 */

type ErrorType = keyof typeof errors;

type User = {
    name: string
    email: string
    avatar: string
    id: string
    cart: Array<string | number>
}

export default function retrieveUser(): Promise<User> {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`,
            },
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}