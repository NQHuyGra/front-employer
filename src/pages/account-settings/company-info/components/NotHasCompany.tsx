import { useState } from "react"
import CompanyList from "./CompanyList"
import AddCompany from "./AddCompany"
import { cn } from "../../../../shared/utils/cn"
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6"

export default function NotHasCompany() {

    const [isSelectCompany, setIsSelectCompany] = useState(true)

    return (
        <>
            <div className="flex mb-3">
                <button
                    className={cn(
                        "flex justify-center items-center p-4 w-2/5 grow border-b-2 gap-3",
                        isSelectCompany ? "text-primary border-b-primary" : ""
                    )}
                    onClick={() => setIsSelectCompany(true)}
                >
                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-100 text-xl">
                        <FaMagnifyingGlass />
                    </div>
                    <span className="font-medium">Tìm kiếm thống tin công ty</span>
                </button>
                <button
                    className={cn(
                        "flex justify-center items-center p-4 w-2/5 grow border-b-2 gap-3",
                        !isSelectCompany ? "text-primary border-b-primary" : ""
                    )}
                    onClick={() => setIsSelectCompany(false)}
                >
                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-100 text-xl">
                        <FaPlus />
                    </div>
                    <span className="font-medium">Tạo mới công ty</span>
                </button>
            </div>
            {isSelectCompany ? <CompanyList /> : <AddCompany />}
        </>
    )
}