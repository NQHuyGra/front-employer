export type AuthenticatedRequest = {
    email: string
    password: string
}

export type RegisterRequest = AuthenticatedRequest & {
    confirm_password: string
    full_name: string
    gender: 'MALE' | 'FEMALE'
    phone_number: string
    company_name: string
    work_city: string
    work_district: string
}