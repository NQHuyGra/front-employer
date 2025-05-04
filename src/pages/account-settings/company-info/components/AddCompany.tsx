import { useState } from "react"
import LogoUpload from "./LogoUpload"
import BusinessTypeOptions from "./BusinessTypeOptions"
import { Form, Input, Select } from "antd"
import { COMPANY_FIELDS } from "../../../../shared/constants/companyField"
import TextEditor from "../../../../shared/components/quill/QuillTextEditor"
import placeholderImg from "../../../../assets/images/placeholder.webp"
import CoverPhotoUpload from "./CoverPhotoUpload"


const SIZE_OPTIONS = ['1-9', '10-24', '25-99', '100-499', '500-1000', '1000+', '3000+', '5000+', '10000+',]

export default function AddCompany() {

    const [logo, setLogo] = useState('')
    const [coverPhoto, setCoverPhoto] = useState('')
    const [businessType, setBusinessType] = useState(0)

    const onSubmit = (value: any) => {
        console.log({
            ...value,
            logo_url: logo,
            cover_photo: coverPhoto,
            business_type: businessType
        })
    }

    return (
        <div className="p-4 mb-3 border rounded-md">
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
                            name="name"
                        >
                            <Input
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
                                    placeholder="https://..."
                                />
                        </Form.Item>
                        <Form.Item
                            className="w-full md:w-2/5 grow"
                            label="Lĩnh vực hoạt động"
                            name="fields"
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
                                placeholder="Mô tả công ty"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="flex w-full justify-end gap-3">
                    <button type="submit" className="px-5 py-2 rounded-md bg-primary text-white text-md">Tạo mới</button>
                </div>
            </Form>
        </div>
    )
}