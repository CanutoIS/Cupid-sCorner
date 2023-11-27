import { handleErrors } from "../helpers/index.js"
import { authenticateUser } from '../../logic/index.js'
import jwt from 'jsonwebtoken'

export default handleErrors((req, res) => {
    const { email, password } = req.body

    const promise = authenticateUser(email, password)

    return (async () => {
        const userId = await promise

        const payload = { sub: userId }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })

        res.json(token)
    })()
})