import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCompany, createCompanyById, updateCompany } from "../apis/companyApi"
import { ApiResponse } from "../types/apiResponse"
import { Company } from "../types/company"
import { toast } from "react-toastify"

const useCompany = () => {

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createCompany,
        onSuccess: (data) => {
            queryClient.setQueryData<ApiResponse<Company>>(['my-company'], data)
            toast.success(data.message ?? "Tạo công ty thành công!")
        },
    })

    const createByIdMutation = useMutation({
        mutationFn: createCompanyById,
        onSuccess: (data) => {
            queryClient.setQueryData<ApiResponse<Company>>(['my-company'], data)
            toast.success(data.message ?? 'Cập nhật thông tin công ty thành công!')
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateCompany,
        onSuccess: (data) => {
            queryClient.setQueryData<ApiResponse<Company>>(['my-company'], data)
        },
    })

    return {
        create: createMutation.mutate,
        createById: createByIdMutation.mutate,
        update: updateMutation.mutate,
        isCreating: createMutation.isPending,
        isCreatingById: createByIdMutation.isPending,
        isUpdating: updateMutation.isPending,
    }
}

export default useCompany