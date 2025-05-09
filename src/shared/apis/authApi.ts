import { ApiResponse } from "../types/apiResponse"
import { AuthenticatedRequest, RegisterRequest } from "../types/auth"
import { User } from "../types/user"
import http from "../utils/http"

export const registerApi = async (data: RegisterRequest) => {
    const response = await http.post<ApiResponse<User>>('/identity/auth/sign-up/employer', data)
    return response.data
}

export const loginApi = async (data: AuthenticatedRequest) => {
    const response = await http.post<ApiResponse<{
        accessToken: string
        user: User
    }>>('/identity/auth/login', data)
    return response.data
}

export const verifyTokenApi = async () => {
    const response = await http.post('/identity/auth/verify-token')
    return response.data
}