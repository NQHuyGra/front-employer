import { useState } from "react"
import { Company } from "../../../../shared/types/company"
import MyCompanyInfo from "./MyCompanyInfo"
import EditCompany from "./EditCompany"

type HasCompanyProps = {
    company: Company
}

export default function HasCompany({ company }: HasCompanyProps) {

    const [isEdit, setIsEdit] = useState(false)

    if(isEdit) return <EditCompany company={company} onCloseForm={() => setIsEdit(false)}/>

    return <MyCompanyInfo company={company} onOpenEditForm={() => setIsEdit(true)}/>
}