import { errors } from 'com'

/**
 * Retrieves all products from DB
 * 
 * @returns A Promise that resolves when the retrieval of products from DB is successfully, or rejects with an error message if retrieval fails
 */

type ErrorType = keyof typeof errors;

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

export default function retrieveAllProducts(): Promise<ProductProps[]> {
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/allProducts`, {
            method: 'GET',
        })

        if (res.status === 200)
        return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}