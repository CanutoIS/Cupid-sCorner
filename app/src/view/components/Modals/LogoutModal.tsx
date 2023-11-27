import { logoutUser } from "../../../logic";
import { useAppContext } from "../../hooks";
import { Button, ModalContainer, ModalWindow } from "../../library";

interface LogoutModalProps {
    handleToggleLogoutModal: () => void
}

export default function logoutModal({ handleToggleLogoutModal}: LogoutModalProps): JSX.Element {
    const { navigate } = useAppContext()
    
    const handleLogout = () => {
        logoutUser()
    
        handleToggleLogoutModal()

        navigate && navigate('/')
    }

    return (
    <ModalContainer className="absolute top-0 left-0 bg-black bg-opacity-25" onClick={event => {
        if(event.target === document.querySelector('.ModalContainer'))
        handleToggleLogoutModal()
    }}>
        <ModalWindow className="w-[500px] h-96">
            <p className="text-2xl">Are you sure you want to log out?</p>
            <div className="w-full flex justify-evenly">
                <Button className="w-32" onClick={handleLogout}>Log out</Button>
                <Button className="w-32" onClick={() => handleToggleLogoutModal()}>Cancel</Button>
            </div>
        </ModalWindow>
    </ModalContainer>
    )
}