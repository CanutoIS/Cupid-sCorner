import { useEffect, useState } from "react";
import { useAppContext, useHandleErrors } from "../../hooks";
import { Button, Form, ModalContainer } from "../../library"
import { retrieveProduct } from "../../../logic";
import { context } from "../../../ui";

interface DeleteProductModalProps {
    setDeleteProductModal: (value: boolean) => void
    handleDeleteProductFromStore: () => void
}

interface ProductProps {
    id: string
    author: string
    name: string
    images: string[]
    description: string
    price: number
    category: string
    rating: number
}

export default function DeleteProductModal({ setDeleteProductModal, handleDeleteProductFromStore }: DeleteProductModalProps): JSX.Element {
    const handleErrors = useHandleErrors()
    const { freeze, unfreeze } = useAppContext()

    const [product, setProduct] = useState<ProductProps>()

    useEffect(() => {
        handleErrors(async () => {
            freeze && freeze()

            const product = await retrieveProduct(context.productId)

            setProduct(product)

            unfreeze && unfreeze()
        })
    }, []);

    return (
        <ModalContainer className="absolute top-0 left-0 bg-black bg-opacity-25" onClick={event => {
            if(event.target === document.querySelector('.ModalContainer'))
                setDeleteProductModal(false)
        }}>
            <Form className="w-[500px] h-fit p-10 bg-white flex flex-col items-center gap-4" onSubmit={handleDeleteProductFromStore}>
                <p className="text-2xl">Are you sure you want to remove this product from store?</p>
                <div className="w-full flex flex-col items-center gap-2">
                    <p className="text-center text-xl">{product?.name}</p>
                    <img src={product?.images[0]} alt="Product to delete" className="h-40 w-fit"/>
                </div>

                <div className="w-72 flex justify-evenly gap-4 mt-4">
                    <Button className="w-36">Delete</Button>
                    <Button className="w-36" type="button" onClick={() => setDeleteProductModal(false)}>Cancel</Button>
                </div>
            </Form>
        </ModalContainer>
    )
}