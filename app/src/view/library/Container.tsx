import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode
    className?: string
    tag?: keyof JSX.IntrinsicElements
}

function createContainerComponent(tag: keyof JSX.IntrinsicElements) {
    return function Container({ children, className, ...props }: ContainerProps): JSX.Element {
        const Tag = tag;
        return (
            <Tag
                className={`Container w-screen h-fit min-h-screen flex flex-col justify-center items-center ${className || ''}`}
                {...props}
            >
                {children}
            </Tag>
        );
    };
}

// eslint-disable-next-line react-refresh/only-export-components
export default createContainerComponent('div'); // Por defecto, usa una etiqueta 'div'
