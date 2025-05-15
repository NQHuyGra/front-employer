import { ApiResponse, Meta } from './../types/apiResponse';
import { Company, CompanyListItem } from "../types/company"
import http from "../utils/http"

export const fetchCompanyById = async (id: string) => {
    const { data } = await http.get<ApiResponse<Company>>(`/company/id/${id}`)
    return data
}

export const fetchCompany = async () => {
    try {
        const { data } = await http.get<ApiResponse<Company>>("/company/my-company")
        return data
    } catch (error) {
        throw error
    }
}

export const fetchCompanyList = async (
    { queryKey } : {
        queryKey: 
        [
            string,
            {
                search: string,
                page: number,
                size: number,
                sortBy: string,
                direction: string
            }
        ]
    }
) => {
    const [, params] = queryKey
    try {
        const { data } = await http.get<ApiResponse<Meta & {
            companies: CompanyListItem[]
        }>>('/company/list', { params })
        return data
    } catch (error) {
        throw error
    }
}

export const createCompany = async (data: Company) => {
    const { data: res } = await http.post<ApiResponse<Company>>('/company/create', data)
    return res
}

export const createCompanyById = async (id: string) => {
    const { data: res } = await http.post<ApiResponse<Company>>('/company/create-by-id', {id})
    return res
}

export const updateCompany = async (data: Company) => {
    const { data: res } = await http.put<ApiResponse<Company>>('/company/update', data)
    return res
}