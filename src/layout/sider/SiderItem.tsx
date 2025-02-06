import { Divider } from "antd"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"
import { cn } from "../../shared/utils/cn"

type SiderItemProps = {
    divider?: boolean
    icon?: IconType
    onClick?: (e: any) => void
    label?: string
    href?: string
    active?: boolean
}

export default function SiderItem({divider, icon: Icon, onClick, label, href, active}: SiderItemProps) {

    if(divider) return <Divider className="my-0 w-80 -ml-3"/>

    if(!href) return (
        <button
            className="flex items-center p-2 gap-6 hover:text-primary rounded-lg transition-all hover:bg-gray-100"
            onClick={onClick}
        >
            {Icon ? <Icon className="text-lg mx-1"/> : null}
            <span>{label}</span>
        </button>
    )

    return (
        <Link to={href} className={cn(
            'flex items-center p-2 gap-6 hover:text-primary rounded-lg transition-all hover:bg-gray-100',
            active && 'text-primary'
        )}>
            {Icon ? <Icon className="text-lg mx-1"/> : null}
            <span>{label}</span>
        </Link>
    )
}