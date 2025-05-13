import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCompany, fetchCompany, updateCompany } from "../apis/companyApi"
import { ApiResponse } from "../types/apiResponse"
import { Company } from "../types/company"

const useCompany = () => {

    const queryClient = useQueryClient()
    const {data, isLoading, isError, refetch} = useQuery<ApiResponse<Company>>({
        queryKey: ['my-company'],
        queryFn: fetchCompany
    })

    const createMutation = useMutation({
        mutationFn: createCompany,
        onSuccess: (data) => {
            queryClient.setQueryData<ApiResponse<Company>>(['my-company'], data)
        },
    })

    const updateMutation = useMutation({
        mutationFn: updateCompany,
        onSuccess: (data) => {
            queryClient.setQueryData<ApiResponse<Company>>(['my-company'], data)
        },
    })

    return {
        company: data?.result,
        isLoading,
        isError,
        create: createMutation.mutate,
        update: updateMutation.mutate,
        refetch,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
    }
}

export default useCompany