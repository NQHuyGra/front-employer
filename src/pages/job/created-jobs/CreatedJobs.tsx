import { Link } from "react-router-dom";
import Card from "../../../shared/components/cards/Card";
import { cn } from "../../../shared/utils/cn";
import { useState } from "react";
import ConfirmationModal from "../../../shared/components/modals/ConfirmationModal";

export default function CreatedJobs() {

    const [openStopPosting, setOpenStopPosting] = useState({isOpen: false, jobTitle: ""})
    const [openPosting, setOpenPosting] = useState({isOpen: false, jobTitle: ""})
    const [openDelete, setOpenDelete] = useState({isOpen: false, jobTitle: ""})


    const handleOpenStopPosting = (jobId: string, jobTitle: string) => {
        setOpenStopPosting({isOpen: true, jobTitle: jobTitle})
    }

    const handleCloseStopPosting = () => {
        setOpenStopPosting({isOpen: false, jobTitle: ""})
    }

    const handleOpenPosting = (jobId: string, jobTitle: string) => {
        setOpenPosting({isOpen: true, jobTitle: jobTitle})
    }

    const handleClosePosting = () => {
        setOpenPosting({isOpen: false, jobTitle: ""})
    }

    const handleOpenDelete = (jobId: string, jobTitle: string) => {
        setOpenDelete({isOpen: true, jobTitle: jobTitle})
    }

    const handleCloseDelete = () => {
        setOpenDelete({isOpen: false, jobTitle: ""})
    }

    return (
        <>
            {/* <Card className="m-4">
                <div className="flex flex-col items-center justify-center h-full text-2xl font-bold text-gray-700">
                    <p className="text-gray-500">Không có tin tuyển dụng nào được tạo.</p>
                </div>
            </Card> */}
            {CREATED_JOBS.map(job => (
                <Card className="m-4" key={job.id}>
                    <div className="group flex lg:items-center justify-between flex-col lg:flex-row gap-4">
                        <div>
                            <h3 className="font-medium text-gray-800 text-xl line-clamp-1 group-hover:underline group-hover:text-primary transition-all">{job.title}</h3>
                            <p className="text-xs text-gray-600">Thời hạn nộp hồ sơ: {job.deadline}</p>
                            <p className="text-xs text-gray-600">Ngày tạo: {job.deadline}</p>
                            <p className="text-xs text-gray-600">Chỉnh sửa lần cuối: {job.deadline}</p>
                        </div>
                        <div className="flex gap-3 flex-col lg:flex-row lg:items-center justify-between w-full lg:w-auto">
                            <span className={cn(
                                "",
                                job.status === 1 ? "text-green-600" : "text-red-600",
                            )}>
                                {job.status === 1 ? "Đang tuyển" : "Ngừng tuyển"}
                            </span>
                            <div className="flex gap-2">
                                <Link to={`/applicants?job=${job.id}`} className="px-5 py-1 rounded-md bg-sky-600 text-white">{job.number_of_applicants} ứng viên</Link>
                                <Link to={`/update-job/${job.id}`} className="px-5 py-1 rounded-md bg-primary text-white">Chỉnh sửa</Link>
                                <button
                                    className="px-5 py-1 rounded-md bg-amber-600 text-white"
                                    onClick={() => handleOpenStopPosting(job.id, job.title)}
                                >
                                    Ngừng tuyển
                                </button>
                                {/* <button
                                    className="px-5 py-1 rounded-md bg-amber-600 text-white"
                                    onClick={() => handleOpenPosting(job.id, job.title)}
                                >
                                    Đăng tuyển
                                </button> */}
                                <button
                                    className="px-5 py-1 rounded-md bg-red-600 text-white"
                                    onClick={() => handleOpenDelete(job.id, job.title)}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
            <ConfirmationModal
                isOpen={openStopPosting.isOpen}
                title="Ngừng tuyển dụng"
                description={<p className="text-base">Bạn có chắc chắn muốn ngừng tuyển dụng <span className="font-medium">{openStopPosting.jobTitle}</span> không?</p>}
                onClose={handleCloseStopPosting}
                onConfirm={handleCloseStopPosting}
                confirmText="Ngừng tuyển"
                confirmButtonClassName="bg-amber-600 hover:bg-amber-700 text-white"
            />
            <ConfirmationModal
                isOpen={openPosting.isOpen}
                title="Đăng tin tuyển dụng"
                description={<p className="text-base">Bạn có chắc chắn muốn đăng tin tuyển dụng <span className="font-medium">{openPosting.jobTitle}</span> không?</p>}
                onClose={handleClosePosting}
                onConfirm={handleClosePosting}
                confirmText="Đăng tuyển"
                confirmButtonClassName="bg-amber-600 hover:bg-amber-700 text-white"
            />
            <ConfirmationModal
                isOpen={openDelete.isOpen}
                title="Xóa tin tuyển dụng"
                description={<p className="text-base">Bạn có chắc chắn muốn xóa tin tuyển dụng <span className="font-medium">{openStopPosting.jobTitle}</span> không?</p>}
                onClose={handleCloseDelete}
                onConfirm={handleCloseDelete}
                confirmText="Xóa"
                confirmButtonClassName="bg-red-600 hover:bg-red-700 text-white"
            />
        </>
    )
}

const CREATED_JOBS = [
    {
        id: "123",
        title: "Lập trình viên React",
        number_of_applicants: 10,
        deadline: "2025-05-17",
        status: 1,
        created_at: "2025-05-01",
        updated_at: "2025-05-02",
    },
    {
        id: "124",
        title: "Lập trình viên Java",
        number_of_applicants: 20,
        deadline: "2025-05-17",
        status: 0,
        created_at: "2025-05-01",
        updated_at: "2025-05-02",
    }
]