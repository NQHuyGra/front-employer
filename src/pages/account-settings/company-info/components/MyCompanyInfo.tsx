import { Avatar } from "antd";
import LabelStatus from "../../../../shared/components/LabelStatus";
import { Company } from "../../../../shared/types/company";
import { FaPenToSquare } from "react-icons/fa6";
import TrustedContent from "../../../../shared/components/trusted-content/TrustedContent";

type MyCompanyInfoProps = {
    company: Company
    onOpenEditForm: () => void
}

export default function MyCompanyInfo({company, onOpenEditForm}: MyCompanyInfoProps) {

    return (
        <>
            <div className="p-3 mb-3 border rounded-md flex items-center">
                <div className="grow">
                    <div className="flex items-center gap-2">
                        <p className="font-medium">Yêu cầu cập nhật thông tin công ty</p>
                        <LabelStatus status={company.company_info_request.status}/>
                    </div>
                    <p className="text-sm text-gray-600">Ngày yêu cầu gần nhất: 10:00 01/10/2024</p>
                </div>
                <button
                    className="text-gray-600 font-medium flex items-center gap-2"
                    onClick={onOpenEditForm}
                >
                    <FaPenToSquare/>
                    Chỉnh sửa
                </button>
            </div>
            <div className="border rounded-md">
                <div className="flex items-center gap-2 p-3 border-b w-full">
                    <div className="border rounded-full">
                        <Avatar src={company.logo_url} size="large"/>
                    </div>
                    <div className="grow">
                        <p className="font-medium">{company.name}</p>
                        <p className="text-gray-500">{company.address} | {company.size} nhân viên</p>
                    </div>
                </div>
                <div className="p-3 w-full flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-2/5 grow">
                            <p className="text-gray-500 font-medium min-w-40">Mã số thuế:</p>
                            <p className="text-gray-700 grow">{company.tax_code}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-2/5 grow">
                            <p className="text-gray-500 font-medium min-w-40">Website:</p>
                            <p className="text-gray-700 grow">{company.website ?? '--'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-2/5 grow">
                            <p className="text-gray-500 font-medium min-w-40">Lĩnh vực hoạt động:</p>
                            <p className="text-gray-700 grow">{company.fields_str?.join(', ')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-2/5 grow">
                            <p className="text-gray-500 font-medium min-w-40">Quy mô:</p>
                            <p className="text-gray-700 grow">{company.size} nhân viên</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-2/5 grow">
                            <p className="text-gray-500 font-medium min-w-40">Địa chỉ:</p>
                            <p className="text-gray-700 grow">{company.address}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-2/5 grow">
                            <p className="text-gray-500 font-medium min-w-40">Mô tả công ty:</p>
                            <TrustedContent className="text-gray-700 grow" content={company.description}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}