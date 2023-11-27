import { ProductArticle } from "..";

interface ProductProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
}

interface TopRatedProducts {
    products: ProductProps[]
    screenWidth: number
}

export default function TopRatedProducts({ products, screenWidth }: TopRatedProducts):JSX.Element {
    return <section className="h-fit px-5 pt-10 pb-16 my-4 w-screen max-w-full">
    <h1 className="text-center md:text-right poppins font-bold text-4xl px-10 md:px-0">
        Top rated products
    </h1>
    <div className="w-full flex justify-around mt-10 gap-1">
        {(screenWidth > 1210
            ? products.slice(4, 10)
            : screenWidth > 1000
            ? products.slice(4, 9)
            : screenWidth > 780
            ? products.slice(4, 8)
            : screenWidth > 600
            ? products.slice(4, 7)
            : products.slice(4, 6)
        ).map((product) => (
            <ProductArticle
                key={product?.name}
                product={product}
            />
        ))}
    </div>
</section>
}