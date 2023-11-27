import { ReactNode, HTMLProps, forwardRef } from 'react'

interface FormProps extends HTMLProps<HTMLFormElement> {
    children: ReactNode
    className?: string
}

// export default function Form({children, className, ...props}: FormProps): JSX.Element {
//     return <>
//         <form className={`flex gap-2 p- rounded-lg ${className ? className : ''}`} {...props}>
//             {children}
//         </form>
//     </>
// }

const Form = forwardRef<HTMLFormElement, FormProps>(
    ({ children, className, ...props }, ref) => (
      <form ref={ref} className={`flex rounded-lg ${className ? className : ''}`} {...props}>
        {children}
      </form>
    )
  )

export default Form;