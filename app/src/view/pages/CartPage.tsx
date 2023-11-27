import { useEffect, useState } from "react"
import { Container } from "../library"
import { useHandleErrors } from "../hooks"
import { retrieveUserCartProducts, removeProductFromCart } from "../../logic"
import { useAppContext } from "../hooks"
import { Footer } from "../components"
import { context } from "../../ui"

interface productsToBuy {
    name: string,
    image: string
    id: string
    productQuantity: number
    finalPrice: number
}

type UserCartProductsProps = productsToBuy[]

export default function CartPage(): JSX.Element {
    const handleErrors = useHandleErrors()
    const { navigate, setLastUpdate, freeze, unfreeze } = useAppContext()

    const [userCartProducts, setUserCartProducts] = useState<UserCartProductsProps | null>(null)
    const [stopHeight, setStopHeight] = useState(0)

    let totalPrice
    totalPrice = userCartProducts && userCartProducts.reduce((sum, product) => sum + product.finalPrice, 0)

    const handleRetrieveUserCartProducts = () => {
        handleErrors(async () => {
            freeze && freeze()

            const cartProducts = await retrieveUserCartProducts()

            setUserCartProducts(cartProducts)

            unfreeze && unfreeze()
        })
    }

    useEffect(() => {
        handleRetrieveUserCartProducts()

        window.scrollTo({ top: 0 })

        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const remainingSpace = documentHeight - scrollPosition - windowHeight

            const bottomHeight = remainingSpace < 100 ? 100 - remainingSpace : 0

            
            setStopHeight(bottomHeight)
          }
      
          window.addEventListener('scroll', handleScroll)
      
          return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    }, [])
    
    const handleGoToProduct = (productId: string) => {
        context.productId = productId

        navigate && navigate('/product')
    }

    const handleGoToHome = () => navigate && navigate('/')

    const handleDeleteProductFromCart = (productId: string) => {
        handleErrors(async () => {
            freeze && freeze()

            await removeProductFromCart(productId)

            handleRetrieveUserCartProducts()

            setLastUpdate && setLastUpdate(Date.now())

            unfreeze && unfreeze()
        })
    }

    return <Container className="mt-28">
        <section className="w-full min-h-full flex justify-between">
            <div className="w-4/5 min-h-[650px] flex flex-col items-center gap-4">
                <p className="absolute top-36 mt-2 left-10 2xl:left-20 flex items-center gap-2 cursor-pointer text-lg" onClick={handleGoToHome}><span className="material-symbols-outlined notranslate">keyboard_backspace</span>Home</p>
                <h1 className='mx-2 my-6 w-full text-center'>Products in Cart</h1>
                <ul className="flex w-11/12 px-36 gap-16 py-10 flex-wrap bg-red-50 rounded-2xl border border-gray-700 mb-10 min-h-[600px]">
                    {userCartProducts && userCartProducts.length
                        ?
                        (userCartProducts.map(product => (
                            <div key={product.id} className="w-fit h-fit border border-gray-300">
                                <li  className="w-48 h-64 p-2 flex flex-col justify-between items-center bg-white cursor-pointer hover:bg-gray-100" onClick={() => handleGoToProduct(product.id)}>
                                    <img src={product.image} alt="product image" className="mb-2 h-32" />
                                    <p className="w-full text-center">{product.name}</p>
                                    <p className="w-full text-start">Quantity: <b className="text-lg">{product.productQuantity}</b></p>
                                    <p className="w-full flex items-center gap-2 text-start">Total price: <b className="text-xl font-bold text-blue-600">{product.finalPrice.toFixed(2)}€</b></p>
                                </li>
                                <p className="w-full text-center cursor-pointer h-8 flex justify-center items-center bg-white hover:bg-red-100 active:bg-red-200" onClick={() => handleDeleteProductFromCart(product.id)}>Delete product</p>
                            </div>
                        )))
                        :
                        <h2 className="w-full text-center text-3xl">There are no products in the cart yet</h2>
                    }
                </ul>
            </div>
            <div className={`w-1/5 h-[${window.innerHeight + 100}px] bg-red-100 px-3 2xl:px-7 pt-28 border-l border-gray-700 flex flex-col justify-center items-center gap-10 fixed right-0 transition-all duration-300`} style={{
                bottom: `${stopHeight}px`,
                height: `${window.innerHeight + 220}px`
            }}>
                <div className="h-[450px] flex flex-col justify-between items-center py-6 px-2 bg-white w-full rounded-lg 2xl:px-6 mt-16">
                    <u className="text-xl w-full text-center">Your orders</u>
                    <div className="w-full flex flex-col items-center p-5 rounded-lg border border-black gap-2">
                        <b className="text-2xl text-center">Total products</b>
                        <p className="text-xl text-center">{userCartProducts?.length} diferent products</p>
                    </div>
                    <div className="w-full flex flex-col items-center p-5 rounded-lg border border-black gap-2 mt-[-20px]">
                        <b className="text-2xl">Total price</b>
                        <p className="text-xl">{totalPrice?.toFixed(2)}€</p>
                    </div>

                    <p className="w-full text-center p-5 rounded-xl border border-black bg-amber-200 active:bg-amber-300 cursor-pointer">Checkout</p>
                </div>
            </div>
        </section>
        <Footer />
    </Container>
}