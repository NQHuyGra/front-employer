import { Status } from "../types/status"
import { cn } from "../utils/cn"

const UPDATE_STATUS = {
    SUCCESS: {
        label: 'Đã duyệt',
        cn: 'bg-green-100 text-green-500',
    },
    PENDING: {
        label: 'Chờ duyệt',
        cn: 'bg-amber-100 text-amber-500',
    },
    REJECT: {
        label: 'Từ chối',
        cn: 'bg-red-100 text-red-500'
    }
}

type LabelStatusProps = {
    className?: string
    status?: Status
}

export default function LabelStatus({className, status = 'SUCCESS'}: LabelStatusProps) {

    return (
        <span className={cn(
            "px-2 font-medium rounded-full",
            className,
            UPDATE_STATUS[status].cn
        )}>
            {UPDATE_STATUS[status].label}
        </span>
    )
}