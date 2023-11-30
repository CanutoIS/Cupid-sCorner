import { Container } from "../library"
// @ts-ignore
import { ImageCompressor } from 'image-compressor'
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { ConfirmUploadModal, Footer, ProductFieldsForm, ProductPreview } from "../components"
import { handleSelectedImages } from "../utils"
import { useAppContext, useHandleErrors } from "../hooks"
import { createProduct } from "../../logic"

interface ProductFields {
    name: string
    images: string[]
    price: string
    description: string
    category: string
}

export default function UploadProduct(): JSX.Element {
    const { alert, navigate, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()
    
    const [uploadConfirmation, setUploadConfirmation] = useState(false)
    
    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])
    
    const [productValues, setProductValues] = useState<ProductFields>({
        name: '',
        images: [],
        price: '',
        description: '',
        category: '',
    })

    type OnChangeProductFields = ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement> & ChangeEvent<HTMLSelectElement> & {
        target: Record<string, { value: string }>;
    }

    const handleOnChange = async (e: OnChangeProductFields) => {
        e.preventDefault()

        setProductValues({
            ...productValues,
            [e.target.name]: e.target.value
        })
    }

    const handleRenderImages = (e: ChangeEvent<HTMLInputElement>) => {
        handleErrors(async () => {
            const images = await handleSelectedImages(e)
        
            if(images)
                setProductValues({
                    ...productValues,
                    images
                })
        })
    }

    const handleCreateProduct = () => {
        setUploadConfirmation(false)

        const { name, images, price, description, category } = productValues
        
        if((!name || !price || !description || !category || !images) && alert){
            alert('Not all fields have been filled out!', 'error')
    
            return
        }

        handleErrors(async () => {
            freeze && freeze()

            await createProduct(productValues)

            if(navigate) navigate('/profile')

            unfreeze && unfreeze()
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        document.body.classList.add('overflow-hidden')

        setUploadConfirmation(true)
    }

    const handleReturnToPreview = () => {
        document.body.classList.remove('overflow-hidden')
        
        setUploadConfirmation(false)
    }

    return <Container className="bg-red-50 h-full overflow-scroll pt-28">
        <section className="w-screen flex flex-col lg:flex-row lg:my-6">
            <ProductFieldsForm
                productValues={productValues}
                handleOnChange={handleOnChange}
                handleRenderImages={handleRenderImages}
                handleSubmit={handleSubmit}
            /> 
            <ProductPreview
                productValues={productValues}
            />
        </section>
        {uploadConfirmation && <ConfirmUploadModal
            handleCreateProduct={handleCreateProduct}
            handleReturnToPreview={handleReturnToPreview}
        />}
        <Footer />
    </Container>
}