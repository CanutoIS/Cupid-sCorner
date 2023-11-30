import { validators, errors } from "com"
import { User, Product } from "../../data/models.js"

const { validateId, validateProductFields } = validators;
const { ExistenceError } = errors

/**
 * Crates a new product
 *
 * @param userId The user id
 * @param productValues The values of the new product
 *
 * @returns A Promise that resolves when a product is created successfully, or rejects with an error message if creation fails
 *
 * @throws {TypeError} On non-string user id, or non-object value entered
 * @throws {RangeError} On user id not being 24 characters of length
 * @throws {ContentError} On user id not being hexadecimal, or missing fileds in the values passed
 * @throws {ExistenceError} On non-existing user
 */

interface ProductValuesProps {
    name: string
    images: string[]
    price: string
    description: string
    category: string
}

export default (userId: string, productValues: ProductValuesProps): Promise<void> => {
    validateId(userId, 'user id')
    validateProductFields(productValues)

    const completedProductValues = {
        ...productValues,
        price: parseFloat(productValues.price),
        author: userId
    }

    return (async () => {
        const user = await User.findById(userId).lean()
        if(!user) throw new ExistenceError('User not found')

        await Product.create(completedProductValues)
    })()
}
