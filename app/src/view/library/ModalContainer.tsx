import { ReactNode } from 'react'

interface ModalContainerProps {
    children: ReactNode
    className?: string
    onClick?: (event: any) => void
    tag?: keyof JSX.IntrinsicElements
}

function createModalContainerComponent(tag: keyof JSX.IntrinsicElements) {
    return function Container({ children, className, ...props }: ModalContainerProps): JSX.Element {
        const Tag = tag;
        return (
            <Tag
                className={`ModalContainer w-screen h-screen flex flex-col justify-center items-center ${className || ''}`}
                {...props}
            >
                {children}
            </Tag>
        );
    };
}

// eslint-disable-next-line react-refresh/only-export-components
export default createModalContainerComponent('div'); // Por defecto, usa una etiqueta 'div'
