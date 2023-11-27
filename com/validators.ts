import errors from './errors'

const { ContentError } = errors

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

function validateName(name: string, explanation: string = 'name') {
    if (typeof name !== 'string') throw new TypeError(`The ${explanation} is not a string.`)
    if (!name.trim().length) throw new ContentError(`The ${explanation} field is empty.`)
    if (name.trim().length > 25) throw new RangeError(`The ${explanation} is too long.`)
}

function validateEmail(email: string, explanation: string = 'email') {
    if (typeof email !=='string') throw new TypeError(`The ${explanation} is not a string.`)
    if (!email.trim().length) throw new ContentError(`The ${explanation} field is empty.`)
    if (!EMAIL_REGEX.test(email)) throw new ContentError('The email is not valid.')
}

function validatePassword(password: string, explanation: string = 'password') {
    if (typeof password!=='string') throw new TypeError(`The ${explanation} is not a string.`)
    if (password.trim().length < 6) throw new RangeError(`The ${explanation} is lower than 6 characters.`)
}

const HEX_DICTIONARY = '0123456789abcdef'

function validateId(id: string, explanation: string = 'id') {
    if (typeof id !=='string') throw new TypeError(`The ${explanation} is not a string.`)
    if (id.trim().length !== 24) throw new RangeError(`The ${explanation} does not have 24 characters.`)
    
    for(let i = 0; i < id.length; i++) {
        const char = id[i]
        
        if (!HEX_DICTIONARY.includes(char)) throw new ContentError(`The ${explanation} is not hexadecimal.`)
    }
}

function validateToken(token: string, explanation: string = 'token') {
    if (typeof token !=='string') throw new TypeError(`The ${explanation} is not a string.`)
    if (token.split('.').length !== 3) throw new ContentError (`${explanation} is not valid.`)
}

const categories = ['Romantic Gifts', 'Jewelry', 'Romantic Experiences', 'Clothes and Accessories', 'Technology and Gadgets', 'Home Decoration', 'Kitchen Appliances', 'Romantic Books and Movies', 'Health & Wellness', 'Plants and Gardening', 'Games and Puzzles', 'Pets and Pet Gifts']

function validateCategory(category: string) {
    if (typeof category !=='string') throw new TypeError(`The category is not a string.`)
    if (!category.trim().length) throw new ContentError(`The category field is empty.`)
    if (!categories.includes(category)) throw new ContentError('The category is not valid.')
}

interface ProductFields {
    name: string
    images: string[]
    price: number
    description: string
    category: string
}

const requiredProperties: (keyof ProductFields)[] = ['name', 'images', 'price', 'description', 'category']

const validateProductFields = (productFields: ProductFields) => {
    if(typeof productFields !== 'object' || Array.isArray(productFields)) throw new TypeError('The value entered is not an object.')
    if(!productFields) throw new ContentError('The product values field is empty.')
    if(requiredProperties.some(field => !productFields[field])) throw new ContentError('There are missing product fields in the values passed.')
    if(!Array.isArray(productFields.images) || !productFields.images.every(image => typeof image === 'string')) throw new TypeError('The images are not an array of strings.')
    if(typeof productFields.name !== 'string') throw new TypeError('The name is not a string.')
    if(typeof productFields.price !== 'number') throw new TypeError('The price is not a number.')
    if(typeof productFields.description !== 'string') throw new TypeError('The description is not a string.')
    if(typeof productFields.category !== 'string') throw new TypeError('The category is not a string.')
}

const validateNewAvatar = (avatarImage: string) => {
    if(typeof avatarImage !== 'string') throw new TypeError('The new avatar image is not a string.')
    if(!avatarImage.trim().length) throw new ContentError('The avatar image field is empty.')
}

export default {
  validateName,
  validateEmail,
  validatePassword,
  validateId,
  validateToken,
  validateCategory,
  validateProductFields,
  validateNewAvatar
}