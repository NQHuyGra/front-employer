import { UpdatePasswordRequest } from "../../pages/account-settings/change-password/ChangePassword";
import { ApiResponse } from "../types/apiResponse";
import { User, UserUpdateRequest } from "../types/user";
import http from "../utils/http";

export const updateApi = async (value: UserUpdateRequest) => {
    const res = await http.put<ApiResponse<User>>(`/identity/users/update/employer`, value)
    return res.data
}

export const changePasswordApi = async (value: UpdatePasswordRequest) => {
    const res = await http.put<ApiResponse<boolean>>(`/identity/users/change-password`, value)
    return res.data
}