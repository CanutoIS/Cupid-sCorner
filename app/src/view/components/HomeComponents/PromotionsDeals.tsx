interface ProductProps {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

interface PromotionsDeals {
    products: ProductProps[]
    screenWidth: number
}


export default function PromotionsDeals({ products,screenWidth }: PromotionsDeals):JSX.Element {
    return <section className="w-screen max-w-full flex flex-col items-center gap-5 bg-red-50 p-10 mb-4">
        <h1 className="w-full poppins font-bold text-4xl text-center md:text-left">Promotions or Deals</h1>
        <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full flex flex-col gap-4 justify-around items-center p-4 bg-white rounded cursor-pointer shadow-md hover:shadow-gray-400 max-w-[500px]">
                <p className="text-lg">Valentine's Special Offer: Buy our Heart-Shaped Locket Necklace for 39.99€ and get a second one at half price! Keep your cherished memories close with this beautiful piece of jewelry. Offer valid until February 14th.</p>
                {products && <div className="flex gap-1 md:gap-3">
                    <article className="h-60 w-40 md:w-48 p-2 bg-white flex flex-col justify-around items-center cursor-pointer shadow-md">
                        <img src='product-images/heart-necklace.png' alt='Heart-Shaped Locket Necklace' className="h-28"/>
                        <p className=" poppins font-bold">Heart-Shaped Locket Necklace</p>
                        <p className="w-full text-left">39.99€</p>
                        <p className="w-full text-left">Rating: 4.3 stars</p>
                    </article>
                    <article className="h-60 w-40 md:w-48 p-2 bg-white flex flex-col justify-around items-center cursor-pointer shadow-md">
                        <img src='product-images/heart-necklace.png' alt='Heart-Shaped Locket Necklace' className="h-28"/>
                        <p className=" poppins font-bold">Heart-Shaped Locket Necklace</p>
                        <p className="w-full text-left"><s>39.99€</s> <b>19.99€</b></p>
                        <p className="w-full text-left">Rating: 4.3 stars</p>
                    </article>
                </div>}
            </div>
            <div className="w-full flex flex-col gap-4 justify-around items-center p-4 bg-white rounded cursor-pointer shadow-md hover:shadow-gray-400 max-w-[500px]">
                <p className="text-lg">Limited Time Discount: Get 10€ off the Eternal Love Infinity Bracelet! Express your eternal love with this sterling silver bracelet, now only 49.99€. Hurry, offer ends soon!</p>
                {products && <article className="h-60 w-48 md:p-2 bg-white flex flex-col justify-around items-center cursor-pointer shadow-md">
                    <img src='product-images/infinity-bracelet.png' alt={products[4].name} className="h-28"/>
                    <p className=" poppins font-bold">Eternal Love Infinity Bracelet</p>
                        <p className="w-full text-left"><s>59.99€</s> <b>49.99€</b></p>
                    <p className="w-full text-left">Rating: 5 stars</p>
                </article>}
            </div>
            {screenWidth > 1190 && <div className="w-full flex flex-col gap-4 justify-around items-center p-4 bg-white rounded cursor-pointer shadow-md hover:shadow-gray-400">
                <p className="text-lg">Spend a day of relaxation with your loved one! Purchase our Couples' Spa Retreat and receive a complimentary Love Potion Scented Candle to set the mood. Indulge in a couples massage, spa facilities, and a bottle of champagne. Make your romantic getaway extra special.</p>
                <div className="flex gap-3">
                    {products && <div className="flex gap-1 items-center">
                        <article className="h-60 w-48 md:p-2 bg-white flex flex-col justify-around items-center cursor-pointer shadow-md">
                            <img src='product-images/spa-retreat.jpg' alt="Couples' Spa Retreat" className="h-28"/>
                            <p className="w-full text-left poppins font-bold">Couples' Spa Retreat</p>
                            <p className="w-full text-left">199.99€</p>
                            <p className="w-full text-left">Rating: 4.4 stars</p>
                        </article>
                        <article className="h-60 w-48 md:p-2 bg-white flex flex-col justify-around items-center cursor-pointer shadow-md">
                            <img src='product-images/love-candle.jpg' alt='Love Potion Scented Candle' className="h-28"/>
                            <p className=" poppins font-bold">Love Potion Scented Candle</p>
                            <p className="w-full text-left text-red-500 font-bold">FREE</p>
                            <p className="w-full text-left">Rating: 4 stars</p>
                        </article>
                    </div>}
                </div>
            </div>}
        </div>
    </section>
}