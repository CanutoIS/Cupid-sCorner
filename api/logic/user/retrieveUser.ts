import { validators, errors } from "com"
import { User } from "../../data/models.js"

const { validateId } = validators
const { ExistenceError } = errors

/**
 * Registers a user
 *
 * @param userId The user id
 *
 * @returns {promise} A Promise that resolves when the retrieval of user information is successful, or rejects with an error message if retrieval fails
 *
 * @throws {TypeError} On non-string user id
 * @throws {RangeError} On user id not being 24 characters of length
 * @throws {ContentError} On user id not being hexadecimal
 * @throws {ExistenceError} On non-existing user
 */

interface UserWithId {
    name: string
    email: string
    avatar: string
    id: string
}

export default (userId: string): Promise<UserWithId> => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId).lean()
        if(!user) throw new ExistenceError('User not found.')

        const { _id, password, ...userWithoutId } = user

        const userWithId = {
            id: _id.toString(),
            ...userWithoutId,
        }

        return userWithId
    })()
}
