import { AllHTMLAttributes } from "react";
import { cn } from "../../utils/cn";


export default function Card({children, className, ...props}: AllHTMLAttributes<HTMLDivElement>) {

    return (
        <div 
            {...props}
            className={cn(
                'bg-white rounded-lg shadow-md p-4',
                className
            )}
        >
            {children}
        </div>
    )
}