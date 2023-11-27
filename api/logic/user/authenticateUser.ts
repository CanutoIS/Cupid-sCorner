import { validators, errors } from "com";
import { User } from "../../data/models.js";
import bcrypt from 'bcryptjs'

const { validateEmail, validatePassword } = validators
const { DuplicityError, ExistenceError, AuthError } = errors

/**
 * Authenticates a user
 *
 * @param email The post id
 * @param password The user password
 *
 * @returns {promise} A Promise that resolves when the a user is authenticated successfully, or rejects with an error message if authentication fails
 *
 * @throws {TypeError} On non-string email or password
 * @throws {ContentError} On empty email
 * @throws {RangeError} On password length lower than 6 characters
 * @throws {ExistenceError} On non-existing user
 * @throws {AuthError} On wrong credentials
 */

export default (email: string, password: string): Promise<string> => {
    validateEmail(email, "email")
    validatePassword(password, "password")

    return (async () => {
        const user = await User.findOne({ email: email })
        if(!user) throw new ExistenceError('User not found.')

        if (user.password) {
            const match = await bcrypt.compare(password, user.password);
    
            if (!match)
                throw new AuthError('Wrong credentials.')
    
            return user._id.toString();
        } else {
            throw new AuthError('User password is not set.');
        }
    })()
};
