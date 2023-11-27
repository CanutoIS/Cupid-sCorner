import { errors } from 'com'
import { context } from '..';

/**
 * Saves a product in the user's cart
 * 
 * @returns A Promise that resolves when saving a product to the user's cart is successful, or rejects with an error message if the save fails
 * 
 * @throws {TypeError} On non-string product id, or non-number product quantity or final price
 * @throws {ContentError} On product id not being hexadecimal
 * @throws {RangeError} On product id not being 24 characters of length
 */

type ErrorType = keyof typeof errors;

export default function saveProductToCart(productId: string, productQuantity: number, finalPrice: number): Promise<void> {
    if(typeof productQuantity !== 'number') throw new TypeError('The product quantity value is not a number')
    if(typeof productQuantity !== 'number') throw new TypeError('The final price value is not a number')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, productQuantity, finalPrice })
        })

        if (res.status === 201)
            return

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
}