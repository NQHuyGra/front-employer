import { useState } from "react";
import Pagination from "../../../../shared/components/pagination/Pagination";
import CompanyBox from "./CompanyBox";
import { Form, Input } from "antd";
import useCompanyList from "../../../../shared/hooks/useCompanyList";
import ConfirmationModal from "../../../../shared/components/modals/ConfirmationModal";
import useCompany from "../../../../shared/hooks/useCompany";
import { toast } from "react-toastify";

export default function CompanyList() {

    const [search, setSearch] = useState<string>("")
    const [currentPage, setCurrentPage] = useState(1)
    const [confirmationModal, setConfirmationModal] = useState({
        open: false,
        name: "",
        id: ""
    })
    const { createById, isCreatingById } = useCompany()
    const { data } = useCompanyList(search, currentPage - 1, 6, "created_at", "desc")

    const onSubmit = (value: any) => {
        setSearch(value.search)
        setCurrentPage(1)
    }

    const handleConfirm = () => {
        if(!isCreatingById) {
            createById(confirmationModal.id, {
                onSuccess: (res) => {
                    toast.success(res.message ?? "Tạo công ty thành công!")
                },
                onError: (err) => {
                    toast.error(err?.message  ?? "Tạo công ty thất bại!")
                },
            })
        }
    }

    return (
        <div className="p-3 mb-3 border rounded-md">
            <h2 className="text-lg font-semibold mb-3">Danh sách công ty</h2>
            <Form
                className="w-full"
                onFinish={onSubmit}
            >
                <Form.Item
                    name="search"
                >
                    <div className="flex gap-2">
                        <Input
                            placeholder="Tìm kiếm tên công ty"
                        />
                        <button
                            className="px-3 py-2 bg-primary text-white rounded-md whitespace-nowrap"
                            type="submit"
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </Form.Item>
            </Form>
            {(data?.result.companies.length == 0) ? 
                <div className="font-semibold w-full flex justify-center text-gray-600 py-16 text-xl">Không tìm thấy công ty.</div>
                : <>
                    <div className="flex flex-wrap gap-3">
                        {data?.result.companies.map(item => 
                            <CompanyBox
                                company={item}
                                className="w-1/2 md:w-1/3 grow-1"
                                onClick={() => setConfirmationModal({
                                    open: true,
                                    name: item.name,
                                    id: item.id
                                })}
                            />
                        )}
                    </div>
                    <Pagination
                        totalPages={5}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                    <ConfirmationModal
                        isOpen={confirmationModal.open}
                        onClose={() => setConfirmationModal({
                            open: false,
                            name: "",
                            id: ""
                        })}
                        onConfirm={handleConfirm}
                        title="Xác nhận"
                        description={`Tạo thông tin công ty từ ${confirmationModal.name}`}
                    />
                </>
            }
        </div>
    )
}