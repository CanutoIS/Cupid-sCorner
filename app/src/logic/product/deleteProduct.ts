import { errors, validators } from "com"
import { context } from ".."

const { validateId } = validators

/**
 * Deletes a product, removes it form DB, and returns a new array with products from DB
 * 
 * @param productId The product id
 * 
 * @returns A Promise that resolves when the product is deleted successfully, or rejects with an error message if deletion fails
 * 
 * @throws {TypeError} On non-string product id
 * @throws {ContentError} On product id not having 24 characters of length, or not being hexadecimal
 * @throws {RangeError} On product id not being 24 characters of length
 */

type ErrorType = keyof typeof errors;

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: string
}

export default function createProduct(productId: string): Promise<ProductProps[]> {
    validateId(productId, 'product id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/deleteProduct/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            }
        })

        if (res.status === 200)
            return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
} 
