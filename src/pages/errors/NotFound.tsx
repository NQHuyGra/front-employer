import { Link } from "react-router-dom";
import not_found from "../../assets/images/not-found.svg";

export default function NotFound() {

    return (
        <div className="flex flex-col h-svh w-full justify-center items-center p-4 gap-4">
            <img
                src={not_found}
                alt=""
                className="w-2/5 min-w-80"
            />
            <h3 className="font-medium text-center">TRANG BẠN ĐANG TÌM KIẾM CÓ VẺ KHÔNG TỒN TẠI</h3>
            <Link to="/" className="bg-primary text-white rounded-md px-5 py-2">Quay lại bảng tin</Link>
        </div>
    )
}