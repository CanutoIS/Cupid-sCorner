import { validators, errors } from "com";
import { User, Product } from "../../data/models.js";
import { Types } from "mongoose";

const { validateId } = validators
const { ExistenceError } = errors

/**
 * Retrieves the user own products
 * 
 * @param userId The user id
 *
 * @returns {promise} A Promise that resolves when the retrieval of user own products is successful, or rejects with an error message if retrieval fails
 *
 * @throws {TypeError} On non-string user id
 * @throws {RangeError} On user id not being 24 characters of length
 * @throws {ContentError} On user id not being hexadecimal
 * @throws {ExistenceError} On non-existing user
 */

type ProductProps = {
    id: string
    name: string
    images: string[]
    description: string
    price: number
    category: string
    rating: string
}

export default (userId: string): Promise<ProductProps[]> => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId).lean()
        if(!user) throw new ExistenceError('User not found.')

        const products = await Product.find({ author: userId }).select('_id images name price rating').lean()

        const finalProducts = products.map((product: any) => {
            product.id = product._id.toString()
            delete product._id

            product.image = product.images[0]
            delete product.images

            return product
        })

        return finalProducts
    })()
}