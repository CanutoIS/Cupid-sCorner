import { expect } from 'chai'
import { removeProductFromCart } from '../index.js'
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
    price: number
    description: string
    category: string
}

describe('removeProductFromCart', () => {
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

    it("succeeds on removing a product from user's cart", async () => {
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

            const product = await Product.findOne({ author: userId }) as Document
            const productId = product.id

            const productInCart = {
                productId: productId,
                productQuantity: 3,
                finalPrice: 63
            }

            _user.cart.push(productInCart)
            
            await _user.save()
            
            const _user2 = await User.findOne({ email: user.email }) as Document & UserProps

            expect(_user2.cart).to.have.lengthOf(1)
            expect(_user2.cart[0].productId.toString()).to.equal(productId)

            await removeProductFromCart(userId, productId)

            const _user3 = await User.findOne({ email: user.email }) as Document & UserProps

            expect(_user3.cart).to.have.lengthOf(0)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const wrongUserId = '6102a3cbf245ef001c9a1837'
            const productId = '6102a3cbf245ef001c9a1837'

            await removeProductFromCart(wrongUserId, productId)

        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found')
        }
    })

    it('fails on non-existing product', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user.id
            
            const WrongProductId = '6102a3cbf245ef001c9a1837'

            await removeProductFromCart(userId, WrongProductId)

        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Product not found')
        }
    })

    it('fails on empty user id', async () => expect(() => removeProductFromCart('', '6102a3cbf245ef001c9a1837')).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        const testProductId = '6102a3cbf245ef001c9a1837'

        expect(() => removeProductFromCart(true as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => removeProductFromCart([] as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => removeProductFromCart({} as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => removeProductFromCart(undefined as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => removeProductFromCart(1 as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => removeProductFromCart('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty product id', async () => expect(() => removeProductFromCart('6102a3cbf245ef001c9a1837', '' as any)).to.throw(RangeError, 'The product id does not have 24 characters.'))
    
    it('fails on a non-string product id', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        expect(() => removeProductFromCart(testUserId, true as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => removeProductFromCart(testUserId, [] as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => removeProductFromCart(testUserId, {} as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => removeProductFromCart(testUserId, undefined as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => removeProductFromCart(testUserId, 1 as any)).to.throw(TypeError, 'The product id is not a string.')
    })
    
    it('fails on not hexadecimal product id', async () => expect(() => removeProductFromCart('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The product id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})