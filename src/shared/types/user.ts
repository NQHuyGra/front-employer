export type User = {
    id: string
    email: string
    full_name: string
    description: string
    address: string
    company_name: string
    date_of_birth: Date
    created_at: Date
    updated_at: Date
    phone_number: string
    gender: 'MALE' | 'FEMALE' | 'OTHER'
    roles: string[]
    avatar_url: string
}

export type UserUpdateRequest = {
    full_name: string
    address: string
    phone_number: string
    company_name: string
    gender: 'MALE' | 'FEMALE' | 'OTHER'
    avatar_url: string
}