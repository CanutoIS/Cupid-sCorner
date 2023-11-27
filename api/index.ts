import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { registerUserHandler, authenticateUserHandler, retrieveUserHandler, retrieveUserProductsHandler, createProductHandler, retrieveProductHandler, retrieveAllProductsHandler, retrieveProductsByCategoryHandler, saveProductToCartHandler, retrieveUserCartProductsHandler, removeProductFromCartHandler, deleteProductHandler, UpdateUserAvatarHandler, serverStatus } from './handlers/index.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()

console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()
        const jsonBodyParser = bodyParser.json()
        api.use(cors())

        const storage = multer.memoryStorage()
        const upload = multer({ storage })

        api.get('/serverStatus', serverStatus)

        api.post('/login', jsonBodyParser, authenticateUserHandler)
        
        api.post('/register', jsonBodyParser, registerUserHandler)

        api.get('/user', retrieveUserHandler)

        api.get('/userProducts', retrieveUserProductsHandler)

        api.post('/product/:productId', jsonBodyParser, retrieveProductHandler)
        
        api.get('/allProducts', retrieveAllProductsHandler)

        api.post('/productsByCategory', jsonBodyParser, retrieveProductsByCategoryHandler)

        api.post('/newProduct', upload.array('selectImages'), jsonBodyParser, createProductHandler)

        api.post('/cart', jsonBodyParser, saveProductToCartHandler)
        
        api.get('/userCartProducts', retrieveUserCartProductsHandler)
        
        api.get('/removeProduct/:productId', removeProductFromCartHandler)
        
        api.delete('/deleteProduct/:productId', deleteProductHandler)
        
        api.post('/user/userAvatar', jsonBodyParser, UpdateUserAvatarHandler)

        api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))
    })
    .catch(console.error)