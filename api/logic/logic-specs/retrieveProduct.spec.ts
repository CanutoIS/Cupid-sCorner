import { expect } from 'chai'
import { retrieveProduct } from '../index.js'
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

describe('retrieveProduct', () => {
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

    it('succeeds on retrieving a single product', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
            const userId = _user.id

            expect(_user.cart).to.be.an('array')
            expect(_user.cart).to.have.lengthOf(0)

            const completedProductValues = {
                ...productValues,
                author: userId
            }
            
            await Product.create(completedProductValues)

            const product1 = await Product.findOne({ author: userId }) as Document

            expect(product1).to.exist

            const productId = product1.id

            const product2 = await retrieveProduct(productId)

            expect(product2).to.be.an('object')
            expect(product2.id).to.equal(productId)
        } catch (error) {
            
        }
    })

    it('fails on non-existing product', async () => {
        try {
            const WrongProductId = '6102a3cbf245ef001c9a1837'

            await retrieveProduct(WrongProductId)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Product not found.')
        }
    })

    it('fails on empty product id', async () => expect(() => retrieveProduct('')).to.throw(RangeError, 'The product id does not have 24 characters.'))

    it('fails on a non-string product id', async () => {
        expect(() => retrieveProduct(true as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => retrieveProduct([] as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => retrieveProduct({} as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => retrieveProduct(undefined as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => retrieveProduct(1 as any)).to.throw(TypeError, 'The product id is not a string.')
    })

    it('fails on not hexadecimal product id', async () => expect(() => retrieveProduct('-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The product id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})