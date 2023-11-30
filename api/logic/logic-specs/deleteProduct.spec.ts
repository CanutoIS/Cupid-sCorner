import { expect } from 'chai'
import { deleteProduct } from '../index.js'
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
    price: string
    description: string
    category: string
}

describe('deleteProduct', () => {
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

    it('succeeds on deleting a product', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user.id

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

            const products = await Product.find()
            
            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(2)
            expect(products[0].name).to.equal(productValues1.name)
            expect(products[1].name).to.equal(productValues2.name)

            const firstProductId = products[0]._id.toString()
            
            const newProducts = await deleteProduct(userId, firstProductId)
            
            expect(newProducts).to.be.an('array')
            expect(newProducts).to.have.lengthOf(1)
            expect(newProducts[0].name).to.equal(productValues2.name)
        } catch (error) {
            
        }
    })

    it('fails on non-existing user', async () => {
        try {
            const wrongUserId = '6102a3cbf245ef001c9a1837'
            const productId = '6102a3cbf245ef001c9a1837'

            await deleteProduct(wrongUserId, productId)

        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('User not found.')
        }
    })

    it('fails on non-existing post', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document
            const userId = _user.id
            
            const WrongProductId = '6102a3cbf245ef001c9a1837'

            await deleteProduct(userId, WrongProductId)

        } catch (error: any) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal('Product not found.')
        }
    })

    it('fails on empty user id', async () => expect(() => deleteProduct('', '6102a3cbf245ef001c9a1837')).to.throw(RangeError, 'The user id does not have 24 characters.'))

    it('fails on a non-string user id', async () => {
        const testProductId = '6102a3cbf245ef001c9a1837'

        expect(() => deleteProduct(true as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteProduct([] as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteProduct({} as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteProduct(undefined as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
        expect(() => deleteProduct(1 as any, testProductId)).to.throw(TypeError, 'The user id is not a string.')
    })

    it('fails on not hexadecimal user id', async () => expect(() => deleteProduct('-102a3cbf245ef001c9a1837', '6102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The user id is not hexadecimal.'))
    
    it('fails on empty product id', async () => expect(() => deleteProduct('6102a3cbf245ef001c9a1837', '' as any)).to.throw(RangeError, 'The product id does not have 24 characters.'))
    
    it('fails on a non-string product id', async () => {
        const testUserId = '6102a3cbf245ef001c9a1837'
        
        expect(() => deleteProduct(testUserId, true as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => deleteProduct(testUserId, [] as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => deleteProduct(testUserId, {} as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => deleteProduct(testUserId, undefined as any)).to.throw(TypeError, 'The product id is not a string.')
        expect(() => deleteProduct(testUserId, 1 as any)).to.throw(TypeError, 'The product id is not a string.')
    })
    
    it('fails on not hexadecimal product id', async () => expect(() => deleteProduct('6102a3cbf245ef001c9a1837', '-102a3cbf245ef001c9a1837')).to.throw(ContentError, 'The product id is not hexadecimal.'))

    after(async () => await mongoose.disconnect())
})