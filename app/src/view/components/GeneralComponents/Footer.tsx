import { FormEvent } from 'react'

type StoreEmailEvent = FormEvent<HTMLFormElement> & {
    target: Record<string, { value: string }>;
}

export default function Footer():JSX.Element {
    const handleSubmit = (e: StoreEmailEvent) => {
        e.preventDefault()

        e.target.email.value = ''
    }

    return <footer className="w-screen h-fit min-h-[320px] bg-gray-800 flex justify-around items-start p-10 text-white relative z-10 flex-wrap">
        <div className='w-2/5 xl:w-1/5 min-w-[260px] h-4/5 flex flex-col gap-5'>
            <h2 className="font-bold text-3xl">Cupido's Corner</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input name='email' placeholder="Enter your email" className="border-b border-b-white h-12 max-w-[250px] px-2 bg-gray-800"/>
                <button className="w-36 rounded-full bg-gray-800 border border-white">Subscribe</button>
            </form>
            <p>Get monthly updates on new products and offers.</p>
        </div>
        <div className='w-2/5 xl:w-1/5 min-w-[260px] h-4/5 flex flex-col gap-1'>
            <h2 className="font-bold mb-2">CONTACT US</h2>
            <p>Phone: +1 (0) 000 0000 001</p>
            <p>Email: cupidoscorner@gmail.com</p>
            <p>Address: 1234 Street Name City, AA 99999</p>
        </div>
        <div className='w-2/5 xl:w-1/5 min-w-[260px] h-4/5 flex flex-col gap-1 mt-12 xl:mt-0'>
            <h2 className="font-bold mb-2">RECENT NEWS</h2>
            <p className="cursor-pointer hover:border-b hover:border-white w-fit">About Us</p>
            <p className="cursor-pointer hover:border-b hover:border-white w-fit">Services</p>
            <p className="cursor-pointer hover:border-b hover:border-white w-fit">Get In Touch</p>
        </div>
        <div className='w-2/5 xl:w-1/5 min-w-[260px] h-4/5 flex flex-col gap-3 mt-12 xl:mt-0'>
            <h2 className="font-bold">SOCIAL NETWORKS</h2>
            <div className="flex gap-2 items-center cursor-pointer">
                <svg className="h-9 w-9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="-143 145 512 512" xmlSpace="preserve" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"/> <path d="M234.3,313.1c-10.2,6-21.4,10.4-33.4,12.8c-9.6-10.2-23.3-16.6-38.4-16.6c-29,0-52.6,23.6-52.6,52.6c0,4.1,0.4,8.1,1.4,12 c-43.7-2.2-82.5-23.1-108.4-55c-4.5,7.8-7.1,16.8-7.1,26.5c0,18.2,9.3,34.3,23.4,43.8c-8.6-0.3-16.7-2.7-23.8-6.6v0.6 c0,25.5,18.1,46.8,42.2,51.6c-4.4,1.2-9.1,1.9-13.9,1.9c-3.4,0-6.7-0.3-9.9-0.9c6.7,20.9,26.1,36.1,49.1,36.5 c-18,14.1-40.7,22.5-65.3,22.5c-4.2,0-8.4-0.2-12.6-0.7c23.3,14.9,50.9,23.6,80.6,23.6c96.8,0,149.7-80.2,149.7-149.7 c0-2.3,0-4.6-0.1-6.8c10.3-7.5,19.2-16.7,26.2-27.3c-9.4,4.2-19.6,7-30.2,8.3C222.1,335.7,230.4,325.4,234.3,313.1z"/> </g> </g>
                </svg>
                <p>@CupidosCorner</p>
            </div>
            <div className='flex gap-2 items-center cursor-pointer'>
                <svg className='w-9 h-9' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M437.019,74.981C388.667,26.628,324.379,0,256,0S123.333,26.628,74.981,74.981C26.628,123.333,0,187.621,0,256 s26.628,132.667,74.981,181.019C123.333,485.372,187.621,512,256,512s132.667-26.628,181.019-74.981S512,324.379,512,256 S485.372,123.333,437.019,74.981z M256,495.832C123.756,495.832,16.168,388.244,16.168,256S123.756,16.168,256,16.168 S495.832,123.756,495.832,256S388.244,495.832,256,495.832z"/> </g> </g> <g> <g> <path d="M347.845,97.011H164.155c-37.024,0-67.144,30.121-67.144,67.144v183.692c0,37.022,30.121,67.143,67.144,67.143h183.692 c37.022,0,67.143-30.121,67.143-67.144V164.155C414.989,127.131,384.869,97.011,347.845,97.011z M398.821,347.845 c0,28.108-22.868,50.976-50.976,50.976H164.155c-28.108,0-50.976-22.868-50.976-50.976V164.155 c0-28.108,22.868-50.976,50.976-50.976h183.692c28.107,0,50.975,22.868,50.975,50.976V347.845z"/> </g> </g> <g> <g> <path d="M339.402,251.22c-2.391-42.533-37.002-76.75-79.558-78.669c-49.108-2.214-89.535,38.232-87.292,87.346 c1.945,42.56,36.19,77.154,78.728,79.51c17.951,0.995,34.762-3.727,48.803-12.494c4.374-2.731,5.087-8.814,1.441-12.459 c-0.039-0.039-0.077-0.077-0.115-0.115c-2.657-2.658-6.778-3.059-9.971-1.075c-10.491,6.519-22.892,10.241-36.158,10.102 c-37.455-0.394-67.676-31.844-66.621-69.286c1.061-37.681,33.215-67.721,71.657-65.312c33.126,2.076,60.09,28.49,62.819,61.569 c1.111,13.475-1.787,26.206-7.61,37.157c-1.667,3.136-1.153,6.982,1.358,9.493c0.041,0.041,0.083,0.083,0.124,0.124 c3.773,3.773,10.154,2.886,12.675-1.816C336.664,282.269,340.301,267.197,339.402,251.22z"/> </g> </g> <g> <g> <circle cx="342.232" cy="158.989" r="21.558"/> </g> </g> </g>
                </svg>
                <p>@cupidos_corner</p>
            </div>
            <div className='flex gap-2 items-center cursor-pointer'>
                <svg className="h-9 w-9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="-143 145 512 512" xmlSpace="preserve" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"/> <path d="M196.9,311.2H29.1c0,0-44.1,0-44.1,44.1v91.5c0,0,0,44.1,44.1,44.1h167.8c0,0,44.1,0,44.1-44.1v-91.5 C241,355.3,241,311.2,196.9,311.2z M78.9,450.3v-98.5l83.8,49.3L78.9,450.3z"/> </g> </g>
                </svg>
                <p>Cupido's Corner</p>
            </div>
            <div className="flex gap-2 items-center cursor-pointer">
                <svg className="w-9 h-9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="-143 145 512 512" xmlSpace="preserve" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"/> <path d="M146.8,313.7c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H51.2v38.3h26.5v133h49.6v-133h39.3l2.9-38.3h-42.2v-29.9C127.3,317.4,136.5,313.7,146.8,313.7z"/> </g> </g>
                </svg>
                <p>Cupido's Corner</p>
            </div>
        </div>
    </footer>
}