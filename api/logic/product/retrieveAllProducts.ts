import { validators, errors } from "com"
import { Product } from "../../data/models.js"
import { Types } from "mongoose"

/**
 * Retrieves all products form DB
 *
 * @returns A Promise that resolves when the retrieval of products is successful, or rejects with an error message if retrieval fails
 */

interface ProductProps {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

export default (): Promise<ProductProps[]> => {
    return (async () => {
        const products = await Product.find().select('_id images name price rating').lean()

        const allProducts = products.map(product => {
            return {
                id: product._id.toString(),
                name: product.name,
                image: product.images[0],
                price: product.price,
                rating: product.rating
            }
        })

        return allProducts
    })()
}