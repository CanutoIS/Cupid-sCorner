interface CartPageSideBar {
    stopHeight: number
    userCartProductsLenght?: number
    totalPrice: number | null
    menu: boolean
}

export default function CartPageSideBar({ stopHeight, userCartProductsLenght, totalPrice, menu }: CartPageSideBar): JSX.Element {
    return <div className={`w-64 lg:w-1/5 lg:min-w-[240px] h-[${window.innerHeight + 100}px] flex flex-col justify-center items-center gap-10 bg-red-50 px-3 2xl:px-7 pt-28 border-l border-gray-700 fixed z-10 right-0 transition-all duration-300 ${menu ? 'opened-menu' : 'closed-menu'} lg:opened-menu`} style={{
        bottom: `${stopHeight}px`,
        height: `${window.innerHeight + 200}px`
    }}>
        <div className="h-[450px] flex flex-col justify-between items-center py-6 px-2 bg-white w-full rounded-lg 2xl:px-6 mt-16">
            <u className="text-xl w-full text-center">Your orders</u>
            <div className="w-full flex flex-col items-center p-5 rounded-lg border border-black gap-2">
                <b className="text-2xl text-center">Total products</b>
                <p className="text-xl text-center">{userCartProductsLenght} diferent products</p>
            </div>
            <div className="w-full flex flex-col items-center p-5 rounded-lg border border-black gap-2 mt-[-20px]">
                <b className="text-2xl">Total price</b>
                <p className="text-xl">{totalPrice?.toFixed(2)}€</p>
            </div>

            <p className="w-full text-center p-5 rounded-xl border border-black bg-amber-200 active:bg-amber-300 cursor-pointer">Checkout</p>
        </div>
    </div>
}