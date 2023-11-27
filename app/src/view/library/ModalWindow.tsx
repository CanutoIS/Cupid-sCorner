import { ReactNode } from 'react'

interface ModalWindowProps {
    children: ReactNode
    className?: string
    tag?: keyof JSX.IntrinsicElements
}

function createModalWindowComponent(tag: keyof JSX.IntrinsicElements) {
    return function Container({ children, className, ...props }: ModalWindowProps): JSX.Element {
        const Tag = tag;
        return (
            <Tag
                className={`ModalWindow flex flex-col justify-around items-center bg-white rounded-lg ${className || ''}`}
                {...props}
            >
                {children}
            </Tag>
        );
    };
}

// eslint-disable-next-line react-refresh/only-export-components
export default createModalWindowComponent('div'); // Por defecto, usa una etiqueta 'div'