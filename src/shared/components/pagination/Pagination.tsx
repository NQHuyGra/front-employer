import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "../../utils/cn";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {

    return (
        <div className="flex gap-4 justify-center items-center my-3">
            <button
                className={cn(
                    "p-2 rounded-full ring-1 transition-all",
                    currentPage === 1 ? "opacity-30 cursor-not-allowed" : "ring-primary text-primary hover:bg-primary hover:text-white"
                )}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaChevronLeft />
            </button>
            <p className="text-md font-medium text-gray-500"><span className="text-primary">{currentPage}</span> / {totalPages}</p>
            <button
                className={cn(
                    "p-2 rounded-full ring-1 transition-all",
                    currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "ring-primary text-primary hover:bg-primary hover:text-white"
                )}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight />
            </button>
        </div>
    )
}

export default Pagination;