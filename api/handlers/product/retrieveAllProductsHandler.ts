import { handleErrors } from '../helpers/index.js'
import { retrieveAllProducts } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const promise = retrieveAllProducts()

    return (async () => {
        const products = await promise
        
        res.send(products)
    })()
})