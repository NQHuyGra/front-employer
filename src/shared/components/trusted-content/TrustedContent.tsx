import { cn } from "../../utils/cn"

type TrustedContentProps = {
    className?: string
    content?: string
}

export default function TrustedContent({className, content}: TrustedContentProps) {

    return (
        <article className={cn(
            "prose prose-stone max-w-full",
            className
        )}
            dangerouslySetInnerHTML={{__html: content ?? ''}}
        >
        </article>
    )
}