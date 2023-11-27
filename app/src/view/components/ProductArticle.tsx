import { context } from "../../ui"
import { useAppContext } from "../hooks"

interface ProductProps {
    id: string
    name: string
    image: string
    price: number
    rating: number
}

interface ProductArticleProps {
    product: ProductProps
}

export default function ProductArticle({ product }: ProductArticleProps): JSX.Element {
    const { id, name, image, price, rating } = product
    const { navigate } = useAppContext()

    const handleGoToProductPage = () => {
        context.productId = id
        
        navigate && navigate('/product')
    }

    return <article className="h-60 w-48 p-2 bg-white shadow-md hover:shadow-gray-400 flex flex-col justify-around items-center cursor-pointer" onClick={handleGoToProductPage}>
        <img src={image} alt={name} className="h-28"/>
        <p className="font-bold text-center poppins">{name}</p>
        <p className="w-full text-left">{price}€</p>
        <p className="w-full text-left">{`Rating: ${rating === 1 ? rating + ' star' : rating + ' stars'}`}</p>
    </article>
}