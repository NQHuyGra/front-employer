import { Empty } from "antd";
import { BsFileEarmarkText, BsFileEarmarkPlus, BsBriefcase } from "react-icons/bs";
import { IoMegaphoneOutline, IoNewspaperOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import StatisticCard from "../../../shared/components/cards/StatisticCard";
import recruitment_effective_empty from "../../../assets/images/recruitment-effective-empty.webp"
import Card from "../../../shared/components/cards/Card";

export default function RecruitmentStatistic() {

    return (
        <Card className="grow rounded-lg">
            <div className="flex items-center mb-4">
                <h4 className="text-lg font-medium grow">Hiệu quả tuyển dụng</h4>
                {/* <Tooltip title="Số liệu cập nhật theo ngày">
                    <FaCircleInfo className="text-gray-400"/>
                </Tooltip> */}
            </div>
            <div className="flex gap-4 flex-wrap mb-4">
                <Link to="/recruitment-campaigns" className="min-w-64 flex-1">
                    <StatisticCard
                        className="w-full h-full transition-all text-blue-600 bg-blue-600/10 hover:bg-blue-600/25"
                        value={0}
                        title="Chiến dịch đang mở"
                        icon={IoMegaphoneOutline}
                    />
                </Link>
                <Link to="/cvs-management" className="min-w-64 flex-1">
                    <StatisticCard
                        className="w-full h-full transition-all text-green-600 bg-green-600/10 hover:bg-green-600/25"
                        value={0}
                        title="CV tiếp nhận"
                        icon={BsFileEarmarkText}
                    />
                </Link>
                <Link to="/jobs" className="min-w-64 flex-1">
                    <StatisticCard
                        className="w-full h-full transition-all text-amber-600 bg-amber-600/10 hover:bg-amber-600/25"
                        value={0}
                        title="Tin tuyển dụng hiển thị"
                        icon={IoNewspaperOutline}
                    />
                </Link>
                <Link to="/cvs-management" className="min-w-64 flex-1">
                    <StatisticCard
                        className="w-full h-full transition-all text-red-600 bg-red-600/10 hover:bg-red-600/25"
                        value={0}
                        title="CV ứng tuyển mới"
                        icon={BsFileEarmarkPlus}
                    />
                </Link>
                <div className="flex w-full items-center justify-center min-h-60">
                    <Empty
                        image={recruitment_effective_empty}
                        description="Chưa đủ dữ liệu để hiển thị"
                    />
                </div>
            </div>
            <Link
                to="/"
                className="text-primary flex items-center gap-2 hover:underline"
            >
                <BsBriefcase />
                QUẢN LÝ CHIẾN DỊCH TUYỂN DỤNG
            </Link>
        </Card>
    )
}