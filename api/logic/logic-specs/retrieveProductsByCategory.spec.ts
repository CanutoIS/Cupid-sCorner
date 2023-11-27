import { expect } from 'chai'
import { retrieveProductsByCategory } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Types, Document } from 'mongoose'
import { errors } from 'com'
import { User, Product } from '../../data/models.js'
import dotenv from 'dotenv'

dotenv.config()

const { ContentError } = errors
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

describe('retrieveProductsByCategory', () => {
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

    it('succeeds on retrieving products by category', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
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

            const category = 'Jewelry'

            const productsByCategory =  await retrieveProductsByCategory(category)

            expect(productsByCategory).to.be.an('array')
            expect(productsByCategory).to.have.lengthOf(2)
            expect(productsByCategory[0].name).to.equal(productValues1.name)
            expect(productsByCategory[1].name).to.equal(productValues2.name)
        } catch (error) {
            
        }
    })

    it('fails on retrieving products because of wrong category', async () => {
        try {
            const _user = await User.findOne({ email: user.email }) as Document & UserProps
            const userId = _user.id

            const completedProductValues1 = {
                ...productValues1,
                author: userId
            }
            
            const completedProductValues2 = {
                ...productValues1,
                author: userId
            }
            
            await Product.create(completedProductValues1)
            await Product.create(completedProductValues2)

            const products = await Product.find()

            expect(products).to.be.an('array')
            expect(products).to.have.lengthOf(2)

            const category = 'Romantic Experiences'

            const productsByCategory = await retrieveProductsByCategory(category)

            expect(productsByCategory).to.be.an('array')
            expect(productsByCategory).to.have.lengthOf(0)
        } catch (error) {

        }
    })

    it('fails on invalid category', async () => {
        try {
            const wrongCategory = 'non-existing category'

            const productsByCategory = await retrieveProductsByCategory(wrongCategory)
        } catch (error: any) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal('The category is not valid.')
        }
    })

    it('fails on empty category', async () => expect(() => retrieveProductsByCategory('')).to.throw(ContentError, 'The category field is empty.'))

    it('fails on a non-string category', async () => {
        expect(() => retrieveProductsByCategory(true as any)).to.throw(TypeError, 'The category is not a string.')
        expect(() => retrieveProductsByCategory([] as any)).to.throw(TypeError, 'The category is not a string.')
        expect(() => retrieveProductsByCategory({} as any)).to.throw(TypeError, 'The category is not a string.')
        expect(() => retrieveProductsByCategory(undefined as any)).to.throw(TypeError, 'The category is not a string.')
        expect(() => retrieveProductsByCategory(1 as any)).to.throw(TypeError, 'The category is not a string.')
    })

    after(async () => await mongoose.disconnect())
})