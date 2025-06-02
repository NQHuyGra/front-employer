import { Link } from "react-router-dom"
import Card from "../../../shared/components/cards/Card"
import { cn } from "../../../shared/utils/cn"
import { Job } from "../../../shared/types/job"
import dayjs from "dayjs"

type JobBoxProps = {
    job: Job
    onStopPosting?: (id: string, title: string) => void
    onPosting?: (id: string, title: string) => void
    onDelete?: (id: string, title: string) => void
}

const JobBox = ({ job, onStopPosting, onPosting, onDelete }: JobBoxProps) => {

    const formatDate = (value: Date) => dayjs(value).format('DD/MM/YYYY')

    return (
        <Card className="m-4">
            <div className="group flex lg:items-center justify-between flex-col lg:flex-row gap-4">
                <div>
                    <h3 className="font-medium text-gray-800 text-xl line-clamp-1 group-hover:underline group-hover:text-primary transition-all">{job.title}</h3>
                    <p className="text-xs text-gray-600">Thời hạn nộp hồ sơ: {formatDate(job.deadline)}</p>
                    <p className="text-xs text-gray-600">Ngày tạo: {formatDate(job.created_at as Date)}</p>
                    <p className="text-xs text-gray-600">Chỉnh sửa lần cuối: {formatDate(job.updated_at as Date)}</p>
                </div>
                <div className="flex gap-3 flex-col lg:flex-row lg:items-center justify-between w-full lg:w-auto">
                    <span className={cn(
                        "",
                        job.enable ? "text-green-600" : "text-red-600",
                    )}>
                        {job.enable ? "Đang tuyển" : "Ngừng tuyển"}
                    </span>
                    <div className="flex gap-2">
                        <Link to={`/applicants?job=${job.id}`} className="px-5 py-1 rounded-md bg-sky-600 text-white">Xem ứng viên</Link>
                        <Link to={`/update-job/${job.id}`} className="px-5 py-1 rounded-md bg-primary text-white">Chỉnh sửa</Link>
                        {job.enable ? (
                            <button
                                className="px-5 py-1 rounded-md bg-amber-600 text-white"
                                onClick={() => onStopPosting?.(job.id, job.title)}
                            >
                                Ngừng tuyển
                            </button>
                        ) : (
                            <button
                                className="px-5 py-1 rounded-md bg-amber-600 text-white"
                                onClick={() => onPosting?.(job.id, job.title)}
                            >
                                Đăng tuyển
                            </button>
                        )}
                        <button
                            className="px-5 py-1 rounded-md bg-red-600 text-white"
                            onClick={() => onDelete?.(job.id, job.title)}
                        >
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default JobBox