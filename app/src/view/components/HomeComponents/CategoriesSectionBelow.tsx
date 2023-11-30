import { categories } from "../../utils"

interface CategeriesSectionBelow {
    screenWidth: number
    handleShowProducts: (category: string) => void
}

export default function CategeriesSectionBelow({ screenWidth, handleShowProducts }: CategeriesSectionBelow):JSX.Element {
    return <section className={`w-screen max-w-full h-fit ${screenWidth > 400 ? 'px-10 pt-10 pb-16' : 'pb-6'}  my-4 flex flex-col gap-7`}>
    <div className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
        <p className="p-5 rounded-lg bg-red-100 hover:bg-red-200 font-bold text-xl w-64 text-center border border-black cursor-pointer" onClick={() => handleShowProducts('All products')}>View all products</p>
        <h1 className="w-full text-center sm:text-right mb-3 poppins font-bold text-3xl sm:text-4xl">All categories</h1>
    </div>
    {screenWidth > 850
    ?
    <>
        <ul className="w-full flex justify-between">
            {categories.slice(0, 6).map((category, index) => (
                <li key={category} className={`p-5 border border-black hover:shadow-md hover:shadow-black bg-cover bg-center hover:bg-red-50 cursor-pointer rounded font-bold text-white m-1`} onClick={() => handleShowProducts(category)} style={{
                    backgroundImage: `url(/category-images/category-${index}.jpg)`
                }}>{category}</li>
                ))}
        </ul>
        <ul className="w-screen max-w-full flex justify-between">
            {categories.slice(6, 12).map((category, index) => (
                <li key={category} className={`p-5 border border-black hover:shadow-md hover:shadow-black bg-cover bg-center hover:bg-red-50 cursor-pointer rounded font-bold text-white m-1`} onClick={() => handleShowProducts(category)} style={{
                    backgroundImage: `url(/category-images/category-${index + 6}.jpg)`
                }}>{category}</li>
                ))}
        </ul>
    </>
    :
        <ul className="w-full flex flex-wrap justify-evenly">
            {categories.map((category, index) => (
                <li key={category} className={`w-[140px] px-5 py-2 mt-4 border border-black hover:shadow-md hover:shadow-black bg-cover bg-center hover:bg-red-50 cursor-pointer rounded font-bold text-white flex justify-center items-center m-1`} onClick={() => handleShowProducts(category)} style={{
                    backgroundImage: `url(/category-images/category-${index}.jpg)`
                }}>{category}</li>
            ))}
        </ul>
    }
</section>
}