import { errors, validators } from 'com'
import { context } from '..'

const { validateId } = validators

/**
 * Retrieves a product information
 * 
 * @param productId The product id
 * 
 * @returns A Promise that resolves when the retrieval of a product information is successful, or rejects with an error message if retrieval fails
 * 
 * @throws {TypeError} On non-string product id
 * @throws {ContentError} On product id not being hexadecimal
 * @throws {RangeError} On product id not being 24 characters of length
 */

type ErrorType = keyof typeof errors;

interface ProductProps {
    id: string
    author: string
    name: string
    images: string[]
    description: string
    price: number
    category: string
    rating: number
}

export default function retrieveProduct(productId: string): Promise<ProductProps> {
    validateId(productId, 'product id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}