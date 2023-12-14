import { useLocation } from "react-router-dom"
import { DeleteProductModal } from ".."
import { deleteUserProduct, retrieveUserProducts } from "../../../logic"
import { context } from "../../../ui"
import { useAppContext, useHandleErrors } from "../../hooks"
import { useState, useEffect, FormEvent } from "react"

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: string
}

interface OwnProductsPanelProps {
    userProducts: ProductProps[] | undefined
    setUserProducts: (products: ProductProps[]) => void
    removalState: boolean
    handleToggleMenu: () => void
    menu: boolean
}

export default function OwnProductsPanel({ userProducts, setUserProducts, removalState, handleToggleMenu, menu }: OwnProductsPanelProps): JSX.Element {
    const { navigate, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()
    const location = useLocation()
    const currentPath = location.pathname
    
    const [deleteProductModal, setDeleteProductModal] = useState(false)

    useEffect(() => {
        handleErrors(async () => {
            freeze && freeze()

            window.scrollTo({ top: 0 })
            
            const products = await retrieveUserProducts()
            
            setUserProducts(products)

            unfreeze && unfreeze()
        })
    }, []);

    const handleOpenDeleteProductModal = (productId: string) => {
        context.productId = productId

        document.body.classList.add('overflow-hidden')

        setDeleteProductModal(true)
    }

    const handleDeleteProductFromStore = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        handleErrors(async () => {
            freeze && freeze()

            const updatedProducts = await deleteUserProduct(context.productId)

            setUserProducts(updatedProducts)

            unfreeze && unfreeze()

            setDeleteProductModal(false)
        })
    }
    
    const handleGoToHome = () => navigate && navigate('/')

    const handleGoToProduct = (productId: string) => {
        context.productId = productId

        navigate && navigate('/product')
    }

    return ( <>
            <div className="w-full lg:w-4/5 min-h-[650px] flex flex-col items-center gap-4">
                <p className="absolute top-32 sm:top-36 mt-2 left-10 2xl:left-20 flex items-center gap-2 cursor-pointer text-lg" onClick={handleGoToHome}><span className="material-symbols-outlined notranslate">keyboard_backspace</span>Home</p>

                {currentPath === '/profile' &&
                    <div className={`flex lg:hidden p-3 rounded-full border border-black hover:bg-gray-100 cursor-pointer active:bg-gray-200 select-none mt-[-20px] sm:mt-[-5px] fixed top-36 z-20 bg-white ${menu ? 'right-64' : 'right-10'}`} onClick={handleToggleMenu}>
                        <span className="material-symbols-outlined notranslate">menu</span>
                    </div>
                }
    
                <h1 className='mx-2 mb-2 mt-16 sm:mt-6 w-full text-center'>Own products</h1>
                <ul className="flex justify-center sm:justify-around w-11/12 sm:px-10 md:px-20 gap-16 py-10 flex-wrap bg-red-50 rounded-2xl border border-gray-700 mb-10 min-h-[600px]">
                    {userProducts && userProducts.length
                        ?
                        (userProducts.map(product => (
                            <div key={product.id} className="w-fit h-fit border border-gray-300">
                                <li  className="w-48 h-64 py-2 px-4 flex flex-col items-center bg-white cursor-pointer hover:bg-gray-100" onClick={() => handleGoToProduct(product.id)}>
                                    <img src={product.image} alt="product image" className="mb-2 h-32" />
                                    {product.name.length <= 30 ? <p className="w-full text-center font-bold mb-2">{product.name}</p> : <p className="w-full text-center font-bold mb-2">{product.name.substring(0, 30) + '...'}</p>}
                                    <p className="w-full flex items-center gap-2 text-start">{product.price.toFixed(2)}€</p>
                                    <p className="w-full text-start">Rating: {product.rating}{product.rating === '1' ? ' star' : ' stars'}</p>
                                </li>
                                {removalState && <p className="w-full text-center cursor-pointer h-8 flex justify-center items-center bg-white hover:bg-red-100 active:bg-red-200" onClick={() => handleOpenDeleteProductModal(product.id)}>Delete product</p>}
                            </div>
                        )))
                        :
                        <h2 className="w-full text-center text-3xl">You have no products uploaded</h2>
                    }
                </ul>
            </div>
            {deleteProductModal && <DeleteProductModal
                setDeleteProductModal={setDeleteProductModal}
                handleDeleteProductFromStore={handleDeleteProductFromStore}
            />}
        </>
    )
}