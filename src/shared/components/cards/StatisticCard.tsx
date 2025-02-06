import { IconType } from "react-icons"
import { cn } from "../../utils/cn"

type StatisticCardProps = {
    value?: any
    title?: string
    className?: string
    icon?: IconType
}

export default function StatisticCard({
    value = 0,
    title,
    className,
    icon: Icon
}: StatisticCardProps) {

    return (
        <div className={cn(
            "flex rounded-md p-3 px-5 gap-x-10 items-center text-gray-900 bg-gray-200",
            className
        )}>
            <div className="grow">
                <p className="font-medium text-lg">{value}</p>
                <p className="font-medium">{title}</p>
            </div>
            {Icon ? <Icon className="w-6 h-6"/> : null}
        </div>
    )
}