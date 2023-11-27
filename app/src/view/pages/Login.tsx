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
    const { navigate } = useAppContext()
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

            if(navigate)
                navigate('/')
        })
    }
    
    return <Container className="absolute top-0 left-0 bg-red-50 overflow-hidden min-h-screen pt-28">
        <section className='w-[1400px] h-4/5 m-auto overflow-hidden flex justify-center items-center'>
            <div className="w-full px-20 flex gap-8 items-center justify-center">
                <div className="w-5/12 h-full">
                    <h1 className="text-3xl text-center mb-[-100px]">Welcome again to our Cupido's Corner marketplace!</h1>
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
                <div className="w-1/2 h-[500px] bg-white px-10 py-5 border border-black rounded-lg flex flex-col justify-around">
                    <h1 className="text-3xl text-center">Please, enter your credentials</h1>
                    <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                        <p className="mt-4">Please enter your credentials</p>
                        <Input className="w-full border border-black" placeholder='Email' name="email"/>
                        <Input className="w-full border border-black" placeholder='Password' type="password" name="password"/>
                        <div className="w-full">
                            <Button>Log in</Button>
                        </div>
                    </Form>
                    <div className="w-full flex flex-col items-end">
                        <p>Don't have an account?</p>
                        <Button onClick={handleGoToRegister}>Go to Register</Button>
                    </div>
                </div>
            </div>
        </section>
    </Container>
}