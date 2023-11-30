import { useEffect, useRef, FormEvent } from "react"
import { useHandleErrors, useAppContext } from "../hooks"
import { Container, Form, Input, Button } from "../library"
import { loginUser } from "../../logic"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import loveLetterAnimation from "../../assets/loveLetterAnimation.json"

type LoginUserEvent = FormEvent<HTMLFormElement> & {
    target: Record<string, { value: string }>
}

export default function Login(): JSX.Element {
    const handleErrors = useHandleErrors()
    const { navigate, setLastUpdate } = useAppContext()
    const animationRef = useRef<LottieRefCurrentProps>(null)

    useEffect(() => {
        console.log('Render -> Register')

        window.scrollTo({ top: 0 })
    }, [])

    const handleGoToRegister = () => {
        if(navigate)
            navigate('/register')
    }

    const handleSubmit = (event: LoginUserEvent) => {
        event.preventDefault()

        handleErrors(async () => {
            const email = event.target.email.value
            const password = event.target.password.value

            await loginUser(email, password)

            navigate && navigate('/')

            setLastUpdate && setLastUpdate(Date.now())
        })
    }
    
    return <Container className="absolute top-0 left-0 bg-red-50 overflow-hidden h-screen pt-28">
        <section className='max-w-[1400px] h-screen lg:h-4/5 m-auto overflow-hidden flex justify-center items-center'>
            <div className="w-full h-full py-20 px-6 sm:px-10 md:px-20 flex flex-col gap-12 items-center justify-center lg:flex-row">
                <div className="w-full lg:w-5/12 h-1/3 lg:h-full flex items-center lg:flex-col ">
                    <h1 className="text-3xl text-center sm:hidden">Welcome to our Cupido's Corner!</h1>
                    <h1 className="hidden sm:block text-3xl text-center sm:font-bold lg:mb-[-50px] lg:mt-4">Welcome again to our Cupido's Corner marketplace!</h1>
                        <Lottie
                            animationData={loveLetterAnimation}
                            lottieRef={animationRef}
                            // onComplete={() => {
                            //     animationRef.current?.goToAndPlay(60, true)
                            // }}
                            loop={false}
                            onEnterFrame={() => {
                                const currentFrame = animationRef.current?.animationItem?.currentFrame
                                if(currentFrame && currentFrame > 78) {
                                    animationRef.current.pause()
                                }
                            }}
                        />
                </div>
                <div className="w-full md:w-5/6 lg:w-1/2 h-fit bg-white px-10 py-5 border border-black rounded-lg flex flex-col gap-4">
                    <h1 className="text-2xl text-center mb-4 sm:mt-6">Please, enter your credentials</h1>
                    <Form className="w-full flex flex-col gap-2 sm:gap-4" onSubmit={handleSubmit}>
                        <Input className="w-full border border-black" placeholder='Email' name="email"/>
                        <Input className="w-full border border-black" placeholder='Password' type="password" name="password"/>
                        <div className="w-full">
                            <Button>Log in</Button>
                        </div>
                    </Form>
                    <div className="w-full flex items-center justify-end sm:flex-col sm:items-end gap-2 mt-2 sm:m-0">
                        <p className="text-end">Don't have an account?</p>
                        <Button onClick={handleGoToRegister} className="w-1/2 sm:w-fit">Go to Register</Button>
                    </div>
                </div>
            </div>
        </section>
    </Container>
}