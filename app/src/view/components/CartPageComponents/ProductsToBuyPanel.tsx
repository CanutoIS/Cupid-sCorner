import { useAppContext, useHandleErrors } from "../../hooks"
import { context } from "../../../ui"
import { removeProductFromCart } from "../../../logic"
import { useLocation } from "react-router-dom";

interface productsToBuy {
    name: string,
    image: string
    id: string
    productQuantity: number
    finalPrice: number
}

interface productsToBuyPanel {
    userCartProducts: productsToBuy[] | null
    handleRetrieveUserCartProducts: () => void
    handleToggleMenu: () => void
    menu: boolean
}

export default function ProductsToBuyPanel({ userCartProducts, handleRetrieveUserCartProducts, handleToggleMenu, menu}: productsToBuyPanel):JSX.Element {
    const { navigate, freeze, unfreeze, setLastUpdate } = useAppContext()
    const handleErrors = useHandleErrors()
    
    const location = useLocation()
    const currentPath = location.pathname

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

    return <div className="w-full lg:w-4/5 min-h-[650px] flex flex-col items-center gap-4">
    <p className="absolute top-32 sm:top-36 mt-2 left-10 2xl:left-20 flex items-center gap-2 cursor-pointer text-lg" onClick={handleGoToHome}><span className="material-symbols-outlined notranslate">keyboard_backspace</span>Home</p>

    {currentPath === '/cart' &&
        <div className={`flex lg:hidden p-3 rounded-full border border-black hover:bg-gray-100 cursor-pointer active:bg-gray-200 select-none mt-[-20px] sm:mt-[-5px] fixed top-36 z-20 bg-white ${menu ? 'right-64' : 'right-10'}`} onClick={handleToggleMenu}>
            <span className="material-symbols-outlined notranslate">menu</span>
        </div>
    }

    <h1 className='mx-2 mb-2 mt-16 sm:mt-6 w-full text-center'>Products in Cart</h1>

    <ul className="flex justify-center sm:justify-normal w-11/12 sm:px-10 md:px-20 gap-16 py-10 flex-wrap bg-red-50 rounded-2xl border border-gray-700 mb-10 min-h-[600px]">
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
}