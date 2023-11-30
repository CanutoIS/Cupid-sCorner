import { expect } from 'chai'
import { retrieveUser } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Types, Document } from 'mongoose'
import { errors } from 'com'
import { User } from '../../data/models.js'
import dotenv from 'dotenv'

dotenv.config()

const { ExistenceError, ContentError } = errors
const { ObjectId } = Types

interface UserProps {
    name: string;
    email: string;
    password: string;
    avatar: string;
    cart: any[];
}

interface ProductValuesProps {
    author: InstanceType<typeof ObjectId>
    name: string
    images: string[]
    price: string
    description: string
    category: string
}

describe('retrieveUser', () => {
    let user: UserProps, email: string, productValues: ProductValuesProps

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email

            productValues = generate.product()

            await populate(user)
        } catch (error) {
            
        }
    })

    it('succeeds on retrieving the user information', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
            const userId = _user.id

            const _user2 = await retrieveUser(userId)
            
            expect(_user2).to.exist
            expect(_user2).to.be.an('object')
            expect(_user2.id).to.equal(userId)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const WrongUserId = '6102a3cbf245ef001c9a1837'

            await retrieveUser(WrongUserId)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', async () => expect(() => retrieveUser('')).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        expect(() => retrieveUser(true as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser([] as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser({} as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser(undefined as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUser(1 as any)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => retrieveUser('-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})