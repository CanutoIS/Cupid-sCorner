import { useState, useEffect } from "react";
import {
    HomeTop,
    Footer,
    PromotionsDeals,
    BestSellingProducts,
} from "../components";
import { Container } from "../library";
import { useAppContext, useHandleErrors } from "../hooks";
import { retrieveAllProducts } from "../../logic";
import { context } from "../../ui";
import CategeriesSectionBelow from "../components/HomeComponents/CategoriesSectionBelow";
import TopRatedProducts from "../components/HomeComponents/TopRatedProducts";

interface ProductProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
}

export default function Home(): JSX.Element {
    const handleErrors = useHandleErrors();
    const { navigate, freeze, unfreeze } = useAppContext();

    const [products, setProducts] = useState<ProductProps[]>();
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        handleErrors(async () => {
            freeze && freeze();

            window.scrollTo({ top: 0 });

            const products = await retrieveAllProducts();

            setProducts(products);

            unfreeze && unfreeze();
        });

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => setScreenWidth(window.innerWidth)

    const handleShowProducts = (category: string) => {
        context.category = category;

        navigate && navigate("/show-products");
    };

    return (
        <Container className="absolute top-0 left-0 pt-28">
            <main className="max-w-[1400px] w-screen h-full m-auto bg-white">
                <HomeTop />
                {products ? <>
                    <BestSellingProducts
                        products={products}
                        screenWidth={screenWidth}
                    />

                    <TopRatedProducts
                        products={products}
                        screenWidth={screenWidth}
                    />

                    <PromotionsDeals
                        products={products}
                        screenWidth={screenWidth}
                    />
                </>
                :
                   <div className="h-[400px] bg-red-50 flex justify-center items-center text-4xl font-bold">Loading...</div> 
                }

                <CategeriesSectionBelow
                    screenWidth={screenWidth}
                    handleShowProducts={handleShowProducts}
                />
            </main>
            <Footer />
        </Container>
    );
}
