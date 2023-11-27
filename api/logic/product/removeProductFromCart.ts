import { validators, errors } from "com";
import { User, Product } from "../../data/models.js";
import { Types } from "mongoose";

const { validateId } = validators
const { ExistenceError } = errors

/**
 * Removes a product form user's cart
 *
 * @param userId The user id
 * @param productId The product id
 *
 * @returns A Promise that resolves when a product is removed from user's cart successfully, or rejects with an error message if removal fails
 *
 * @throws {TypeError} On non-string user id or product id
 * @throws {RangeError} On user id or product id not being 24 characters of length
 * @throws {ContentError} On user id or product id not being hexadecimal
 * @throws {ExistenceError} On non-existing user or product
 */

export default (userId: string, productId: string): Promise<void> => {
    validateId(userId, 'user id')
    validateId(productId, 'product id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found')

        const productToBuy = user.cart.findIndex(product => product.productId === productId)
        if(productToBuy === -1) throw new ExistenceError('Product not found')

        user.cart.splice(productToBuy, 1)

        await user.save()
    })()
}