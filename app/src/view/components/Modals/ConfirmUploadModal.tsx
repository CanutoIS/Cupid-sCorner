import { Button, ModalContainer, ModalWindow } from "../../library";

interface ConfirmUploadModalProps {
    handleCreateProduct: () => void
    handleReturnToPreview: () => void
}

export default function ConfirmUploadModal({ handleCreateProduct, handleReturnToPreview }: ConfirmUploadModalProps):JSX.Element {
    return <ModalContainer className="fixed top-0 left-0 bg-black bg-opacity-25 z-30" onClick={event => {
        if(event.target === document.querySelector('.ModalContainer')) handleReturnToPreview()
    }}>
        <ModalWindow className="w-[400px] p-8 gap-10 xl:w-[500px] 2xl:w-[600px]">
            <h1 className="text-3xl text-center">Complete Upload Process</h1>
            <p>This is a preview of the product you are about to upload. The information and images here are for review purposes. Once you confirm, the product will be officially added to our e-commerce platform. Ensure all details are accurate before finalizing the upload.</p>
            <div className="flex gap-6">
                <Button onClick={handleCreateProduct}>Confirm upload</Button>
                <Button onClick={handleReturnToPreview}>Return to preview</Button>
            </div>
        </ModalWindow>
    </ModalContainer>
}