import { expect } from 'chai'
import { retrieveUserCartProducts } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Types, Document } from 'mongoose'
import { errors } from 'com'
import { User, Product } from '../../data/models.js'
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

describe('retrieveUserCartProducts', () => {
    let user: UserProps, email: string, productValues1: ProductValuesProps, productValues2: ProductValuesProps

    before(async () => await mongoose.connect(process.env.MONGODB_URL))

    beforeEach(async () => {
        try {
            await cleanUp()

            user = generate.user()
            email = user.email

            productValues1 = generate.product()
            productValues2 = generate.product()

            await populate(user)
        } catch (error) {
            
        }
    })

    it("succeeds on retrieving user's cart products", async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
            const userId = _user.id

            expect(_user.cart).to.be.an('array')
            expect(_user.cart).to.have.lengthOf(0)

            const completedProductValues1 = {
                ...productValues1,
                author: userId
            }
            
            const completedProductValues2 = {
                ...productValues2,
                author: userId
            }
            
            await Product.create(completedProductValues1)
            await Product.create(completedProductValues2)

            const product1 = await Product.findOne({ name: productValues1.name }) as Document
            const product2 = await Product.findOne({ name: productValues2.name }) as Document

            const firstProductId = product1.id
            const secondProductId = product2.id

            const productInCart1 = {
                productId: firstProductId,
                productQuantity: 3,
                finalPrice: 63
            }
            const productInCart2 = {
                productId: secondProductId,
                productQuantity: 4,
                finalPrice: 48
            }

            _user.cart.push(productInCart1, productInCart2)
            
            await _user.save()

            const productsToBuy = await retrieveUserCartProducts(userId)
            
            expect(productsToBuy).to.exist
            expect(productsToBuy).to.be.an('array')
            expect(productsToBuy).to.have.lengthOf(2)
            expect(productsToBuy[0].id).to.equal(firstProductId)
            expect(productsToBuy[1].id).to.equal(secondProductId)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const WrongUserId = '6102a3cbf245ef001c9a1837'

            const productsToBuy = await retrieveUserCartProducts(WrongUserId)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on empty user id', async () => expect(() => retrieveUserCartProducts('')).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        expect(() => retrieveUserCartProducts(true as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUserCartProducts([] as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUserCartProducts({} as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUserCartProducts(undefined as any)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => retrieveUserCartProducts(1 as any)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => retrieveUserCartProducts('-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})