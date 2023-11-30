import { Button } from "../library";
import { useAppContext, useHandleErrors } from "../hooks";
import { isUserLoggedIn, retrieveUser } from "../../logic";
import { useEffect, useState } from "react";

type User = {
    name: string
    email: string
    avatar: string
    id: string
    cart: Array<string | number>
}

export default function Header(): JSX.Element {
    const { navigate, lastUpdate, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()
    
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if(isUserLoggedIn())
            handleErrors(async () => {
                freeze && freeze()

                const user = await retrieveUser()

                setUser(user)
                
                unfreeze && unfreeze()
            })
    }, [lastUpdate])

    const handleGoToHome = () => navigate && navigate('/')

    const handleGoToProfile = () => navigate && navigate('/profile')

    const handleGoToCartPage = () => navigate && navigate('/cart')

    const handleGoToLogin = () => navigate && navigate('/login')

    return <header className='w-full h-28 bg-gray-800 fixed top-0 left-0 z-20 flex justify-center'>
        <div className="w-[1480px] h-full">
            <div className="w-full flex justify-between items-center px-10 h-full">
                <img src="/images/CupidsCornerLogo.png" alt="Cupido's Corner logo" className="cursor-pointer h-20 rounded-full" onClick={handleGoToHome}/>
                {isUserLoggedIn() && user
                    ?
                    <div className="flex gap-6 lg:gap-14 items-center">
                        
                        <div className="flex gap-2 cursor-pointer" onClick={handleGoToProfile}>
                            <img src={user.avatar} alt="user avatar" className="w-16 rounded-full"/>
                            <div className="hidden lg:flex flex-col text-white">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-end cursor-pointer select-none" onClick={handleGoToCartPage}>
                            <span className="material-symbols-outlined notranslate w-12 h-12 rounded-full bg-white flex justify-center items-center text-3xl">shopping_cart</span>
                            {user && user.cart.length
                                ?
                                <p className="rounded-full bg-red-500 flex justify-center items-center w-6 h-6 font-bold ml-[-15px]">
                                    {user.cart.length}
                                </p>
                                :
                                ''
                            }
                        </div>
                    </div>
                    :
                    <Button onClick={handleGoToLogin}>Login now!</Button>
                }
            </div>
        </div>
    </header>
}