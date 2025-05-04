import { Select } from "antd";
import Card from "../../shared/components/cards/Card";
import { Link, useSearchParams } from "react-router-dom";
import RejectModal from "../../shared/components/modals/RejectModal";
import { useState } from "react";
import AcceptModal from "../../shared/components/modals/AcceptModal";

const CLOSE_VALUE = {
    open: false,
    profile_id: "",
    profile_name: ""
}

export default function ApplicantFiles() {

    
    const [searchParams, setSearchParams] = useSearchParams()
    const [openReject, setOpenReject] = useState(CLOSE_VALUE)
    const [openAccept, setOpenAccept] = useState(CLOSE_VALUE)

    const handleSelectChange = (value: string) => {
        if (value === "all") {
            searchParams.delete("job")
        } else {
            searchParams.set("job", value)
        }
        setSearchParams(searchParams)
    }

    const handleReject = (reason: string) => {
        console.log({
            reason,
            profile_id: openReject.profile_id,
            profile_name: openReject.profile_name
        })

        setOpenReject(CLOSE_VALUE)
    }

    const handleAccept = () => {
        console.log({
            profile_id: openAccept.profile_id,
            profile_name: openAccept.profile_name
        })

        setOpenAccept(CLOSE_VALUE)
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
                        options={[
                            { value: "all", label: "Tất cả" },
                            { value: "1", label: "Tin tuyển dụng 1" },
                            { value: "2", label: "Tin tuyển dụng 2" },
                            { value: "3", label: "Tin tuyển dụng 3" },
                            { value: "4", label: "Tin tuyển dụng 4" },
                            { value: "5", label: "Tin tuyển dụng 5" },
                        ]}
                    />
                </div>
            </Card>
            {/* <Card className="m-4">
                <div className="flex flex-col items-center justify-center h-full text-2xl font-bold text-gray-700">
                    <p className="text-gray-500">Chưa tìm thấy ứng viên.</p>
                </div>
            </Card> */}
            {APPLICANTS.map(applicant => (
                <Card className="m-4">
                    <div className="group flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                        <div>
                            <Link to={`/applicants/${applicant.id}`} className="font-medium text-gray-800 text-xl line-clamp-1 group-hover:underline group-hover:text-primary transition-all">{applicant.name}</Link>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.fullname}</p>
                                        </td>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.position}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.email}</p>
                                        </td>
                                        <td>
                                            <p className="text-[14px] text-gray-600">{applicant.phone_number}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        <div className="flex w-max me-0">
                            {applicant.status === 0 && 
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all"
                                        onClick={() => setOpenReject({
                                            open: true,
                                            profile_id: applicant.id,
                                            profile_name: applicant.name 
                                        })}
                                    >
                                        Từ chối
                                    </button>
                                    <button
                                        className="px-4 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all"
                                        onClick={() => setOpenAccept({
                                            open: true,
                                            profile_id: applicant.id,
                                            profile_name: applicant.name
                                        })}
                                    >
                                        Chấp nhận
                                    </button>
                                </div>
                            }
                            {applicant.status === 1 && <span className="text-green-600">Đã nhận hồ sơ</span>}
                            {applicant.status === 2 && <span className="text-red-600">Đã từ chối</span>}
                        </div>
                    </div>
                </Card>
            ))}
            <RejectModal
                open={openReject.open}
                onClose={() => setOpenReject(CLOSE_VALUE)}
                onSubmit={handleReject}
                profile_name={openReject.profile_name}
            />
            <AcceptModal
                open={openAccept.open}
                onClose={() => setOpenAccept(CLOSE_VALUE)}
                onSubmit={handleAccept}
                profile_name={openAccept.profile_name}
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