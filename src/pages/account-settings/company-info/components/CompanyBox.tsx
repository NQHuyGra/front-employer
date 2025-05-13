import placeholder from "../../../../assets/images/placeholder.webp";
import { CompanyListItem } from "../../../../shared/types/company";
import { cn } from "../../../../shared/utils/cn";

type CompanyBoxProps = {
    company: CompanyListItem
    className?: string
    onClick: () => void
}

const CompanyBox = ({company, className, onClick}: CompanyBoxProps) => {

    return (
        <button className={cn(
            "flex gap-2 border rounded-md p-2",
            "hover:border-primary",
            className
        )}
            onClick={onClick}
        >
            <img
                src={company.logo_url ?? placeholder}
                alt={company.name}
                className="size-16 rounded-md border object-cover"
            />
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold line-clamp-1">{company.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{company.email}</p>
            </div>
        </button>
    )
}

export default CompanyBox