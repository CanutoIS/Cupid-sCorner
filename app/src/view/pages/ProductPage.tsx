import { isCurrentUser, isUserLoggedIn, retrieveProduct, saveProductToCart } from "../../logic"
import { context } from "../../ui"
import { AskLoginModal, Footer } from "../components"
import { useAppContext, useHandleErrors } from "../hooks"
import { Button, Container, Form, Input } from "../library"
import { useRef, FormEvent, useEffect, useState, ChangeEvent } from 'react'

interface ProductProps {
    id: string
    author: string
    name: string
    category: string
    images: string[]
    description: string
    price: number
    rating: number
}

type ProductFormEvent = FormEvent<HTMLFormElement> & {
    target: Record<string, { value: string }>
}

export default function ProductPage(): JSX.Element {
    const { navigate, setLastUpdate, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()
    
    const [product, setProduct] = useState<ProductProps>()
    const [productImage, setProductImage] = useState<string>('')
    const [finalPrice, setFinalPrice] = useState<number>()
    const [notLoggedUserModal, setNotLoggedUserModal] = useState<boolean>(false)
    const productQuantity = useRef<HTMLInputElement>(null)

    useEffect(() => {
        handleErrors(async () => {
            freeze && freeze()

            window.scrollTo({ top: 0 })
            
            const product = await retrieveProduct(context.productId)

            setProduct(product)
            setProductImage(product.images[0])

            unfreeze && unfreeze()

            return () => context.productId = null
        })
    }, [])

    const handleGoToLogin = () => {
        document.body.classList.remove('overflow-hidden')
    
        navigate && navigate('/login')
    }

    const handleAddToCart = (e: ProductFormEvent) => {
        e.preventDefault()

        if(!isUserLoggedIn()) {
            document.body.classList.add('overflow-hidden')

            setNotLoggedUserModal(true)

            return
        }

        handleErrors(async () => {
            if(product) {
                freeze && freeze()
                
                const number = e.target.quantity.value
                
                const productQuantity = parseInt(number)
                
                const finalPrice = productQuantity * product.price
                
                await saveProductToCart(context.productId, productQuantity, finalPrice)
                
                setLastUpdate && setLastUpdate(Date.now())
                
                unfreeze && unfreeze()
            }
        })
    }

    const handleSetFinalPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const productQuantity = e.target.value
        
        if(product) {
            const newFinalPrice = (parseInt(productQuantity) * product.price).toFixed(2)
            
            setFinalPrice(parseFloat(newFinalPrice))
        }
    }

    const handleCloseModal = () => {
        setNotLoggedUserModal(false)

        document.body.classList.remove('overflow-hidden')
    }

    const handleIsCurrentUser = () => {
        if(!isUserLoggedIn()) return true

        if(product && isCurrentUser(product.author)) return false

        return true
    }

    
    return <>
    <Container className={`absolute top-0 left-0 bg-white pt-28`}>
        {product ? <section className="w-full max-w-[1400px] hidden xl:flex flex-col bg-red-50 min-h-[700px] gap-6 p-10 2xl:p-20">
            <div className="flex gap-10 justify-between">
                <div className="flex w-3/5 p-4 bg-white rounded-xl gap-2">
                    <div className="flex flex-col w-[100px] gap-2">
                        {product && product.images.map(image => (
                            <img key={image} src={image} alt="product image" className='w-36 hover:bg-white cursor-pointer' onMouseOver={() => setProductImage(image)}/>
                        ))}
                    </div>
                    <img src={productImage} alt={product.name} className="w-5/6 h-fit max-h-[800px]"/>
                </div>
                <div className="w-2/5 h-fit flex flex-col items-center gap-10 pt-6 pb-12 px-16 border border-black rounded shadow-md shadow-gray-400">
                    <h1 className="w-full text-center">{product.name}</h1>
                    <div className="w-full flex gap-6 text-lg justify-evenly">
                        <p className="w-2/3">Category: <b>{product.category}</b></p>
                        <p className="w-1/3">Price: <b>{product.price}€</b></p>
                    </div>
                    <p className="w-full">{product.description}</p>
                    <div className="flex flex-col w-full items-center">
                        {handleIsCurrentUser() && <Form className="flex-col items-center w-full" onSubmit={handleAddToCart}>
                            <div className="flex items-center justify-between w-2/3">
                                <div className='flex flex-col items-center mr-4'>
                                    <p className="text-lg">Final price:</p>
                                    <b className="text-3xl text-blue-700">{finalPrice ? finalPrice : product.price}€</b>
                                </div>
                                <div className='flex flex-col'>
                                    <p>Quantity:</p>
                                    <Input ref={productQuantity} name="quantity" type="number" defaultValue={'1'} min='1' onChange={handleSetFinalPrice} className="border border-black w-20"/>
                                </div>
                            </div>
                            <Button className="hover:bg-gray-200 hover:border-gray-200 mt-6">Add to cart</Button>
                        </Form>}
                    </div>
                </div>
            </div>
        </section>
        :
        <section className="flex xl:hidden h-[700px] bg-white"/>}
        {product ? <section className="flex xl:hidden w-full justify-center bg-red-50 min-h-[700px] gap-6 p-10 2xl:p-20 pb-16">
            <div className="max-w-[700px] flex flex-col gap-6">
                <h1 className="text-center text-4xl">{product.name}</h1>
                <div className="flex justify-around p-4 border border-gray-500 rounded shadow-md shadow-gray-400 gap-2">
                    <div className="flex flex-col w-[100px] gap-2">
                        {product && product.images.map(image => (
                            <img key={image} src={image} alt="product image" className='w-36 hover:bg-white cursor-pointer' onMouseOver={() => setProductImage(image)}/>
                        ))}
                    </div>
                    <img src={productImage} alt={product.name} className="w-5/6 max-w-[500px] h-fit max-h-[600px]"/>
                </div>
                <p>{product.description}</p>
                <div className="w-full flex flex-col sm:flex-row justify-around gap-6">
                    <div className="w-full sm:w-fit flex gap-4 sm:block">
                        <p>Category: <b>{product.category}</b></p>
                        <p>Price: <b>{product.price}</b></p>
                    </div>
                    {handleIsCurrentUser() && <Form className="flex-col items-center" onSubmit={handleAddToCart}>
                        <div className="flex items-center justify-between gap-4">
                            <div className='flex items-center gap-1'>
                                <p className="text-center">Final price:</p>
                                <b className="text-xl text-blue-700">{finalPrice ? finalPrice : product.price}€</b>
                            </div>
                            <div className='flex items-center gap-1'>
                                <p>Quantity:</p>
                                <Input ref={productQuantity} name="quantity" type="number" defaultValue={'1'} min='1' onChange={handleSetFinalPrice} className="border border-black w-20"/>
                            </div>
                        </div>
                        <Button className="hover:bg-gray-200 hover:border-gray-200 mt-6 w-fit">Add to cart</Button>
                    </Form>}
                </div>
            </div>
            
        </section>
        :
        <section className="h-screen"></section>}
        <Footer />
    </Container>
    {notLoggedUserModal && <AskLoginModal
        handleGoToLogin={handleGoToLogin}
        handleCloseModal={handleCloseModal}
    />}
    </>
}