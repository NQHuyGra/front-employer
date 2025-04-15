import { useEffect, useState } from "react"
import { Company, CompanyWithoutInfoRequest } from "../../../../shared/types/company"
import LogoUpload from "./LogoUpload"
import BusinessTypeOptions from "./BusinessTypeOptions"
import { Input, Select } from "antd"
import { COMPANY_FIELDS } from "../../../../shared/constants/companyField"
import TextEditor from "../../../../shared/components/quill/QuillTextEditor"

type CompanyFormProps = {
    company?: Company
    onCloseForm?: () => void
}

type CompanyRequest = CompanyWithoutInfoRequest

type ErrorsType = Record<keyof CompanyRequest, boolean>

const SIZE_OPTIONS = ['1-9', '10-24', '25-99', '100-499', '500-1000', '1000+', '3000+', '5000+', '10000+',]

const INIT_COMPANY: CompanyRequest = {
    name: '',
    address: '',
    description: '',
    business_type: 0,
    email: '',
    fields: [],
    logo_url: '',
    phone: '',
    size: SIZE_OPTIONS[0],
    tax_code: '',
    website: '',
}

export default function EditCompany({company, onCloseForm}: CompanyFormProps) {

    const [errors, setErrors] = useState<ErrorsType | null>(null)
    const [companyData, setCompanyData] = useState<CompanyRequest>(INIT_COMPANY)

    useEffect(() => {
        if(!!company) {
            setCompanyData(company)
        }
    }, [company])

    const reset = () => {
        setCompanyData(!!company ? company : INIT_COMPANY)
        setErrors(null)
        onCloseForm?.()
    }

    const checkValid = () : boolean => {
        const newErrors = {

        } as ErrorsType

        if (Object.values(newErrors).some(error => error)) {
            setErrors(newErrors)
            return false
        }
        
        setErrors(null)
        return true
    }

    const onSubmit = () => {
        if(!checkValid()) {
            return
        }
        console.log(companyData)
        // onCloseForm?.() // After promise
    }

    const handleChange = (
        key: keyof CompanyRequest,
        value: CompanyRequest[keyof CompanyRequest],
        required: boolean = false
    ) => {

        if(required) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [key]: !value || (typeof value === 'object' ? value.length === 0 : false)
            }) as ErrorsType)
        }

        setCompanyData(prevCompany => ({
            ...prevCompany,
            [key]: value
        }) as CompanyRequest)
    }

    return (
        <div className="p-3 mb-3 border rounded-md">
            <div className="flex w-full justify-center mb-3">
                <LogoUpload src={companyData?.logo_url} onChange={(e) => handleChange('logo_url', e as string)}/>
            </div>
            <div className="flex w-full mb-3">
                <BusinessTypeOptions selectedValue={companyData?.business_type} onChange={(e) => handleChange('business_type', e)}/>
            </div>
            <div className="p-3 w-full flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Mã số thuế{companyData?.business_type === 1 && ' người đại diện'} <span className="text-red-500">*</span></p>
                        <Input
                            status={errors?.tax_code ? 'error' : ''}
                            placeholder="Mã số thuế"
                            value={companyData.tax_code ?? ''}
                            onChange={(e) => handleChange('tax_code', e.target.value, true)}
                        />
                    </div>
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">{companyData?.business_type === 0 ? 'Tên công ty' : 'Tên hộ kinh doanh'} <span className="text-red-500">*</span></p>
                        <Input
                            status={errors?.name ? 'error' : ''}
                            placeholder={companyData?.business_type === 0 ? 'Tên công ty' : 'Tên hộ kinh doanh'}
                            value={companyData.name ?? ''}
                            onChange={(e) => handleChange('name', e.target.value, true)}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Website</p>
                        <Input
                            placeholder="https://..."
                            value={companyData.website ?? ''}
                            onChange={(e) => handleChange('website', e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Lĩnh vực hoạt động <span className="text-red-500">*</span></p>
                        <Select
                            showSearch
                            mode="multiple"
                            status={errors?.fields ? 'error' : ''}
                            value={companyData.fields}
                            className="w-full"
                            onChange={(e) => handleChange('fields', e, true)}
                            placeholder="Chọn lĩnh vưc hoạt động"
                            options={COMPANY_FIELDS.map(item => (
                                {
                                    value: item.id,
                                    label: item.name
                                }
                            ))}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Quy mô <span className="text-red-500">*</span></p>
                        <Select
                            showSearch
                            status={errors?.size ? 'error' : ''}
                            value={companyData.size}
                            className="w-full"
                            onChange={(e) => handleChange('size', e, true)}
                            placeholder="Chọn quy mô công ty"
                            options={SIZE_OPTIONS.map(item => (
                                {
                                    value: item,
                                    label: `${item} nhân viên`
                                }
                            ))}
                        />
                    </div>
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Địa chỉ <span className="text-red-500">*</span></p>
                        <Input
                            status={errors?.address ? 'error' : ''}
                            placeholder="Địa chỉ"
                            value={companyData.address ?? ''}
                            onChange={(e) => handleChange('address', e.target.value, true)}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Email <span className="text-red-500">*</span></p>
                        <Input
                            status={errors?.email ? 'error' : ''}
                            placeholder="Email"
                            value={companyData.email ?? ''}
                            onChange={(e) => handleChange('email', e.target.value, true)}
                        />
                    </div>
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Số điện thoại <span className="text-red-500">*</span></p>
                        <Input
                            status={errors?.phone ? 'error' : ''}
                            placeholder="Số điện thoại"
                            value={companyData.phone ?? ''}
                            onChange={(e) => handleChange('phone', e.target.value, true)}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-2/5 grow">
                        <p className="text-gray-500 text-md font-medium mb-2">Mô tả công ty</p>
                        <TextEditor
                            value={companyData.description}
                            onChange={(value) => handleChange('description', value)}
                            placeholder="Mô tả công ty"
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end gap-3">
                <button type="button" className="px-5 py-2 rounded-md bg-gray-100 text-black text-md" onClick={reset}>Hủy</button>
                <button type="submit" className="px-5 py-2 rounded-md bg-primary text-white text-md" onClick={onSubmit}>Lưu</button>
            </div>
        </div>
    )
}