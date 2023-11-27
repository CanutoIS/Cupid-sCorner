import { handleErrors, extractUserId } from '../helpers/index.js'
import { retrieveUserCartProducts } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)

    if(typeof userId === 'string') {
        const promise = retrieveUserCartProducts(userId)

        return (async () => {
            const cart = await promise
            
            res.send(cart)
        })()
    } else {
        return Promise.resolve()
    }
})