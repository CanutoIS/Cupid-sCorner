import { ChangeEvent, FormEvent } from "react"
import { Button, Form, Input } from "../../library"

interface ProductFields {
    name: string
    images: string[]
    price: string
    description: string
    category: string
}

type OnChangeProductFields = ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement> & ChangeEvent<HTMLSelectElement> & {
    target: Record<string, { value: string }>;
}

interface ProductCategoryProps {
    productValues: ProductFields
    handleOnChange: (e: OnChangeProductFields) => void
    handleRenderImages: (e: ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ProductFieldsForm({ productValues, handleOnChange, handleRenderImages, handleSubmit }: ProductCategoryProps):JSX.Element {
    return (
        <Form className="flex flex-col gap-4 p-8 min-w-[250px] sm:px-16 lg:px-8" onSubmit={handleSubmit}>
            <h1 className=" w-full text-center mb-4 poppins lg:hidden text-4xl">Product fields</h1>
            <div className="flex items-center min-w-[200px]">
                <div className='flex flex-col gap-2 w-full'>
                    <b>Name of the profuct</b>
                    <Input name="name" className="w-full" placeholder="Name of the product" onChange={handleOnChange} defaultValue={productValues.name} autoComplete="off"/>
                </div>
            </div>

            <div className="w-full border-t border-gray-500"/>

            <div className="flex items-center gap-10">
                <div className='flex flex-col gap-2 w-full'>
                    <b>Images of the product</b>
                    <Input name="images" type="file" accept="image/*" className="cursor-pointer" multiple onChange={handleRenderImages} autoComplete="off"/>
                </div>
            </div>
            
            <div className="w-full border-t border-gray-500"/>
            
            <div className='flex flex-col gap-2 w-full'>
                <b>Description of the profuct</b>
                <textarea name="description" className="w-full h-40 p-2" defaultValue={productValues.description} onChange={handleOnChange}></textarea>
            </div>
            
            <div className="w-full border-t border-gray-500"/>

            <div className='flex flex-col gap-2 w-full'>
                <b>Product category</b>
                <select name="category" className="p-2 border border-slate-300 rounded-lg w-full" onChange={handleOnChange}>
                    <option value=''>--category--</option>
                    <option value='Romantic Gifts'>Romantic Gifts</option>
                    <option value='Jewelry'>Jewelry</option>
                    <option value='Clothes and Accessories'>Clothes and Accessories</option>
                    <option value='Romantic Experiences'>Romantic Experiences</option>
                    <option value='Technology and Gadgets'>Technology and Gadgets</option>
                    <option value='Home Decoration'>Home Decoration</option>
                    <option value='Kitchen Appliances'>Kitchen Appliances</option>
                    <option value='Romantic Books and Movies'>Romantic Books and Movies</option>
                    <option value='Health & Wellness'>Health & Wellness</option>
                    <option value='Plants and Gardening'>Plants and Gardening</option>
                    <option value='Games and Puzzles'>Games and Puzzles</option>
                    <option value='Pets and Pet Gifts'>Pets and Pet Gifts</option>
                </select>
            </div>
            
            <div className="w-full border-t border-gray-500"/>

            <div className='flex flex-col gap-2 w-full'>
                <b>Price of the profuct</b>
                <Input name="price" className='w-full' type="number" min='1' step="0.01" defaultValue={productValues.price} autoComplete="off" onChange={handleOnChange}/>
            </div>

            <div className="w-full border-t border-gray-500"></div>

            <div className="w-full flex justify-center my-2 lg:hidden">
                <span className="material-symbols-outlined">arrow_downward_alt</span>
                <h2 className="text-xl text-center">Check out the preview of the product below</h2>
                <span className="material-symbols-outlined">arrow_downward_alt</span>
            </div>

            <Button className="">Upload product</Button>
        </Form>
    )
}