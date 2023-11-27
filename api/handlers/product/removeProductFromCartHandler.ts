import { handleErrors, extractUserId } from '../helpers/index.js'
import { removeProductFromCart } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { productId } = req.params

    if(typeof userId === 'string') {
        const promise = removeProductFromCart(userId, productId)

        return (async () => {
            await promise
            
            res.status(204).send()
        })()
    } else {
        return Promise.resolve()
    }
})