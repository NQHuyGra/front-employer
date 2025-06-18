import { Link } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.webp"
import { Avatar, Popover } from "antd";
import { FaBars, FaCaretDown, FaBell, FaFilePen, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { cn } from "../../shared/utils/cn";
import useSider from "../../shared/hooks/useSider";
import { IoHelpCircleOutline, IoLogOutOutline } from "react-icons/io5";
import useLogoutModal from "../../shared/hooks/useLogoutModal";
import useAuth from "../../shared/hooks/useAuth";

export default function Header() {

    const { isOpen, toggle } = useSider()
    const { open: openLogoutModal } = useLogoutModal()
    const { user } = useAuth()

    const button = 'flex items-center justify-center gap-2 h-9 min-w-9 px-2 rounded-full bg-white/20'

    return (
        <header className="fixed h-16 flex justify-between items-center px-4 w-full z-50 bg-secondary text-white">
            <div className="flex items-center gap-4">
                <button className="text-2xl" onClick={toggle} aria-label="Open sidebar">
                    {isOpen ? <FaXmark/> : <FaBars/> }
                </button>
                <Link to="/" className="text-3xl font-semibold">ViecMoi</Link>
            </div>
            <div className="flex items-center gap-4">
                <Link to="/create-job" className={cn(button, 'hidden md:flex px-4')}>
                    <FaFilePen />
                    <span>Đăng tin</span>
                </Link>
                <Link to="/search-cv" className={cn(button, 'hidden md:flex px-4')}>
                    <FaMagnifyingGlass />
                    <span>Tìm CV</span>
                </Link>
                <Popover content={(
                    <div className="flex flex-col">
                        <p>Không có thông báo</p>
                    </div>
                )} trigger="click">
                    <button className={button} aria-label="Open notification">
                        <FaBell />
                    </button>
                </Popover>
                <Popover content={(
                    <div className="flex flex-col">
                        <Link to="/help" className="text-black! flex items-center gap-2 p-2 transition hover:bg-gray-200 rounded-md text-base">
                            <IoHelpCircleOutline />
                            <span>Hỗ trợ</span>
                        </Link>
                        <button className="flex items-center gap-2 p-2 transition hover:bg-gray-200 rounded-md text-base" onClick={openLogoutModal}>
                            <IoLogOutOutline />
                            <span>Đăng xuất</span>
                        </button>
                    </div>
                )} trigger="click">
                    <button className={button} aria-label="Account popover">
                        <Avatar size="small" src={user?.avatar_url || placeholder} alt=""/>
                        <FaCaretDown />
                    </button>
                </Popover>
            </div>
        </header>
    )
}