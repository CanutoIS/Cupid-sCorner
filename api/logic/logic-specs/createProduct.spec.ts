import { expect } from 'chai'
import { createProduct } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Types, Document } from 'mongoose'
import { errors } from 'com'
import { User, Product} from '../../data/models.js'
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

interface ProductFromDB extends ProductValuesProps {
    rating: number
}

describe('createProduct', () => {
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

    it('succeeds on uploading a product', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user.id

            await createProduct(userId, productValues)

            const post = await Product.findOne({ author: userId }) as Document & ProductFromDB

            expect(post).to.be.an('object')
            expect(post.author.toString()).to.equal(userId)
            expect(post.name).to.equal('New product')
            expect(post.images).to.be.an('array')
            expect(post.images[0]).to.equal('image-1')
            expect(post.images[1]).to.equal('image-2')
            expect(post.images[2]).to.equal('image-3')
            expect(post.price).to.equal(29.99)
            expect(post.rating).to.equal(0)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const wrongUserId = '6102a3cbf245ef001c9a1837'

            await createProduct(wrongUserId, productValues)

        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found')
        }
    })
    
    it('fails on missing fileds on values passed', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user._id.toString()

            const productWithoutImages = { author: new ObjectId('6102a3cbf245ef001c9a1837'), name: 'New product', price: 19.99, description: 'Product description', category: 'Jewelry' } 

            await createProduct(userId, productWithoutImages as any)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('There are missing product fields in the values passed.')
        }
    })

    it('fails on non-array images value', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user._id.toString()

            const productWithoutImages = { author: new ObjectId('6102a3cbf245ef001c9a1837'), images: 'wrong-images-type-value', name: 'New product', price: 19.99, description: 'Product description', category: 'Jewelry' } 

            await createProduct(userId, productWithoutImages as any)
        } catch (error: any) {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('The images are not an array of strings.')
        }
    })
    
    it('fails on images array value not containing strings', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user._id.toString()

            const productWithoutImages = { author: new ObjectId('6102a3cbf245ef001c9a1837'), images: [1, true, null], name: 'New product', price: 19.99, description: 'Product description', category: 'Jewelry' } 

            await createProduct(userId, productWithoutImages as any)
        } catch (error: any) {
            expect(error).to.be.instanceOf(TypeError)
            expect(error.message).to.equal('The images are not an array of strings.')
        }
    })

    it('fails on empty user id', async () => expect(() => createProduct('', productValues)).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        expect(() => createProduct(true as any, productValues)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createProduct([] as any, productValues)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createProduct({} as any, productValues)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createProduct(undefined as any, productValues)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => createProduct(1 as any, productValues)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => createProduct('-102a3cbf245ef001c9a1837', productValues)).to.throw(ContentError, 'The user id is not hexadecimal.'))

    it('fails on empty product values field', async () => expect(() => createProduct('6102a3cbf245ef001c9a1837', null as any)).to.throw(ContentError, 'The product values field is empty.'))
    
    it('fails on a non-object product values field', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        expect(() => createProduct(testUserId, true as any)).to.throw(TypeError, 'The value entered is not an object.')
        expect(() => createProduct(testUserId, [] as any)).to.throw(TypeError, 'The value entered is not an object.')
        expect(() => createProduct(testUserId, 'not-an-object' as any)).to.throw(TypeError, 'The value entered is not an object.')
        expect(() => createProduct(testUserId, undefined as any)).to.throw(TypeError, 'The value entered is not an object.')
        expect(() => createProduct(testUserId, 1 as any)).to.throw(TypeError, 'The value entered is not an object.')
    })
    
    it('fails on non-string name in product values', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        const wrongNameValue = (value: Exclude<any, string>) => ({images: ['image-1', 'image-2'], name: (value), price: 19.99, description: 'Product description', category: 'Jewelry' })
        
        expect(() => createProduct(testUserId, (() => wrongNameValue(true))())).to.throw(TypeError, 'The name is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue([]))())).to.throw(TypeError, 'The name is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue({}))())).to.throw(TypeError, 'The name is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue(1))())).to.throw(TypeError, 'The name is not a string.')
    })
    
    it('fails on non-number price in product values', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        const wrongNameValue = (value: Exclude<any, number>) => ({ images: ['image-1', 'image-2'], name: 'New product', price: value, description: 'Product description', category: 'Jewelry' })
        
        expect(() => createProduct(testUserId, (() => wrongNameValue(true))())).to.throw(TypeError, 'The price is not a number.')
        expect(() => createProduct(testUserId, (() => wrongNameValue([]))())).to.throw(TypeError, 'The price is not a number.')
        expect(() => createProduct(testUserId, (() => wrongNameValue({}))())).to.throw(TypeError, 'The price is not a number.')
        expect(() => createProduct(testUserId, (() => wrongNameValue('wrong-type-value'))())).to.throw(TypeError, 'The price is not a number.')
    })
    
    it('fails on non-string description in product values', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        const wrongNameValue = (value: Exclude<any, string>) => ({ images: ['image-1', 'image-2'], name: 'New product', price: 19.99, description: (value), category: 'Jewelry' })
        
        expect(() => createProduct(testUserId, (() => wrongNameValue(true))())).to.throw(TypeError, 'The description is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue([]))())).to.throw(TypeError, 'The description is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue({}))())).to.throw(TypeError, 'The description is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue(1))())).to.throw(TypeError, 'The description is not a string.')
    })
    
    it('fails on non-string category in product values', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        const wrongNameValue = (value: Exclude<any, string>) => ({ images: ['image-1', 'image-2'], name: 'New product', price: 19.99, description: 'Product description', category: (value) })
        
        expect(() => createProduct(testUserId, (() => wrongNameValue(true))())).to.throw(TypeError, 'The category is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue([]))())).to.throw(TypeError, 'The category is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue({}))())).to.throw(TypeError, 'The category is not a string.')
        expect(() => createProduct(testUserId, (() => wrongNameValue(1))())).to.throw(TypeError, 'The category is not a string.')
    })

    after(async () => await mongoose.disconnect())
})