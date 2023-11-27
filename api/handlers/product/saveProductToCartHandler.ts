import { handleErrors, extractUserId } from '../helpers/index.js'
import { saveProductToCart } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { productId, productQuantity, finalPrice } = req.body

    if(typeof userId === 'string') {
        const promise = saveProductToCart(userId, productId, productQuantity, finalPrice)

        return (async () => {
            await promise
            
            res.status(201).send()
        })()
    } else {
        return Promise.resolve()
    }
})