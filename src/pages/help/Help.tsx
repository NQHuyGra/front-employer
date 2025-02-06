import { FaPhone } from "react-icons/fa6";
import Card from "../../shared/components/cards/Card";
import { IoChatbubbleEllipses, IoMail } from "react-icons/io5";
import ContainerTitle from "../../shared/components/ContainerTitle";

export default function Help() {

    return (
        <ContainerTitle title="Trợ giúp">
            <Card className="text-gray-700 m-4">
                <p className="mb-4 font-medium">Hotline CSKH & Hỗ trợ dịch vụ</p>
                <p className="mb-4">Chúng tôi rất sẵn lòng được được hỗ trợ bạn</p>
                <a className="flex items-center gap-2 mb-4" href="tel:+84453542343">
                    <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
                        <FaPhone />
                    </div>
                    453542343
                </a>
                <a className="flex items-center gap-2 mb-4" href="tel:+84475839292">
                    <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
                        <FaPhone />
                    </div>
                    475839292
                </a>
                <a className="flex items-center gap-2 mb-4" href="mailto:help.jobportal@gmail.com">
                    <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
                        <IoMail />
                    </div>
                    help.jobportal@gmail.com
                </a>
                <a className="flex items-center gap-2 mb-4" href="#">
                    <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
                        <IoChatbubbleEllipses />
                    </div>
                    Trò chuyện trực tiếp
                </a>
            </Card>
        </ContainerTitle>
    )
}