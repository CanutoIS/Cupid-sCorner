import { handleErrors, extractUserId } from '../helpers/index.js'
import { createProduct } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)

    const { name, description, price, category } = req.body
    const images = req.body.files

    const productValues = {
        name,
        images,
        description,
        price: price,
        category
    }

    if(typeof userId === 'string') {
        const promise = createProduct(userId, productValues)

        return (async () => {
            await promise
            
            res.status(201).send()
        })()
    } else {
        return Promise.resolve()
    }
})