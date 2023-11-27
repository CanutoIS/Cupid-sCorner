import { handleErrors } from '../helpers/index.js'
import { retrieveProduct } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const { productId } = req.params

    const promise = retrieveProduct(productId)

    return (async () => {
        const product = await promise
        
        res.send(product)
    })()
})