import { expect } from 'chai'
import { UpdateUserAvatar } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Types, Document } from 'mongoose'
import { errors } from 'com'
import { User, Product } from '../../data/models.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const { ExistenceError, ContentError, AuthError } = errors
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
    price: number
    description: string
    category: string
}

describe('UpdateUserAvatar', () => {
    let user: UserProps, email: string, password: string, newAvatar: string, productValues: ProductValuesProps

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email
            password = user.password

            productValues = generate.product()
            newAvatar = `New-user-avatar-${(Math.random() * 1000).toFixed(0)}`
            
            user.password = await bcrypt.hash(password, 10)

            await populate(user)
        } catch (error) {
            
        }
    })

    it("succeeds on retrieving user's cart products", async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
            const userId = _user.id

            expect(_user).to.exist
            
            await _user.save()

            await UpdateUserAvatar(userId, newAvatar, password)

            const _user2 = await User.findById(userId) as Document & UserProps
            
            expect(_user2).to.be.an('object')
            expect(_user2).to.haveOwnProperty('avatar')
            expect(_user.avatar).to.equal(newAvatar)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const WrongUserId = '6102a3cbf245ef001c9a4567'

            await UpdateUserAvatar(WrongUserId, newAvatar, password)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on the avatar being the same as the old one', async () => {
        try {
            const user = await User.findOne({ email: email }) as Document
            const userId = user.id

            await User.updateOne({ _id: userId }, { $set: { avatar: newAvatar } })

            await UpdateUserAvatar(userId, newAvatar, password)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('New avatar is the same as the old one.')
        }
    })
    
    it('fails on wrong credentials', async () => {
        try {
            const user = await User.findOne({ email: email }) as Document
            const userId = user.id

            const wrongPassword = 'wrong-password'
            await UpdateUserAvatar(userId, newAvatar, wrongPassword)
        } catch (error: any) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal('Wrong credentials.')
        }
    })

    it('fails on empty user id', async () => expect(() => UpdateUserAvatar('', newAvatar, password)).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        expect(() => UpdateUserAvatar(true as any, newAvatar, password)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => UpdateUserAvatar([] as any, newAvatar, password)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => UpdateUserAvatar({} as any, newAvatar, password)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => UpdateUserAvatar(undefined as any, newAvatar, password)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => UpdateUserAvatar(1 as any, newAvatar, password)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => UpdateUserAvatar('-102a3cbf245ef001c9a1837', newAvatar, password)).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty product id', async () => expect(() => UpdateUserAvatar('6102a3cbf245ef001c9a1837', '', password)).to.throw(ContentError, 'The avatar image field is empty.'))

    it('fails on a non-string product id', async () => {
        const userId = '6102a3cbf245ef001c9a4567'

        expect(() => UpdateUserAvatar(userId, true as any, password)).to.throw(TypeError, 'The new avatar image is not a string.')
        expect(() => UpdateUserAvatar(userId, [] as any, password)).to.throw(TypeError, 'The new avatar image is not a string.')
        expect(() => UpdateUserAvatar(userId, {} as any, password)).to.throw(TypeError, 'The new avatar image is not a string.')
        expect(() => UpdateUserAvatar(userId, undefined as any, password)).to.throw(TypeError, 'The new avatar image is not a string.')
        expect(() => UpdateUserAvatar(userId, 1 as any, password)).to.throw(TypeError, 'The new avatar image is not a string.')
    })

    after(async () => await mongoose.disconnect())
})