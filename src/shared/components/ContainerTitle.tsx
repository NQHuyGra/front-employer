import { PropsWithChildren, ReactNode } from "react"

type ContainerTitleProps = PropsWithChildren<{
    title?: string
    renderTitle?: ReactNode
}>

export default function ContainerTitle({children, title, renderTitle}: ContainerTitleProps) {

    const titleComponent = (
        <>
            <div className="fixed z-30 h-14 w-full flex items-center px-3 text-lg bg-white shadow-md">
                <span>{title}</span>
            </div>
            <div className="h-14"></div>
        </>
    )

    return (
        <>
            {!!title ? titleComponent : null}
            {!!renderTitle ? renderTitle : null}
            {children}
        </>
    )

}