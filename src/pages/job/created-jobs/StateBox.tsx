import Card from "../../../shared/components/cards/Card"

type StateBoxProps = {
    loading?: boolean,
    error?: boolean,
    noData?: boolean,
}

const StateBox = ({
    loading,
    error,
    noData
}: StateBoxProps) => {

    if(!noData && !error && !loading) return <></>

    return (
        <Card className="m-4">
            <div className="flex flex-col items-center justify-center h-full text-2xl font-bold text-gray-700">
                {!!noData && <p className="text-gray-500">Không có tin tuyển dụng nào được tạo.</p>}
                {!!error && <p className="text-red-500">Có lỗi xảy ra, vui lòng thử lại sau.</p>}
                {!!loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
            </div>
        </Card>
    )
}

export default StateBox