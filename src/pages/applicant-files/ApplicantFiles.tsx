import { Select } from "antd";
import Card from "../../shared/components/cards/Card";
import { Link, useSearchParams } from "react-router-dom";
import RejectModal from "../../shared/components/modals/RejectModal";
import { useState } from "react";
import AcceptModal from "../../shared/components/modals/AcceptModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { allJobsApi } from "../../shared/apis/jobApi";
import Pagination from "../../shared/components/pagination/Pagination";
import { confirmApi, getProfiles, rejectApi } from "../../shared/apis/applicantApi";
import { toast } from "react-toastify";

const CLOSE_VALUE = {
    open: false,
    profile_id: "",
    profile_name: ""
}

export default function ApplicantFiles() {

    
    const [searchParams, setSearchParams] = useSearchParams()
    const [openReject, setOpenReject] = useState(CLOSE_VALUE)
    const [openAccept, setOpenAccept] = useState(CLOSE_VALUE)
    const [page, setPage] = useState(1)
    const queryClient = useQueryClient()
    const { data: jobData, isLoading: jobLoading } = useQuery({
        queryKey: ['all-jobs'],
        queryFn: allJobsApi,
        retry: 0,
    })

    const { data: applicantsData, isLoading, isError } = useQuery({
        queryKey: ['applicants', searchParams, page],
        queryFn: () => getProfiles({
            job: searchParams.get('job') || '',
            page: page - 1,
            size: 6,
            direction: 'desc',
            sortBy: 'applicationDate'
        }),
        retry: 0
    })

    const handleSelectChange = (value: string) => {
        if (value === "all") {
            searchParams.delete("job")
        } else {
            searchParams.set("job", value)
        }
        setPage(1)
        setSearchParams(searchParams)
    }

    const rejectMutation = useMutation({
        mutationFn: ({id, feedback} : {id: string, feedback: string}) => rejectApi(id, {feedback}),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['applicants', searchParams, page] })
            setOpenReject(CLOSE_VALUE)
            toast.success(data.message ?? 'Cập nhật thành công!')
        },
    })

    const acceptMutation = useMutation({
        mutationFn: (id: string) => confirmApi(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['applicants', searchParams, page] })
            setOpenAccept(CLOSE_VALUE)
            toast.success(data.message ?? 'Cập nhật thành công!')
        }
    })

    const handleReject = (reason: string) => {
        rejectMutation.mutate({
            id: openReject.profile_id,
            feedback: reason
        })
    }

    const handleAccept = () => {
        acceptMutation.mutate(openAccept.profile_id)
    }

    return (
        <>
            <Card className="m-4">
                <div className="flex gap-3 items-center">
                    <p className="text-[14px] text-gray-800 whitespace-nowrap">Tin tuyển dụng:</p>
                    <Select
                        className="w-full"
                        showSearch
                        placeholder="Chọn tin ứng tuyển"
                        value={searchParams.get("job") || "all"}
                        onChange={handleSelectChange}
                        loading={jobLoading}
                        options={[
                            { value: "all", label: "Tất cả" },
                            ...jobData?.result.map(item => ({
                                value: item.id,
                                label: item.title
                            }))!
                        ]}
                    />
                </div>
            </Card>
            {isLoading && <div className="flex flex-col items-center justify-center h-full text-2xl font-bold text-gray-700">
                    <p className="text-gray-500">Đang tải...</p>
                </div>}
            {isError && <div className="flex flex-col items-center justify-center h-full text-2xl font-bold text-gray-700">
                <p className="text-red-500">Có lỗi xảy ra, vui lòng thử lại sau!</p>
            </div>}
            {applicantsData?.result.totalItems === 0 ? <Card className="m-4">
                <div className="flex flex-col items-center justify-center h-full text-2xl font-bold text-gray-700">
                    <p className="text-gray-500">Chưa tìm thấy ứng viên.</p>
                </div>
            </Card> : <></>}
            {applicantsData?.result.profiles.map(applicant => (
                <Card className="m-4">
                    <div className="group flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                        <div>
                            <Link to={`/applicants/${applicant.profileResponse.id}`} className="font-medium text-gray-800 text-xl line-clamp-1 group-hover:underline group-hover:text-primary transition-all">{applicant.profileResponse.name}</Link>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.profileResponse.fullname}</p>
                                        </td>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.profileResponse.position}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.profileResponse.email}</p>
                                        </td>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.profileResponse.phone}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        <div className="flex w-max me-0">
                            {applicant.recruitmentDetailsResponse.status === 0 && 
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all"
                                        onClick={() => setOpenReject({
                                            open: true,
                                            profile_id: applicant.recruitmentDetailsResponse.id,
                                            profile_name: applicant.profileResponse.name 
                                        })}
                                    >
                                        Từ chối
                                    </button>
                                    <button
                                        className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all"
                                        onClick={() => setOpenAccept({
                                            open: true,
                                            profile_id: applicant.recruitmentDetailsResponse.id,
                                            profile_name: applicant.profileResponse.name
                                        })}
                                    >
                                        Chấp nhận
                                    </button>
                                </div>
                            }
                            {applicant.recruitmentDetailsResponse.status === 1 && <span className="text-green-600">Đã nhận hồ sơ</span>}
                            {applicant.recruitmentDetailsResponse.status === 2 && <span className="text-red-600">Đã từ chối</span>}
                        </div>
                    </div>
                </Card>
            ))}
            <Pagination
                currentPage={page}
                totalPages={applicantsData?.result.totalPages!}
                onPageChange={setPage}
            />
            <RejectModal
                open={openReject.open}
                onClose={() => setOpenReject(CLOSE_VALUE)}
                onSubmit={handleReject}
                profile_name={openReject.profile_name}
                loading={rejectMutation.isPending}
            />
            <AcceptModal
                open={openAccept.open}
                onClose={() => setOpenAccept(CLOSE_VALUE)}
                onSubmit={handleAccept}
                profile_name={openAccept.profile_name}
                loading={acceptMutation.isPending}
            />
        </>

    )
}

const APPLICANTS = [
    {
        id: "1",
        name: "JAVA_INTERN",
        position: "Thực tập sinh Java",
        fullname: "Nguyễn Văn A",
        email: "nguyenvana123@gmail.com",
        phone_number: "0123456789",
        status: 0,
    },
    {
        id: "2",
        name: "JAVA",
        position: "Thực tập sinh Java",
        fullname: "Nguyễn Văn B",
        email: "nguyenvanb3@gmail.com",
        phone_number: "0123456789",
        status: 1,
    },
    {
        id: "2",
        name: "JAVA",
        position: "Thực tập sinh Java",
        fullname: "Nguyễn Văn B",
        email: "nguyenvanb3@gmail.com",
        phone_number: "0123456789",
        status: 2,
    },
]