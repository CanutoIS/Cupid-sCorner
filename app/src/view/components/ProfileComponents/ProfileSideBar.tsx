import { useAppContext } from "../../hooks";
import { Button } from "../../library";

interface ProfileSideBarProps {
    stopHeight: number
    handleToggleLogoutModal: () => void
    handleToggleRemovalState: () => void
    handleToggleUpdateAvatarModal: () => void
    menu: boolean
}

export default function ProfileSideBar({ stopHeight, handleToggleLogoutModal, handleToggleRemovalState, handleToggleUpdateAvatarModal, menu }: ProfileSideBarProps):JSX.Element {
    const { navigate } = useAppContext()

    const handleGoToUploadProduct = () => navigate && navigate('/upload-product')

    return <div className={`w-64 lg:w-1/5 lg:min-w-[240px] h-[${window.innerHeight + 100}px] flex flex-col justify-center items-center gap-10 bg-red-50 px-3 2xl:px-7 pt-28 border-l border-gray-700 fixed z-10 right-0 transition-all duration-300 ${menu ? 'opened-menu' : 'closed-menu'} lg:opened-menu`} style={{
        bottom: `${stopHeight}px`,
        height: `${window.innerWidth > 450 ? window.innerHeight + 120 : window.innerHeight}px`
    }}>
        <div className=" w-full mb-[-150px] flex justify-around bg-white rounded-lg p-2 gap-2">
            <Button className="w-36" onClick={handleToggleUpdateAvatarModal}>Change avatar</Button>
            <Button className="w-36" onClick={() => handleToggleLogoutModal()}>Log out</Button>
        </div>
        <div className="h-40 flex flex-col justify-around items-center bg-white w-full rounded-lg mt-36 pb-2">
            <p className="w-full text-center text-lg p-2 rounded">Expand your inventory! Add a new product to your store now. 🌟</p>
            <Button onClick={handleGoToUploadProduct}>Upload product</Button>
        </div>
        <div className="h-44 flex flex-col justify-around items-center bg-white w-full rounded-lg pb-2">
            <p className="w-full text-center text-lg p-2 rounded">Time for a refresh? Easily remove a product from your store to keep things up-to-date.</p>
            <Button onClick={handleToggleRemovalState}>Remove from Store</Button>
        </div>
    </div>
}