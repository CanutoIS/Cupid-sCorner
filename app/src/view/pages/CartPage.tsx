import { useEffect, useState } from "react"
import { Container } from "../library"
import { useHandleErrors, useGetStopHeight } from "../hooks"
import { retrieveUserCartProducts } from "../../logic"
import { useAppContext } from "../hooks"
import { CartPageSideBar, Footer, ProductsToBuyPanel } from "../components"

interface productsToBuy {
    name: string,
    image: string
    id: string
    productQuantity: number
    finalPrice: number
}

interface CartPage {
    menu: boolean
    handleToggleMenu: () => void
}

type UserCartProductsProps = productsToBuy[]

export default function CartPage({ menu, handleToggleMenu }: CartPage): JSX.Element {
    const handleErrors = useHandleErrors()
    const { freeze, unfreeze } = useAppContext()
    const stopHeight = useGetStopHeight()

    const [userCartProducts, setUserCartProducts] = useState<UserCartProductsProps | null>(null)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    let totalPrice
    totalPrice = userCartProducts && userCartProducts.reduce((sum, product) => sum + product.finalPrice, 0)

    useEffect(() => {
        handleRetrieveUserCartProducts()

        setScreenWidth(window.innerWidth)
        
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, [])

    useEffect(() => {
        if(screenWidth > 1024 && !menu)
            handleToggleMenu()

        if(screenWidth < 1024 && menu)
            handleToggleMenu()
    }, [screenWidth]);

    const handleResize = () => setScreenWidth(window.innerWidth)

    const handleRetrieveUserCartProducts = () => {
        handleErrors(async () => {
            freeze && freeze()

            const cartProducts = await retrieveUserCartProducts()

            setUserCartProducts(cartProducts)

            unfreeze && unfreeze()
        })
    }

    return <Container className="mt-28">
        <section className="w-full min-h-full flex justify-between bg-white">
            <ProductsToBuyPanel
                userCartProducts={userCartProducts}
                handleRetrieveUserCartProducts={handleRetrieveUserCartProducts}
                handleToggleMenu={handleToggleMenu}
                menu={menu}
            />
            <CartPageSideBar
                stopHeight={stopHeight}
                userCartProductsLenght={userCartProducts?.length}
                totalPrice={totalPrice}
                menu={menu}
            />
        </section>
        <Footer />
    </Container>
}