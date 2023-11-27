import { useEffect, FormEvent } from "react"
import { useHandleErrors, useAppContext } from "../hooks"
import { Container, Form, Input, Button } from "../library"
import { registerUser } from "../../logic"

type RegisterUserEvent = FormEvent<HTMLFormElement> & {
    target: Record<string, { value: string }>;
}

export default function Register(): JSX.Element {
    const handleErrors = useHandleErrors()
    const { alert, navigate } = useAppContext()

    useEffect(() => {
        console.log('Render -> Register')

        window.scrollTo({ top: 0 })
    }, [])

    const handleGoToLogin = () => {
        if(navigate)
            navigate('/login')
    }

    const handleSubmit = (event: RegisterUserEvent) => {
        event.preventDefault()

        handleErrors(async () => {
            const name = event.target.name.value
            const email = event.target.email.value
            const password = event.target.password.value
            const passwordConfirm = event.target.passwordConfirm.value

            await registerUser(name, email, password, passwordConfirm)

            if(alert)
                alert('User registered successfully', 'info')

            if(navigate)
                navigate('/login')
        })
    }
    
    return <Container className="absolute top-0 left-0 bg-red-50 bg-[url(/images/register-bg.png)] bg-cover bg-center overflow-hidden pt-28">
        <section className="w-[700px] h-full px-14 py-6 border border-black rounded-lg flex flex-col bg-white">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl text-center">Welcome to our Cupido's Corner marketplace!</h1>
                <p className="text-center text-lg">We're thrilled to have you join our community of sellers. </p>
            </div>
            <p className="my-4">Please enter your credentials</p>
            <Form className="w-full h-full flex flex-col gap-2" onSubmit={handleSubmit}>
                <Input className="w-full border border-black" placeholder='Name' name="name"/>
                <Input className="w-full border border-black" placeholder='Email' name="email"/>
                <Input className="w-full border border-black" placeholder='Password' type="password" name="password"/>
                <Input className="w-full border border-black" placeholder='Password confirmation' type="password" name="passwordConfirm"/>
                <div className="w-full">
                    <Button>Register</Button>
                </div>
            </Form>
            <div className="w-full flex flex-col items-end">
                <p>Already have an account?</p>
                <Button onClick={handleGoToLogin}>Go to Login</Button>
            </div>
        </section>
    </Container>
}