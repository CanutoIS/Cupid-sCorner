import { HTMLProps, forwardRef } from 'react'

interface InputProps extends HTMLProps<HTMLInputElement> {
    className?: string
    type?: "button" | "text" | "password" | "email" | "file" | "number"
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
      <input ref={ref} className={`flex gap-2 rounded-lg p-2 ${className || ''}`} {...props}/>
    )
  )

export default Input;