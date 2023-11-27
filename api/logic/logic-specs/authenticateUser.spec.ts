import { expect } from 'chai'
import { authenticateUser } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Document } from 'mongoose'
import { errors } from 'com'
import { User } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const { ExistenceError, ContentError, AuthError } = errors

describe('authenticateUser', () => {
    let user, email: string, password: string

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email
            password = user.password

            user.password = await bcrypt.hash(password, 10)

            await populate(user)
        } catch (error) {
            
        }
    })

    it('succeeds on existing user', async () => {
        try {
            const userId = await authenticateUser(email, password)

            const _user = await User.findById(userId) as Document

            expect(userId).to.be.a('string')
            expect(userId).to.equal(_user.id)
        } catch (error) {

        }
    })



    it('fails on non-existing user', async () => {
        try {
            const newEmail = email + 'wrong'
            
            await authenticateUser(newEmail, password)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`User not found.`)
        }
    })

    it('fails on existing user but wrong password', async () => {
        try {
            const wrongPassword = 'wrong-password'

            await authenticateUser(email, wrongPassword)
        } catch (error: any) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('Wrong credentials.')
        }
    })

    it('fails on empty email', async () => expect(() => authenticateUser('', password)).to.throw(ContentError, 'The email field is empty.'))

    it('fails on a non-string email', async () => {
        expect(() => authenticateUser(true as any, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser([] as any, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser({} as any, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser(undefined as any, password)).to.throw(TypeError, 'The email is not a string.')
        expect(() => authenticateUser(1 as any, password)).to.throw(TypeError, 'The email is not a string.')
    })

    it('fails on empty password', async () => expect(() => authenticateUser(email, '123')).to.throw(RangeError, 'The password is lower than 6 characters.'))

    it('fails on a non-string password', async () => {
        expect(() => authenticateUser(email, true as any)).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, [] as any)).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, {} as any)).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, undefined as any)).to.throw(TypeError, 'The password is not a string.')
        expect(() => authenticateUser(email, 1 as any)).to.throw(TypeError, 'The password is not a string.')
    })

    after(async () => await mongoose.disconnect())
})