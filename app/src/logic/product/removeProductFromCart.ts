import { errors, validators } from 'com'
import { context } from '..'

const { validateId } = validators

/**
 * Removes product from user cart
 * 
 * @param productId The product id
 * 
 * @returns A Promise that resolves when the removal from cart is successfully, or rejects with an error message if removal fails
 * 
 * @throws {TypeError} On non-string product id
 * @throws {ContentError} On product id not being hexadecimal
 * @throws {RangeError} On product id not being 24 characters of length
 */

type ErrorType = keyof typeof errors

export default function removeProductFromCart(productId: string): Promise<void> {
    validateId(productId, 'product id')
    
    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/removeProduct/${productId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${context.token}`,
            },
        })

        if (res.status === 204)
            return

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}