import { validators, errors } from "com";
import { User } from "../../data/models.js"
import bcrypt from 'bcryptjs'

const { validateId, validatePassword, validateNewAvatar } = validators
const { ExistenceError, ContentError, AuthError } = errors

/**
 * Updates the user avatar
 * 
 * @param userId The user id
 * @param avatarImage The new avatar url
 * @param password The user password
 * 
 * @returns {Promise} A Promise that resolves when the user avatar is updated successfully, or rejects with an error message if the operation fails
 * 
 * @throws {TypeError} On non-string user id, new avatar image or password
 * @throws {ContentError} On user id not hexadecimal, empty new avatar url or the new avatar url is the same as the old one.
 * @throws {RangeError} On user id not equal to 24 characters of length or password length lower than 6 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */
export default (userId: string, avatarImage: string, password: string): Promise<void> => {
  validateId(userId, 'user id')
  validatePassword(password)
  validateNewAvatar(avatarImage)
  
  return (async () => {
    const user = await User.findById(userId)
    if(!user) throw new ExistenceError('User not found.')

    if(avatarImage === user.avatar) throw new ContentError('New avatar is the same as the old one.')
      
    let match
    if(typeof user.password === 'string')
      match = await bcrypt.compare(password, user.password)

    if(!match) throw new AuthError('Wrong credentials.')

    await User.updateOne(
      { _id: userId },
      { $set: { avatar: avatarImage } }
    )
  })()
}