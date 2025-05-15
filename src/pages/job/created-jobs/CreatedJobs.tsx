import { useState } from "react";
import ConfirmationModal from "../../../shared/components/modals/ConfirmationModal";
import JobBox from "./JobBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteJob, getJobs, toggleEnableJob } from "../../../shared/apis/jobApi";
import StateBox from "./StateBox";
import Pagination from "../../../shared/components/pagination/Pagination";
import { Select } from "antd";
import Card from "../../../shared/components/cards/Card";
import { toast } from "react-toastify";

export default function CreatedJobs() {

    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState<string>("createdAt")
    const [openStopPosting, setOpenStopPosting] = useState({isOpen: false, jobTitle: "", jobId: ""})
    const [openPosting, setOpenPosting] = useState({isOpen: false, jobTitle: "", jobId: ""})
    const [openDelete, setOpenDelete] = useState({isOpen: false, jobTitle: "", jobId: ""})
    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery({
        queryKey: [
            "my-jobs", {
            page: page - 1,
            size: 6,
            sortBy,
            direction: "desc"
        }],
        queryFn: getJobs,
        retry: 1,
    })

    const enableMutation = useMutation({
        mutationFn: toggleEnableJob,
        onSuccess: (data) => {
            handleClosePosting()
            handleCloseStopPosting()
            toast.success(data.message ?? "Thao tác thành công!")
            queryClient.invalidateQueries({
                queryKey: ["my-jobs", {
                    page: page - 1,
                    size: 6,
                    sortBy,
                    direction: "desc"
                }]
            })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: (data) => {
            handleCloseDelete()
            toast.success(data.message ?? "Xóa tin tuyển dụng thành công!")
            queryClient.invalidateQueries({
                queryKey: ["my-jobs"]
            })
        },
    })

    const handleCloseStopPosting = () => {
        setOpenStopPosting({isOpen: false, jobTitle: "", jobId: ""})
    }

    const handleClosePosting = () => {
        setOpenPosting({isOpen: false, jobTitle: "", jobId: ""})
    }

    const handleCloseDelete = () => {
        setOpenDelete({isOpen: false, jobTitle: "", jobId: ""})
    }

    return (
        <>
            <Card className="m-4">
                <label htmlFor="sort-job">Sắp xếp theo: </label>
                <Select
                    id="sort-job"
                    className="w-40"
                    placeholder="Sắp xếp theo"
                    onChange={setSortBy}
                    value={sortBy}
                    options={[
                        {
                            value: 'createdAt',
                            label: 'Ngày tạo'
                        },
                        {
                            value: 'updatedAt',
                            label: 'Ngày cập nhật'
                        },
                    ]}
                />
            </Card>
            <StateBox 
                loading={isLoading}
                error={isError}
                noData={data?.result.jobs.length === 0}
            />
            {data?.result.jobs.map(job => (
                <JobBox
                    key={job.id}
                    job={job}
                    onDelete={(jobId, jobTitle) => setOpenDelete({isOpen: true, jobTitle, jobId})}
                    onPosting={(jobId, jobTitle) => setOpenPosting({isOpen: true, jobTitle, jobId})}
                    onStopPosting={(jobId, jobTitle) => setOpenStopPosting({isOpen: true, jobTitle, jobId})}
                />
            ))}
            <Pagination
                currentPage={page}
                onPageChange={setPage}
                totalPages={data?.result.totalPages as number}
            />
            <ConfirmationModal
                isOpen={openStopPosting.isOpen}
                title="Ngừng tuyển dụng"
                description={<p className="text-base">Bạn có chắc chắn muốn ngừng tuyển dụng <span className="font-medium">{openStopPosting.jobTitle}</span> không?</p>}
                onClose={handleCloseStopPosting}
                onConfirm={() => enableMutation.mutate(openStopPosting.jobId)}
                confirmText="Ngừng tuyển"
                loading={enableMutation.isPending}
                confirmButtonClassName="bg-amber-600 hover:bg-amber-700 text-white"
            />
            <ConfirmationModal
                isOpen={openPosting.isOpen}
                title="Đăng tin tuyển dụng"
                description={<p className="text-base">Bạn có chắc chắn muốn đăng tin tuyển dụng <span className="font-medium">{openPosting.jobTitle}</span> không?</p>}
                onClose={handleClosePosting}
                onConfirm={() => enableMutation.mutate(openPosting.jobId)}
                confirmText="Đăng tuyển"
                loading={enableMutation.isPending}
                confirmButtonClassName="bg-amber-600 hover:bg-amber-700 text-white"
            />
            <ConfirmationModal
                isOpen={openDelete.isOpen}
                title="Xóa tin tuyển dụng"
                description={<p className="text-base">Bạn có chắc chắn muốn xóa tin tuyển dụng <span className="font-medium">{openDelete.jobTitle}</span> không?</p>}
                onClose={handleCloseDelete}
                onConfirm={() => deleteMutation.mutate(openDelete.jobId)}
                loading={deleteMutation.isPending}
                confirmText="Xóa"
                confirmButtonClassName="bg-red-600 hover:bg-red-700 text-white"
            />
        </>
    )
}