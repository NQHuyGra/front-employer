import { useQuery } from "@tanstack/react-query";
import { fetchCompany } from "../../../../shared/apis/companyApi";
import { ApiResponse } from "../../../../shared/types/apiResponse";
import { Company } from "../../../../shared/types/company";
import HasCompany from "./HasCompany"
import NotHasCompany from "./NotHasCompany"

export default function CompanyBody() {

    // const {company, isLoading, isError} = useCompany()
    const {data, isLoading, isError} = useQuery<ApiResponse<Company>>({
        queryKey: ['my-company'],
        queryFn: fetchCompany,
        retry: (failureCount, error: any) => {
            if (error?.response?.status === 404) return false;
            return failureCount < 3;
        }
    })

    if(isLoading) return <div>Loading...</div>

    if(isError || !data?.result) return <NotHasCompany/>

    return <HasCompany company={data?.result} />
}