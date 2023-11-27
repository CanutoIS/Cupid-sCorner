import { expect } from 'chai'
import { registerUser } from '../index.js'
import { cleanUp, generate } from './helpers-test/index.js'
import mongoose, { Types } from 'mongoose'
import { errors } from 'com'
import { User } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const { DuplicityError, ContentError } = errors

interface UserProps {
    name: string;
    email: string;
    password: string;
    avatar: string;
    cart: any[];
}

describe('registerUser', () => {
    let user, name: string, email: string, password: string, passwordConfirm: string, avatar: string, cart: any[]

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            name = user.name
            email = user.email
            password = user.password
            passwordConfirm = user.password
            avatar = user.avatar
            cart = user.cart

        } catch (error) {
            
        }

    })

    it('succeeds on registering user', async () => {
        try {
            await registerUser(name, email, password, passwordConfirm)

            const _user: UserProps = await User.findOne({ email: email }) as UserProps

            expect(_user).to.be.a('object')
            expect(_user.name).to.equal(name)
            expect(_user.email).to.equal(email)
            expect(_user.avatar).to.be.null
            expect(_user.cart).to.be.an('array')

            const match = await bcrypt.compare(password, _user.password)

            expect(match).to.be.true
            

        } catch (error) {
            
        }
    })
    
    it('fails on existing user', async () => {
        try {
            User.create({ name, email, password })

            await registerUser(name, email, password, passwordConfirm)

        } catch (error: any) {
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal(`User with email "${email}" already exists.`)
        }
    })

    it('fails on email not valid', async () => {
        try {
            const wrongEmail = 'testEmail.com'
            await registerUser(name, wrongEmail, password, passwordConfirm)

        } catch (error: any) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal(`The email is not valid.`)
        }
    })

    it('fails on empty name', async () => expect(() => registerUser('', email, password, passwordConfirm)).to.throw(ContentError, 'The name field is empty.'))

    it('fails on a non-string name', async () => {
        expect(() => registerUser(true as any, email, password, passwordConfirm)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser([] as any, email, password, passwordConfirm)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser({} as any, email, password, passwordConfirm)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser(undefined as any, email, password, passwordConfirm)).to.throw(TypeError, 'The name is not a string.')
        expect(() => registerUser(1 as any, email, password, passwordConfirm)).to.throw(TypeError, 'The name is not a string.')
    })

    it('fails on empty email', async () => expect(() => registerUser(name, '', password, passwordConfirm)).to.throw(ContentError, 'The email field is empty.'))

    it('fails on a non-string email', async () => {
        expect(() => registerUser(name, true as any, password, passwordConfirm)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, [] as any, password, passwordConfirm)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, {} as any, password, passwordConfirm)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, undefined as any, password, passwordConfirm)).to.throw(TypeError, 'The email is not a string.')
        expect(() => registerUser(name, 1 as any, password, passwordConfirm)).to.throw(TypeError, 'The email is not a string.')
    })

    it('fails on empty password', async () => expect(() => registerUser(name, email, '123', passwordConfirm)).to.throw(RangeError, 'The password is lower than 6 characters.'))

    it('fails on a non-string password', async () => {
        expect(() => registerUser(name, email, true as any, passwordConfirm)).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, [] as any, passwordConfirm)).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, {} as any, passwordConfirm)).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, undefined as any, passwordConfirm)).to.throw(TypeError, 'The password is not a string.')
        expect(() => registerUser(name, email, 1 as any, passwordConfirm)).to.throw(TypeError, 'The password is not a string.')
    })
    
    it('fails on empty password', async () => expect(() => registerUser(name, email, password, '123')).to.throw(RangeError, 'The password confirm is lower than 6 characters.'))

    it('fails on a non-string password confirm', async () => {
        expect(() => registerUser(name, email, password, true as any)).to.throw(TypeError, 'The password confirm is not a string.')
        expect(() => registerUser(name, email, password, [] as any)).to.throw(TypeError, 'The password confirm is not a string.')
        expect(() => registerUser(name, email, password, {} as any)).to.throw(TypeError, 'The password confirm is not a string.')
        expect(() => registerUser(name, email, password, undefined as any)).to.throw(TypeError, 'The password confirm is not a string.')
        expect(() => registerUser(name, email, password, 1 as any)).to.throw(TypeError, 'The password confirm is not a string.')
    })

    after(async () => await mongoose.disconnect())
})