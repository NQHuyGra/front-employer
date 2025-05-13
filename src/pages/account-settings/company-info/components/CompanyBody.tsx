import HasCompany from "./HasCompany"
import NotHasCompany from "./NotHasCompany"
import useCompany from "../../../../shared/hooks/useCompany"

export default function CompanyBody() {

    const {company, isLoading, isError} = useCompany()

    if(isLoading) return <div>Loading...</div>

    if(isError || !company) return <NotHasCompany/>

    return <HasCompany company={company} />
}