import { ApiResponse } from "../types/apiResponse"
import { Profile } from "../types/profile"
import http from "../utils/http"

export const getProfile = async (id: string) => {
    const { data } = await http.get<ApiResponse<Profile>>(`/profile/${id}`)
    return data
}