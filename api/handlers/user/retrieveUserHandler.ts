    import { handleErrors, extractUserId } from '../helpers/index.js'
    import { retrieveUser } from '../../logic/index.js'

    export default handleErrors((req, res) => {
        const userId = extractUserId(req)

        if(typeof userId === 'string') {
            const promise = retrieveUser(userId)

            return (async () => {
                const user = await promise
                
                res.send(user)
            })()
        } else {
            return Promise.resolve()
        }
    })