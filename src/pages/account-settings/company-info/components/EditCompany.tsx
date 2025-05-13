import { useState } from "react"
import { Company } from "../../../../shared/types/company"
import LogoUpload from "./LogoUpload"
import BusinessTypeOptions from "./BusinessTypeOptions"
import { Form, Input, Select } from "antd"
import { COMPANY_FIELDS } from "../../../../shared/constants/companyField"
import TextEditor from "../../../../shared/components/quill/QuillTextEditor"
import CoverPhotoUpload from "./CoverPhotoUpload"
import placeholderImg from "../../../../assets/images/placeholder.webp"
import { cn } from "../../../../shared/utils/cn"
import useCompany from "../../../../shared/hooks/useCompany"
import { toast } from "react-toastify"

type CompanyFormProps = {
    company?: Company
    onCloseForm?: () => void
}

const SIZE_OPTIONS = ['1-9', '10-24', '25-99', '100-499', '500-1000', '1000+', '3000+', '5000+', '10000+',]

export default function EditCompany({company, onCloseForm}: CompanyFormProps) {

    const [logo, setLogo] = useState(company?.logo_url)
    const [coverPhoto, setCoverPhoto] = useState(company?.cover_photo)
    const [businessType, setBusinessType] = useState(company?.business_type)
    const { update, isUpdating } = useCompany()

    const onSubmit = (value: any) => {
        const data: Company = {
            ...value,
            logo_url: logo,
            cover_photo: coverPhoto,
            business_type: businessType,
        }

        update(data, {
            onSuccess: (res) => {
                onCloseForm?.()
                toast.success(res?.message ?? 'Cập nhật thông tin công ty thành công!')
            },
            onError: (error) => {
                toast.error(error?.message || 'Có lỗi xảy ra, vui lòng thử lại sau!')
            }
        })
    }

    return (
        <div className="p-3 mb-3 border rounded-md">
            <p className="mb-3 text-sm">Ảnh đại diện</p>
            <div className="flex w-full mb-5">
                <LogoUpload src={logo ? logo : placeholderImg} onChange={(e) => setLogo(e as string)}/>
            </div>
            <p className="mb-3 text-sm">Ảnh bìa</p>
            <div className="flex w-full justify-center mb-5">
                <CoverPhotoUpload src={coverPhoto} onChange={(e) => setCoverPhoto(e as string)}/>
            </div>
            <div className="flex w-full mb-3">
                <BusinessTypeOptions selectedValue={businessType} onChange={setBusinessType}/>
            </div>
            <Form
                layout="vertical"
                onFinish={onSubmit}
                className="w-full"
            >
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label={`Mã số thuế ${businessType === 1 ? ' người đại diện' : ''}`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã số thuế!'
                                }
                            ]}
                            name="tax_code"
                        >
                            <Input
                                value={company?.tax_code}
                                placeholder="Nhập mã số thuế"
                            />
                        </Form.Item>
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label={businessType === 0 ? 'Tên công ty' : 'Tên hộ kinh doanh'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên công ty!'
                                }
                            ]}
                            name="company_name"
                        >
                            <Input
                                value={company?.name}
                                placeholder="Nhập tên công ty"
                            />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                                className="w-full md:w-2/5 grow"
                                label="Website"
                                name="website"
                            >
                                <Input
                                    value={company?.website ?? ''}
                                    placeholder="https://..."
                                />
                        </Form.Item>
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Lĩnh vực hoạt động"
                            name="company_fields"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn lĩnh vực hoạt động!"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                mode="multiple"
                                className="w-full"
                                placeholder="Chọn lĩnh vực hoạt động"
                                options={COMPANY_FIELDS.map(item => (
                                    {
                                        value: item.id,
                                        label: item.name
                                    }
                                ))}
                                value={company?.fields}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Quy mô công ty"
                            name="size"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn quy mô công ty!"
                                }
                            ]}
                        >
                            <Select
                                showSearch
                                className="w-full"
                                placeholder="Chọn quy mô công ty"
                                options={SIZE_OPTIONS.map(item => (
                                    {
                                        value: item,
                                        label: `${item} nhân viên`
                                    }
                                ))}
                                value={company?.size}
                            />
                        </Form.Item>
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!'
                                }
                            ]}
                        >
                            <Input
                                value={company?.address}
                                placeholder="Địa chỉ"
                            />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!'
                                }
                            ]}
                        >
                            <Input
                                value={company?.email}
                                placeholder="Nhập email"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại!'
                                }
                            ]}
                        >
                            <Input
                                value={company?.phone}
                                placeholder="Nhập số điện thoại"
                                type="tel"
                            />
                        </Form.Item>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3">
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Mô tả công ty"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả công ty!'
                                }
                            ]}
                        >
                            <TextEditor
                                value={company?.description}
                                placeholder="Mô tả công ty"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex w-full justify-end gap-3">
                    <button
                        type="button"
                        className="px-5 py-2 rounded-md bg-gray-300 text-gray-900 text-md"
                        onClick={onCloseForm}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className={cn(
                            "px-5 py-2 rounded-md bg-primary text-white text-md",
                            isUpdating && "opacity-50 cursor-progress"
                        )}
                    >
                        {isUpdating ? "Đang xử lý" : "Lưu thay đổi"}
                    </button>
                </div>
            </Form>
        </div>
    )
}