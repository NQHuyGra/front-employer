import { useParams } from "react-router-dom"
import Card from "../../shared/components/cards/Card"
import TrustedContent from "../../shared/components/trusted-content/TrustedContent"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProfile } from "../../shared/apis/profileApi"
import dayjs from "dayjs"
import { viewApi } from "../../shared/apis/applicantApi"
import { useEffect } from "react"

const ApplicantDetails = () => {

    const { profileId } = useParams()
    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['profile', profileId],
        queryFn: () => getProfile(profileId!),
        enabled: !!profileId,
        retry: 0
    })

    const viewMutation = useMutation({
        mutationFn: viewApi,
        onSuccess: (data) => {
            if(data.result) queryClient.invalidateQueries({queryKey: ['applicants']})
        }
    })

    useEffect(() => {
        if(profileId)
            viewMutation.mutate(profileId)
    }, [profileId])

    return (
        <Card className="m-4">
            <h1 className="font-semibold text-gray-800 text-3xl mb-5">Hồ sơ ứng viên</h1>
            {(!!data?.result && !isLoading && !isError) ? <>
                <div className="w-full h-0.25 bg-gray-800/50 mb-3"></div>
                <h3 className="font-semibold text-gray-800 text-xl mb-3">Thông tin cơ bản</h3>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Họ tên</p>
                        <p className="text-xl text-gray-800 font-medium">{data.result.fullname}</p>
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Email</p>
                        <p className="text-gray-800">{data.result.email}</p>
                    </div>
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Số điện thoại</p>
                        <p className="text-gray-800">{data.result.phone}</p>
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Ngày sinh</p>
                        <p className="text-gray-800">{dayjs(data.result.date_of_birth).format('DD/MM/YYYY')}</p>
                    </div>
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Địa chỉ</p>
                        <p className="text-gray-800">{data.result.address}</p>
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Giới thiệu bản thân</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.introduction ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Sở thích</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.hobbies ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="w-full h-0.25 bg-gray-800/50 mb-3"></div>
                <h3 className="font-semibold text-gray-800 text-xl mb-3">Thông tin ứng tuyển</h3>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Vị trí ứng tuyển</p>
                        <p className="text-gray-800">{data.result.position}</p>
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Mục tiêu nghề nghiệp</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.career ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Trình độ học vấn</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.education ?? 'Không có.'}
                        />
                    </div>
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Thành tích</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.achievement ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Trình độ ngoại ngữ</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.language ?? 'Không có.'}
                        />
                    </div>
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Kỹ năng</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.skills ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Kinh nghiệm</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.exp ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="flex gap-x-3">
                    <div className="mb-3 w-full md:w-2/5 grow">
                        <p className="text-sm text-gray-800 font-medium">Khác</p>
                        <TrustedContent
                            className="text-gray-800"
                            content={data.result.other ?? 'Không có.'}
                        />
                    </div>
                </div>
                <div className="w-full h-0.25 bg-gray-800/50 mb-3"></div>
            </> : <></>}
        </Card>
    )
}

export default ApplicantDetails