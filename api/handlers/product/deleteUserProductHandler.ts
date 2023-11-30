import { handleErrors, extractUserId } from '../helpers/index.js'
import { deleteUserProduct } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { productId } = req.params

    if(typeof userId === 'string') {
        const promise = deleteUserProduct(userId, productId)

        return (async () => {
            const updatedProducts = await promise
            
            res.send(updatedProducts)
        })()
    } else {
        return Promise.resolve()
    }
})