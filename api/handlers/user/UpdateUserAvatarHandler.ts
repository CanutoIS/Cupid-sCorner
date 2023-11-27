import { handleErrors, extractUserId } from '../helpers/index.js'
import { UpdateUserAvatar } from '../../logic/index.js'

export default handleErrors((req, res) => {
    const userId = extractUserId(req)
    const { avatarImage, password } = req.body

    if(typeof userId === 'string') {
        const promise = UpdateUserAvatar(userId, avatarImage, password)

        return (async () => {
            await promise
            
            res.status(204).send()
        })()
    } else {
        return Promise.resolve()
    }
})