import { useMemo, useState } from "react"
import { cn } from "../../shared/utils/cn"
import { FaBars, FaRegBuilding, FaXmark } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import { IoLockClosedOutline, IoReaderOutline, IoSettingsOutline } from "react-icons/io5"

export default function AccountSettingSider() {

    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    const routes = useMemo(() => [
        {
            label: 'Thông tin cá nhân',
            icon: IoSettingsOutline,
            href: '/account/settings',
            active: pathname === '/account/settings'
        },
        {
            label: 'Đổi mật khẩu',
            icon: IoLockClosedOutline,
            href: '/account/settings/password',
            active: pathname === '/account/settings/password'
        },
        {
            label: 'Giấy phép đăng ký doanh nghiệp',
            icon: IoReaderOutline,
            href: '/account/settings/company-license',
            active: pathname === '/account/settings/company-license'
        },
        {
            label: 'Thông tin công ty',
            icon: FaRegBuilding,
            href: '/account/settings/company',
            active: pathname === '/account/settings/company'
        },
    ], [pathname])

    return (
        <div className={cn(
            "absolute h-full z-20 rounded-l-lg bg-white shadow-md transition-all overflow-x-hidden",
            open ? 'w-80' : 'w-11 lg:w-80'
        )}>
            <div className="w-80 flex flex-col">
                <button className="px-3 py-3 lg:hidden" onClick={() => setOpen(prev => !prev)}>
                    {open ? <FaXmark size={20}/> : <FaBars size={20}/> }
                </button>
                {routes.map(({ href, label, icon: Icon, active }) => (
                    <Link
                        key={href}
                        to={href}
                        className={cn(
                            "flex items-center gap-6 px-3 py-3",
                            active && "bg-gray-100 text-primary"
                        )}
                    >
                        {Icon ? <Icon size={20}/> : null}
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    )
}