import { ApiResponse, Meta } from "../types/apiResponse"
import { ApplicantResponse } from "../types/recruitmentDetails"
import http from "../utils/http"

export const getProfiles = async (
    params: {
                job: string,
                page: number,
                size: number,
                sortBy: string,
                direction: string
            },
) => {
    const { data } = await http.get<ApiResponse<Meta & {
        profiles: ApplicantResponse[]
    }>>('/rds/profiles', { params })

    return data
}

export const rejectApi = async (id: string, request : {
    feedback : string
}) => {
    const { data } = await http.put<ApiResponse<Boolean>>(`/rds/reject/${id}`, request)
    return data
}

export const confirmApi = async (id: string) => {
    const { data } = await http.put<ApiResponse<Boolean>>(`/rds/confirm/${id}`)
    return data
}

export const viewApi = async (profileId: string) => {
    const { data } = await http.put<ApiResponse<Boolean>>(`/rds/view/${profileId}`)
    return data
}
