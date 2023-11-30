import { errors, validators } from "com"
import { context } from ".."

const { validateProductFields } = validators

/**
 * Creates a product, stores it in DB
 * 
 * @param productValues The values of the product
 * 
 * @returns A Promise that resolves when a product is created successfully, or rejects with an error message if creation fails
 * 
 * @throws {TypeError} On non-object value entered
 * @throws {ContentError} On missing fileds in the values passed 
 */

type ErrorType = keyof typeof errors;

interface productValues {
    name: string
    images: string[]
    price: string
    description: string
    category: string
}

export default function createProduct(productValues: productValues) {
    validateProductFields(productValues)

    const { name, images, price, description, category } = productValues
    
    if(!images.length) return

    const formData = new FormData()
    
    images.forEach((file, index) => {
        formData.append(`files[${index}]`, file)
    })

    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("category", category);

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/newProduct`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${context.token}`,
            },
            body: formData
        })

        if (res.status === 201) return

        const { type, message } = await res.json()

        const clazz = errors[type as ErrorType]

        throw new clazz(message)
    })()
} 
