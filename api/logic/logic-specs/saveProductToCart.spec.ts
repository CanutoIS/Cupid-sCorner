import { expect } from 'chai'
import { saveProductToCart } from '../index.js'
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

describe('saveProductToCart', () => {
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

    it("succeeds on retrieving user's cart products", async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
            const userId = _user.id

            expect(_user).to.exist
            expect(_user.cart).to.be.an('array')
            expect(_user.cart).to.have.lengthOf(0)

            const completedProductValues = {
                ...productValues,
                author: userId
            }
            
            await Product.create(completedProductValues)

            const product1 = await Product.findOne({ name: productValues.name }) as Document
            const productId = product1.id

            const productQuantity = 3
            const finalPrice = 63
            
            await _user.save()

            await saveProductToCart(userId, productId, productQuantity, finalPrice)

            const _user2 = await User.findById(userId) as Document & UserProps
            
            expect(_user2).to.be.an('object')
            expect(_user2).to.haveOwnProperty('cart')
            expect(_user2.cart).to.have.lengthOf(1)
            expect(_user2.cart[0].productId).to.equal(productId)
            expect(_user2.cart[0].productQuantity).to.equal(productQuantity)
            expect(_user2.cart[0].finalPrice).to.equal(finalPrice)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const WrongUserId = '6102a3cbf245ef001c9a4567'
            const productId = '6102a3cbf245ef001c9a1837'
            const productQuantity = 3
            const finalPrice = 63

            await saveProductToCart(WrongUserId, productId, productQuantity, finalPrice)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })
    
    it('fails on non-existing product', async () => {
        try {
            const user = await User.findOne({ email: email }) as Document
            const userId = user.id

            const wrongProductId = '6102a3cbf245ef001c9a1837'
            const productQuantity = 3
            const finalPrice = 63

            await saveProductToCart(userId, wrongProductId, productQuantity, finalPrice)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Product not found.')
        }
    })

    it('fails on empty user id', async () => expect(() => saveProductToCart('', '6102a3cbf245ef001c9a1837', 3, 63)).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        const productId = '6102a3cbf245ef001c9a1837'
        const productQuantity = 3
        const finalPrice = 63
        expect(() => saveProductToCart(true as any, productId, productQuantity, finalPrice)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => saveProductToCart([] as any, productId, productQuantity, finalPrice)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => saveProductToCart({} as any, productId, productQuantity, finalPrice)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => saveProductToCart(undefined as any, productId, productQuantity, finalPrice)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => saveProductToCart(1 as any, productId, productQuantity, finalPrice)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => saveProductToCart('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837', 3, 63)).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty product id', async () => expect(() => saveProductToCart('6102a3cbf245ef001c9a1837', '', 3, 63)).to.throw(RangeError, 'The product id does not have 24 characters.'))

    it('fails on a non-string product id', async () => {
        const userId = '6102a3cbf245ef001c9a4567'
        const productQuantity = 3
        const finalPrice = 63
        expect(() => saveProductToCart(userId, true as any, productQuantity, finalPrice)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => saveProductToCart(userId, [] as any, productQuantity, finalPrice)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => saveProductToCart(userId, {} as any, productQuantity, finalPrice)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => saveProductToCart(userId, undefined as any, productQuantity, finalPrice)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => saveProductToCart(userId, 1 as any, productQuantity, finalPrice)).to.throw(TypeError, 'The product id is not a string.')
    })

    it('fails on not hexadecimal product id', async () => expect(() => saveProductToCart('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837', 3, 63)).to.throw(ContentError, 'The product id is not hexadecimal.'))

    it('fails on a non-number product quantity', async () => {
        const userId = '6102a3cbf245ef001c9a4567'
        const productId = '6102a3cbf245ef001c9a1837'
        const finalPrice = 63
        expect(() => saveProductToCart(userId, productId, true as any, finalPrice)).to.throw(TypeError, 'The product quantity is not a number')
        expect(() => saveProductToCart(userId, productId, [] as any, finalPrice)).to.throw(TypeError, 'The product quantity is not a number')
        expect(() => saveProductToCart(userId, productId, {} as any, finalPrice)).to.throw(TypeError, 'The product quantity is not a number')
        expect(() => saveProductToCart(userId, productId, undefined as any, finalPrice)).to.throw(TypeError, 'The product quantity is not a number')
        expect(() => saveProductToCart(userId, productId, 'wrong product quantity' as any, finalPrice)).to.throw(TypeError, 'The product quantity is not a number')
    })

    it('fails on a non-number final price', async () => {
        const userId = '6102a3cbf245ef001c9a4567'
        const productId = '6102a3cbf245ef001c9a1837'
        const productQuantity = 3        
        expect(() => saveProductToCart(userId, productId, productQuantity, true as any)).to.throw(TypeError, 'The final price is not a number')
        expect(() => saveProductToCart(userId, productId, productQuantity, [] as any)).to.throw(TypeError, 'The final price is not a number')
        expect(() => saveProductToCart(userId, productId, productQuantity, {} as any)).to.throw(TypeError, 'The final price is not a number')
        expect(() => saveProductToCart(userId, productId, productQuantity, undefined as any)).to.throw(TypeError, 'The final price is not a number')
        expect(() => saveProductToCart(userId, productId, productQuantity, 'wrong final price' as any)).to.throw(TypeError, 'The final price is not a number')
    })

    after(async () => await mongoose.disconnect())
})