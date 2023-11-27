import { validators, errors } from "com";
import { User, Product } from "../../data/models.js";
import { ObjectId, Types } from "mongoose";
import { Document } from "mongoose";

const { validateId } = validators
const { ExistenceError } = errors
const { ObjectId } = Types

/**
 * Retrieves the user itmes
 * 
 * @param userId The user id
 *
 * @returns {promise} A Promise that resolves when the retrieval of user products in cart is successful, or rejects with an error message if retrieval fails
 * 
 * @throws {TypeError} On non-string user id
 * @throws {RangeError} On user id not being 24 characters of length
 * @throws {ContentError} On user id not being hexadecimal
 * @throws {ExistenceError} On non-existing user
 */

interface cartProducts {
    _id: typeof ObjectId
    name: string
    images: string[]
}

interface productsToBuy {
    id: string
    name: string,
    image: string
    productQuantity: number
    finalPrice: number
}

export default (userId: string): Promise<productsToBuy[]> => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const cartProductsIds: string[] = user.cart.map(product => product.productId.toString())

        const cartProducts: cartProducts[] = await Product.find({ _id: { $in: cartProductsIds} }).select('name images').lean()

        const productsToBuy: productsToBuy[] = (await Promise.all(user.cart.map(async (product, index) => {
            const matchedProduct = cartProducts.find(cartProduct => cartProduct._id.toString() === product.productId.toString())

            if(!matchedProduct) {
                user.cart.splice(index, 1)

                await user.save()

                return
            }

            return {
                id: product.productId.toString(),
                name: matchedProduct.name,
                image: matchedProduct.images[0],
                productQuantity: product.productQuantity,
                finalPrice: product.finalPrice,
            }
        }))).filter(Boolean) as productsToBuy[];
        
        return productsToBuy
    })()
}