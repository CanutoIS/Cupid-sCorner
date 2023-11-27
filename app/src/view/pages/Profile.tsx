import { useState, useEffect } from "react"
import { Container } from "../library"
import { Footer, LogoutModal, OwnProductsPanel, ProfileSideBar, UserAvatarModal } from "../components"

interface Profile {
    menu: boolean
}

export default function Profile({ menu }: Profile): JSX.Element {
    const [stopHeight, setStopHeight] = useState(0)
    const [removalState, setRemovalState] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)
    const [updateAvatarModal, setUpdateAvatarModal] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const remainingSpace = documentHeight - scrollPosition - windowHeight

            const bottomHeight = remainingSpace < 200 ? 200 - remainingSpace : 0
            
            setStopHeight(bottomHeight)
          }
      
          window.addEventListener('scroll', handleScroll)
      
          return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    }, [])

    const handleToggleRemovalState = () => setRemovalState(!removalState)
    
    const handleToggleLogoutModal = () => setLogoutModal(!logoutModal)

    const handleToggleUpdateAvatarModal = () => setUpdateAvatarModal(!updateAvatarModal)

    return <Container>
        <section className="w-full h-full m-auto pt-28 flex items-center">
            <OwnProductsPanel
                removalState={removalState}
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