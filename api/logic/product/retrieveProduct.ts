import { validators, errors } from "com"
import { Product } from "../../data/models.js"
import { Document } from "mongoose"

const { validateId } = validators
const { ExistenceError } = errors

/**
 * Retrieves the user itmes
 * 
 * @param userId The name of the product
 * @param name The name of the product
 *
 * @returns {promise} A Promise that resolves when the retrieval of the product is successful, or rejects with an error message if retrieval fails
 *
 * @throws {TypeError} On non-string product id
 * @throws {RangeError} On product id not being 24 characters of length
 * @throws {ContentError} On product id not being hexadecimal
 */

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

export default (productId: string): Promise<ProductProps> => {
    validateId(productId, 'product id')

    return (async () => {
        const product: Document & ProductProps | null = await Product.findById(productId).lean()
        if(!product) throw new ExistenceError('Product not found.')
        
        product.id = product._id.toString()
        delete product._id

        product.author = product.author.toString()

        return product
    })()
}