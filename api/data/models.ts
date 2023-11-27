import mongoose from 'mongoose'
const { Schema, Types: { ObjectId }, model } = mongoose

const productToBuy = new Schema({
    productId: {
        type: ObjectId,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    }
})

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    avatar: {
        type: String,
        trim: true,
        default: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIoAigMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIG/8QAMBABAAIBAgIJAgUFAAAAAAAAAAECAwQRITEFEhMiMkFRYXFCwVJikaGxMzRTcoH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+8AAAAAAAABIIAAAAAAAAAAAAEumDDbNfq1/7PoDnG8ztEbu+PR5r/TFY95aGDT48Md2N5/FLsDOjo+/+Sv6PN9Dmr4erb4nZpgMO9LUna9Zifd5bmSlclereImPdm6rSzh71O9T94BVEoAAAAAAAAB6rWbTERG8zOzY0+GMGOKxz859ZUOjqdbNNp5Vjh8tMAAAABExExMTynhKQGPqsPY5Zrv3Z41cWn0jTrYYvHOs/szAAAAAAAAAaPRkdzJPvC6odGW/qV+JXwAAAAAActVG+myR+WZYzX1lurpb+/BkAAAAAAAAA7aXL2Wetp5cp+GwwWhodTvEYsk8Y8M/YF4AAAAHHU6iuCnraY4QCr0ll3mMUeXGVF6tM2tNrTvM8Zl5AAAAAAABIIdcODJm8EcPxTyWdLot9r5uXlX1+V+IiI2iNo9geMNLY6RW95vPq6AAACJ324TtPqzdTpM0WnJxyes+bTAYI1dTpa5Y3rwv6+Usy9LY7TW0bTAPIAAAAJBC9odNvtlyRw+mPu4aXD22WInwxxlrxy8tvYAAAAAAAABw1enjPSdtovHKXcBhTExMxMbTHOEL/SODh21Y5eLb+VAAAAHXT4+0zUr5b8QaOixdngrv4rcZWAAAAAAAAAAABFoi1ZrPKY2li5cc4slqT9Mttn9J02tS8efCQUQAF3oyu+S9/SNlJo9F+DJ8wC6AAAAAAAAAAAAr6+vW01vy8Vhy1P8AbZf9Z/gGOhMoB//Z'
    },
    cart: {
        type: [productToBuy]
    }
})

const product = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: [String],
        require: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
    }
})

const User = model('User', user)
const Product = model('Product', product)

export {
    User,
    Product,
}