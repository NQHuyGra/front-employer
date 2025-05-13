import { ApiResponse } from './../types/apiResponse';
import { Company } from "../types/company"
import http from "../utils/http"

export const fetchCompanyById = async (id: string) => {
    const { data } = await http.get<ApiResponse<Company>>(`/${id}`)
    return data
}

export const fetchCompany = async () => {
    const { data } = await http.get<ApiResponse<Company>>("/my-company")
    return data
}

export const fetchCompanyList = async (currentPage: number, pageSize: number) => {
    const { data } = await http.get('/list', {
        params: {
            page: currentPage,
            size: pageSize
        }
    })
    return data
}

export const createCompany = async (data: Company) => {
    const { data: res } = await http.post<ApiResponse<Company>>('/create', data)
    return res
}

export const updateCompany = async (data: Company) => {
    const { data: res } = await http.put<ApiResponse<Company>>('/update', data)
    return res
}