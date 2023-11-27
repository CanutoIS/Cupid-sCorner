import { expect } from 'chai'
import { retrieveAllProducts } from '../index.js'
import { cleanUp, generate, populate } from './helpers-test/index.js'
import mongoose, { Types, Document } from 'mongoose'
import { User, Product } from '../../data/models.js'
import dotenv from 'dotenv'

dotenv.config()

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

describe('retrieveAllProducts', () => {
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

    it('succeeds on retrieving all products from DB', async () => {
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

            const allProducts =  await retrieveAllProducts()
            
            expect(allProducts).to.be.an.equal('array')
            expect(allProducts).to.have.lengthOf(2)
            expect(allProducts[0].name).to.equal(productValues1.name)
            expect(allProducts[1].name).to.equal(productValues2.name)

        } catch (error) {
            
        }
    })

    after(async () => await mongoose.disconnect())
})