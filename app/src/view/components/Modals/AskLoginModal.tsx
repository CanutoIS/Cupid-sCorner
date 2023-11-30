import { Button, ModalContainer, ModalWindow } from "../../library"

interface AskLoginModal {
    handleGoToLogin: () => void
    handleCloseModal: () => void
}

export default function AskLoginModal({ handleGoToLogin, handleCloseModal }: AskLoginModal):JSX.Element {
    return <ModalContainer className="notLoggedUserModal fixed top-0 left-0 z-30 h-full w-full bg-black bg-opacity-25">
        <ModalWindow className="h-80 w-80 sm:w-[500px] text-center">
            <h1 className='text-3xl w-2/3'>To proceed with your purchase, please log in or create an account.</h1>
            <div className="flex w-full justify-evenly">
                <Button onClick={handleGoToLogin}>Login now!</Button>
                <Button onClick={handleCloseModal}>Continue as a guest</Button>
            </div>
        </ModalWindow>
    </ModalContainer>
}