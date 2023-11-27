import { validators } from "com"
import { Product } from "../../data/models.js"

const { validateCategory } = validators

/**
 * Retrieves the user itmes
 * 
 * @param category The category from wich to select the products
 *
 * @returns {promise} A Promise that resolves when the retrieval of the products is successful, or rejects with an error message if retrieval fails
 * 
 * @throws {TypeError} On non-string category
 * @throws {ContentError} On empty category field, or category not valid
 */

interface ProductProps {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

export default (category: string): Promise<ProductProps[]> => {
    validateCategory(category)

    return (async () => {
        const products = await Product.find({ category: category }).select('_id images name price rating').lean()

        const productsByCategory = products.map(product => {
            return {
                id: product._id.toString(),
                name: product.name,
                image: product.images[0],
                price: product.price,
                rating: product.rating
            }
        })

        return productsByCategory
    })()
}