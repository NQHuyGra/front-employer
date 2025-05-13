export type Company = {
    id: string
    name: string
    address: string
    description: string
    business_type: number
    email: string
    fields: number[]
    logo_url: string
    phone: string
    size: string
    tax_code: string
    website?: string | null
    cover_photo?: string
}

export type CompanyListItem = {
    id: string
    name: string
    email: string
    logo_url: string
}