import { handleErrors, extractUserId } from '../helpers/index.js'
import { retrieveUserProducts } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)

    if(typeof userId === 'string') {
        const promise = retrieveUserProducts(userId)

        return (async () => {
            const products = await promise
            
            res.send(products)
        })()
    } else {
        return Promise.resolve()
    }
})