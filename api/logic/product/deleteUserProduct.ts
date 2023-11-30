import { validators, errors } from "com"
import { User, Product } from "../../data/models.js"

const { validateId } = validators;
const { ExistenceError } = errors

/**
 * Deletes a product, removes it from DB
 *
 * @param userId The user id
 * @param productId The product id
 *
 * @returns A Promise that resolves when a product is deleted successfully, or rejects with an error message if deletion fails
 *
 * @throws {TypeError} On non-string user id or product id
 * @throws {RangeError} On user id or product id not being 24 characters of length
 * @throws {ContentError} On user id or product id not being hexadecimal
 * @throws {ExistenceError} On non-existing user or product
 */

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: string
}

export default (userId: string, productId: string): Promise<ProductProps[]> => {
    validateId(userId, 'user id')
    validateId(productId, 'product id')

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new ExistenceError('User not found.')

        const product = await Product.findById(productId).select('_id').lean()
        if(!product) throw new ExistenceError('Product not found.')

        await Product.deleteOne({ _id: productId })

        const products = await Product.find({ author: userId }).select('_id images name price rating').lean()

        const updatedProducts = products.map((product: any) => {
            product.id = product._id.toString()
            delete product._id

            product.image = product.images[0]
            delete product.images

            return product
        })

        return updatedProducts
    })()
}
