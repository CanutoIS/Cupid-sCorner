import { ProductArticle } from "..";

interface ProductProps {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
}

interface BestSellingProducts {
    products: ProductProps[]
    screenWidth: number
}

export default function BestSellingProducts({ products, screenWidth }: BestSellingProducts):JSX.Element {
    return <section className="h-fit bg-red-50 xl:py-20 xl:px-5 py-10 flex flex-col xl:flex-row xl:items-around gap-8 xl:gap-0">
    <div className="w-screen flex flex-col md:flex-row xl:flex-col justify-center gap-4 items-center xl:w-2/5">
        <h1 className=" w-4/5 md:w-2/5 text-center poppins font-bold text-4xl xl:w-full">
            Best selling products
        </h1>
        <p className=" w-4/5 md:w-2/5 text-xl text-center xl:w-4/5">
            Explore our customer-favorite gifts. These popular
            picks are sure to make your celebration of love
            extra special.
        </p>
    </div>
    <div className="w-screen flex justify-evenly items-center xl:w-3/5 px-5 gap-1">
        {products && screenWidth > 790
            ? products
                  .slice(0, 4)
                  .map((product) => (
                      <ProductArticle
                          key={product?.name}
                          product={product}
                      />
                  ))
            : products &&
              products
                  .slice(0, 2)
                  .map((product) => (
                      <ProductArticle
                          key={product?.name}
                          product={product}
                      />
                  ))}
    </div>
</section>
}