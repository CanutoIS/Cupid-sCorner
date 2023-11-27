import { validators, errors } from "com"
import { User } from "../../data/models.js"
import bcrypt from 'bcryptjs'

const { validateName, validateEmail, validatePassword } = validators
const { DuplicityError } = errors

/**
 * Registers a user
 * 
 * @param name The name of the user
 * @param username The username attached to the user account
 * @param email The user's email
 * @param password The user's password
 * 
 * @returns {promise} A Promise that resolves when the registration is successful, or rejects with an error message if registration fails
 * 
 * @throws {TypeError} On non-string name, email, password or passwordConfirm
 * @throws {ContentError} On empty name or email
 * @throws {RangeError} On password or passwordConfirm length lower than 6 characters
 * @throws {DuplicityError} On existing user
 */

export default (name: string, email: string, password: string, passwordConfirm: string): Promise<void> => {
    validateName(name, "name")
    validateEmail(email, "email")
    validatePassword(password, "password")
    validatePassword(passwordConfirm, "password confirm")

    if(password.trim() !== passwordConfirm.trim()) throw new Error('Passwords do not match.')

    return (async () => {
        try {
            const hash = await bcrypt.hash(password, 10)
            
            await User.create({ name, email, password: hash })
		} catch (error: any) {
			if (error.message.includes('E11000')) {
                throw new DuplicityError(
                    `User with ${error.message.includes('username') ? `username "${name}"` : `email "${email}"`} already exists.`
                )
            }

			throw error
		}
    })()
}
