import { errors, validators } from 'com'

const { TypeError } = errors
const { validateCategory } = validators

/**
 * Retrieves products by category
 * 
 * @param category The category of a product
 * 
 * @returns A Promise that resolves when the retrieval of products by category is successful, or rejects with an error message if retrieval fails
 * 
 * @throws {TypeError} On non-string category
 * @throws {ContentError} On empty category field, or category not valid
 */

type ErrorType = keyof typeof errors;

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

export default function retrieveProductsByCategory(category: string): Promise<ProductProps[]> {
    validateCategory(category)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/productsByCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category })
        })

        if (res.status === 200)
        return res.json()

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}