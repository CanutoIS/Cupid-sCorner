import { errors } from 'com'
import { context } from '..'

/**
 * Retrieves user own products
 * 
 * @returns A Promise that resolves when the retrieval of user own products is successful, or rejects with an error message if retrieval fails
 */

type ErrorType = keyof typeof errors

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: string
}

export default function retrieveUserProducts(): Promise<ProductProps[]> {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/userProducts`, {
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