import { useState, useEffect } from "react"
import { Container } from "../library"
import { Footer, LogoutModal, OwnProductsPanel, ProfileSideBar, UserAvatarModal } from "../components"
import { useGetStopHeight } from "../hooks"

interface Profile {
    menu: boolean
    handleToggleMenu: () => void
}

type ProductProps = {
    id: string
    name: string
    image: string
    price: number
    rating: string
}

export default function Profile({ menu, handleToggleMenu }: Profile): JSX.Element {
    const stopHeight = useGetStopHeight()

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [removalState, setRemovalState] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)
    const [updateAvatarModal, setUpdateAvatarModal] = useState(false)
    const [userProducts, setUserProducts] = useState<ProductProps[]>()

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    useEffect(() => {
        if(screenWidth > 1024 && !menu)
            handleToggleMenu()

        if(screenWidth < 1024 && menu)
            handleToggleMenu()
    }, [screenWidth]);

    const handleResize = () => setScreenWidth(window.innerWidth)


    const handleToggleRemovalState = () => {
        if(!userProducts?.length) return
        
        if(screenWidth < 1024) handleToggleMenu()
    
        setRemovalState(!removalState)
    }
    
    const handleToggleLogoutModal = () => {
        !logoutModal ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
    
        setLogoutModal(!logoutModal)
    }

    const handleToggleUpdateAvatarModal = () => setUpdateAvatarModal(!updateAvatarModal)

    return <Container>
        <section className="w-full h-full m-auto pt-28 flex items-center bg-white">
            <OwnProductsPanel
                removalState={removalState}
                handleToggleMenu={handleToggleMenu}
                menu={menu}
                userProducts={userProducts}
                setUserProducts={setUserProducts}
            />
            <ProfileSideBar
                stopHeight={stopHeight}
                handleToggleLogoutModal={handleToggleLogoutModal}
                handleToggleRemovalState={handleToggleRemovalState}
                handleToggleUpdateAvatarModal={handleToggleUpdateAvatarModal}
                menu={menu}
            />
        </section>
        {logoutModal && <LogoutModal
            handleToggleLogoutModal={handleToggleLogoutModal}
        />}
        {updateAvatarModal && <UserAvatarModal
            handleToggleUpdateAvatarModal={handleToggleUpdateAvatarModal}
        />}
        <Footer />
    </Container>
}