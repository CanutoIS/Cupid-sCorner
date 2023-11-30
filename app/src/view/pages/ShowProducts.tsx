import { context } from "../../ui"
import { useEffect, useState } from "react"
import { useAppContext, useHandleErrors } from "../hooks"
import { retrieveAllProducts, retrieveProductsByCategory } from "../../logic"
import { Footer, ProductArticle, ShowCategoriesTopBar } from "../components"
import { Container } from "../library"

interface ProductProps {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

export default function ShowProducts():JSX.Element {
    const handleErrors = useHandleErrors()
    const { navigate, freeze, unfreeze } = useAppContext()

    const [products, setProducts] = useState<ProductProps[] | null>(null)
    const [category, setCategory] = useState<string | null>(null)

    useEffect(() => {
        handleErrors(async () => {
            freeze && freeze()

            window.scrollTo({ top: 0 })
            
            let products

            if(context.category === 'All products')
                products = await retrieveAllProducts()
            else
                products = await retrieveProductsByCategory(context.category)

            setProducts(products)

            unfreeze && unfreeze()
        })
    }, [category])

    const handleShowAllProducts = () => {
        setCategory('All products')
        
        context.category = 'All products'
    }

    const handleGoToHome = () => navigate && navigate('/')

    return <Container className="bg-white pt-28 showProducts">
        <section className="flex flex-col max-w-[1400px] items-center my-10 gap-8">
            <div className="w-full flex justify-between px-10 md:mb-[-50px] md:ml-20">
                <p className="flex items-center gap-2 cursor-pointer" onClick={handleGoToHome}><span className="material-symbols-outlined notranslate">keyboard_backspace</span>Home</p>
                <p className={`flex items-center justify-end gap-2 cursor-pointer ${context.category === 'All products' ? 'hidden' : ''}`} onClick={handleShowAllProducts}>View all products<span className="material-symbols-outlined notranslate">arrow_right_alt</span></p>
            </div>
            <h1 className="text-4xl text-center">{context.category}</h1>
            <ShowCategoriesTopBar
                setCategory={setCategory}
            />
            <div className="w-full flex flex-wrap justify-center gap-16 px-6 sm:px-20 xl:px-40 py-20 mb-10 bg-red-50">
                {products && products.map(product => (
                    <ProductArticle
                        key={product.id}
                        product={product}
                    />
                    ))}
            </div>
        </section>
        <Footer/>
    </Container>
}