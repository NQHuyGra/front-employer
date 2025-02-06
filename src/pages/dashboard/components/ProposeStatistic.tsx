import { BsRobot } from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from "../../../shared/components/cards/Card";

export default function ProposeStatistic() {

    return (
        <Card className="min-w-80 flex-1">
            <h4 className="text-lg font-medium mb-4">Đề xuất</h4>
            <p className="text-gray-800 mb-4">Hiện dịch vụ chưa khả dụng</p>
            <Link
                to="/"
                className="text-primary flex items-center gap-2 hover:underline"
            >
                <BsRobot />
                QUẢN LÝ ĐỀ XUẤT
            </Link>
        </Card>
    )
}