import { validators, errors } from "com"
import { User, Product } from "../../data/models.js"

const { validateId } = validators
const { ExistenceError, ContentError } = errors

/**
 * Retrieves the user itmes
 * 
 * @param userId The user id
 *
 * @returns {promise} A Promise that resolves when the retrieval of user products is successful, or rejects with an error message if retrieval fails
 *
 * @throws {TypeError} On non-string user id or product id, or non-number product quantity or final price
 * @throws {ContentError} On user id or product id not being hexadecimal
 * @throws {RangeError} On user id or product id not being 24 characters of length
 * @throws {ExistenceError} On non-existing user or product
 */

export default (userId: string, productId: string, productQuantity: number, finalPrice: number): Promise<void> => {
    validateId(userId, 'user id')
    validateId(productId, 'product id')
    if(typeof productQuantity !== 'number') throw new TypeError('The product quantity is not a number')
    if(typeof finalPrice !== 'number') throw new TypeError('The final price is not a number')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')
        
        const product = await Product.findById(productId)
        if(!product) throw new ExistenceError('Product not found.')

        const existingProduct = user.cart.findIndex(product => product.productId === productId)

        if(existingProduct !== -1) user.cart.splice(existingProduct, 1)

        const productToBuy = { productId, productQuantity, finalPrice }

        user.cart.unshift(productToBuy)

        await user.save()
    })()
}