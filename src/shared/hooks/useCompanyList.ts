import { useQuery } from "@tanstack/react-query"
import { fetchCompanyList } from "../apis/companyApi"

const useCompanyList = (
    search: string,
    page = 0,
    size = 6,
    sortBy = "createdAt",
    direction = "desc"
) => {

    return useQuery({
        queryKey: ['companies', { search, page, size, sortBy, direction }],
        queryFn: fetchCompanyList,
        retry: (failureCount) => {
            return failureCount < 2;
        },
    })
}

export default useCompanyList