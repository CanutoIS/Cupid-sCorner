import { useState, useEffect } from 'react'

interface ProductFields {
    name: string
    images: string[]
    price: string
    description: string
    category: string
}

interface ProductPreviewProps {
    productValues: ProductFields
}

export default function ProductPreview({ productValues }: ProductPreviewProps): JSX.Element {
    const { name, images, description, price, category } = productValues

    const [productImage, setProductImage] = useState(images[0] || '')

    useEffect(() => {
        setProductImage(images[0])
    }, [images]);
    
    return <section className="flex flex-col gap-10 w-3/4 min-h-full bg-white p-10 m-4 2xl:mx-20">
        <h1 className='w-full text-center poppins font-bold text-5xl'>Product preview</h1>
        <div className='w-full flex justify-center gap-16 h-4/5'>
            <div className="flex justify-center gap-4">
                <div id="images-column" className="flex flex-col items-center gap-4">
                    {Array.isArray(images) && images.map((image) => {
                        return <img key={image} src={image} className='w-32 h-fit cursor-pointer' onMouseOver={() => setProductImage(image)}/>
                    })}
                </div>
                {images && images.length
                    ?
                    <img src={productImage} alt="Image shown" className='w-[600px] h-fit'/>
                    :
                    <div className='w-96 h-full border border-black flex justify-center items-center text-2xl'>Product Image</div>
                }
            </div>
            <div className='w-1/3 bg-red-50 flex flex-col p-5 2xl:p-10 gap-10'>
                <h2 className='w-full text-center text-4xl'>{name || 'Name'}</h2>
                <div className='w-full flex justify-around'>
                    <p className={`${category ? 'text-lg w-2/3' : 'border border-black rounded w-1/2 py-2 px-4 mr-4'}`}>Category: <b>{category}</b></p>
                    <p className={`${price ? 'text-lg text-center w-1/3' : 'border border-black rounded w-1/2 py-2 px-4'}`}>Price: <b>{price && `${price}€`}</b></p>
                </div>
                <p className={`${description ? '' : 'h-40 border border-black flex justify-center items-center rounded'}`}>{description || 'Description'}</p>
            </div>
        </div>
    </section>
}