import { handleErrors } from '../helpers/index.js'
import { retrieveProductsByCategory } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const { category } = req.body

    const promise = retrieveProductsByCategory(category)

    return (async () => {
        const products = await promise
        
        res.send(products)
    })()
})