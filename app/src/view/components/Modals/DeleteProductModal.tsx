import { useEffect, useState } from "react";
import { useAppContext, useHandleErrors } from "../../hooks";
import { Button, Form, ModalContainer, ModalWindow } from "../../library"
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

    const handleCloseDeleteProductModal = () => {
        setDeleteProductModal(false)

        document.body.classList.remove('overflow-hidden')
    }

    return (
        <ModalContainer className="fixed top-0 left-0 bg-black bg-opacity-25 z-30" onClick={event => {
            if(event.target === document.querySelector('.ModalContainer')) handleCloseDeleteProductModal()
        }}>
            <ModalWindow className="w-11/12 sm:w-[500px] h-fit p-10 bg-white flex flex-col items-center gap-4">
                <p className="text-2xl">Are you sure you want to remove this product from store?</p>
                <div className="w-full flex flex-col items-center gap-2">
                    <p className="text-center text-xl">{product?.name}</p>
                    <img src={product?.images[0]} alt="Product to delete" className="h-40 w-fit"/>
                </div>

                <Form className="w-72 flex justify-evenly gap-4 mt-4" onSubmit={handleDeleteProductFromStore}>
                    <Button className="w-36">Delete</Button>
                    <Button className="w-36" type="button" onClick={handleCloseDeleteProductModal}>Cancel</Button>
                </Form>
            </ModalWindow>
        </ModalContainer>
    )
}