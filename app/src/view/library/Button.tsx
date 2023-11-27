import { ReactNode, HTMLProps } from 'react'

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    children: ReactNode
    className?: string
    type?: "button" | "submit" | "reset"
}

export default function Button({children, className, ...props}: ButtonProps): JSX.Element {
    return <>
            <button className={`py-2 px-4 rounded bg-white border border-black hover:border-black hover:bg-gray-50 active:bg-gray-100 flex justify-center items-center ${className ? className : ''}`} {...props}>
            {children}
        </button>
    </>
}