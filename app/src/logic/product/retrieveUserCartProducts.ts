import { errors } from 'com'
import { context } from '..'

/**
 * Retrieves products that user has in cart
 * 
 * @returns A Promise that resolves when the retrieval of user products in cart is successful, or rejects with an error message if retrieval fails
 */

type ErrorType = keyof typeof errors

interface productsToBuy {
    name: string,
    image: string
    id: string
    productQuantity: number
    finalPrice: number
}

export default function retrieveUserCartProducts(): Promise<productsToBuy[]> {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/userCartProducts`, {
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