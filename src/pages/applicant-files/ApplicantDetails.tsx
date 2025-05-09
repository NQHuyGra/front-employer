import { useParams } from "react-router-dom"
import Card from "../../shared/components/cards/Card"
import TrustedContent from "../../shared/components/trusted-content/TrustedContent"

const ApplicantDetails = () => {

    const { profileId } = useParams()

    return (
        <Card className="m-4">
            <h1 className="font-semibold text-gray-800 text-3xl mb-5">Hồ sơ ứng viên</h1>
            <div className="w-full h-0.25 bg-gray-800/50 mb-3"></div>
            <h3 className="font-semibold text-gray-800 text-xl mb-3">Thông tin cơ bản</h3>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Họ tên</p>
                    <p className="text-xl text-gray-800 font-medium">Nguyen Quang Huy</p>
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Email</p>
                    <p className="text-gray-800">nguyenquanghuylt2002@gmail.com</p>
                </div>
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Số điện thoại</p>
                    <p className="text-gray-800">0337212814</p>
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Ngày sinh</p>
                    <p className="text-gray-800">20/12/2002</p>
                </div>
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Địa chỉ</p>
                    <p className="text-gray-800">Vinh Hoa - Tử Du - Lập Thạch - Vĩnh Phúc</p>
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Giới thiệu bản thân</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Introduction"
                    />
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Sở thích</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Sở thích"
                    />
                </div>
            </div>
            <div className="w-full h-0.25 bg-gray-800/50 mb-3"></div>
            <h3 className="font-semibold text-gray-800 text-xl mb-3">Thông tin ứng tuyển</h3>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Vị trí ứng tuyển</p>
                    <p className="text-gray-800">Lập trình viên Fontend</p>
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Mục tiêu nghề nghiệp</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Mục tiêu nghề nghiệp"
                    />
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Trình độ học vấn</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="DHCHN | 2021 - 2025 | GPA: 3.3"
                    />
                </div>
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Thành tích</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Tham gia nghiên cứu khoa học"
                    />
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Trình độ ngoại ngữ</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Trình độ ngoại ngữ"
                    />
                </div>
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Kỹ năng</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Kỹ năng"
                    />
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Kinh nghiệm</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Kinh nghiệm"
                    />
                </div>
            </div>
            <div className="flex gap-x-3">
                <div className="mb-3 w-full md:w-2/5 grow">
                    <p className="text-sm text-gray-800 font-medium">Khác</p>
                    <TrustedContent
                        className="text-gray-800"
                        content="Dự án cá nhân"
                    />
                </div>
            </div>
            <div className="w-full h-0.25 bg-gray-800/50 mb-3"></div>
        </Card>
    )
}

export default ApplicantDetails