import Container from "../../library/Container"
import { useEffect, useState } from 'react'

export default function LoaderContent(): JSX.Element {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    const handleResize = () => setScreenWidth(window.innerWidth)

    return (
        <Container className="fixed top-0 left-0 bg-black bg-opacity-20 w-full h-full z-50">
            <section className="w-64 h-64 rounded-full bg-white border-gray-400 flex flex-col justify-center items-center gap-6 md:w-96 md:h-96">
                <img
                    src="images/red-cupid.jpg"
                    alt="red-cupid-loader"
                    className="h-36 w-fit rounded-full md:h-52"
                />
                <div className="flex gap-2">
                    <p className=" text-3xl md:text-4xl mt-[-13px] font-bold">Loading</p>
                    <svg
                        width={`${(screenWidth && screenWidth > 768) ? '50' : '30'}`}
                        height="30"
                        viewBox="0 0 120 30"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000"
                    >
                        <circle cx="15" cy="15" r="15">
                            <animate
                                attributeName="r"
                                from="15"
                                to="15"
                                begin="0s"
                                dur="0.8s"
                                values="15;9;15"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="fillOpacity"
                                from="1"
                                to="1"
                                begin="0s"
                                dur="0.8s"
                                values="1;.5;1"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                            <animate
                                attributeName="r"
                                from="9"
                                to="9"
                                begin="0s"
                                dur="0.8s"
                                values="9;15;9"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="fillOpacity"
                                from="0.5"
                                to="0.5"
                                begin="0s"
                                dur="0.8s"
                                values=".5;1;.5"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle cx="105" cy="15" r="15">
                            <animate
                                attributeName="r"
                                from="15"
                                to="15"
                                begin="0s"
                                dur="0.8s"
                                values="15;9;15"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="fillOpacity"
                                from="1"
                                to="1"
                                begin="0s"
                                dur="0.8s"
                                values="1;.5;1"
                                calcMode="linear"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </svg>
                </div>
            </section>
            {/* <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-20"></div> */}
        </Container>
    );
}
