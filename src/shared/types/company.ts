import { Status } from "./status"

export type Company = {
    name: string
    address: string
    company_info_request: CompanyInfoRequest
    description: string
    business_type: number
    email: string
    fields: number[]
    fields_str?: string[]
    logo_url: string
    phone: string
    size: string
    tax_code: string
    website?: string | null
}

export type CompanyWithoutInfoRequest = Omit<Company, 'company_info_request'>

export type CompanyInfoRequest = {
    status: Status
    time: string
    data: CompanyWithoutInfoRequest
}