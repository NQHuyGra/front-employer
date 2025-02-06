import { Link } from "react-router-dom";
import Card from "../../../shared/components/cards/Card";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function ServiceStatistic() {

    return (
        <Card className="min-w-80 flex-1">
            <h4 className="text-lg font-medium mb-4">Dịch vụ sắp hết hạn</h4>
            <p className="text-gray-800 mb-4">Hiện không có dịch vụ nào sắp hết hạn</p>
            <Link
                to="/services"
                className="text-primary flex items-center gap-2 hover:underline"
            >
                <FaWandMagicSparkles />
                QUẢN LÝ DỊCH VỤ
            </Link>
        </Card>
    )
}