import { useMemo } from "react";
import { IconType } from "react-icons";
import { BsBriefcase, BsFeather, BsFilePerson } from "react-icons/bs";
import { IoFileTrayFullOutline, IoGridOutline, IoHelpCircleOutline, IoLogOutOutline, IoPencilOutline, IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import useLogoutModal from "./useLogoutModal";

export type Route = {
    divider?: boolean
    label?: string
    icon?: IconType
    href?: string
    active?: boolean
    onClick?: (e: any) => void
}

export default function useSiderRoutes() {

    const { pathname } = useLocation()
    const { open } = useLogoutModal()

    const routes = useMemo<Route[]>(() => [
        {
            divider: true
        },
        {
            label: 'Bảng tin',
            href: '/',
            icon: IoGridOutline,
            active: pathname === '/'
        },
        // {
        //     label: 'Insights',
        //     href: '/insights',
        //     icon: FaRegLightbulb,
        //     active: pathname === '/insights'
        // },
        // {
        //     label: 'Rewards',
        //     href: '/rewards',
        //     icon: IoDiamondOutline,
        //     active: pathname === '/rewards'
        // },
        {
            label: 'Dịch vụ của tôi',
            href: '/services',
            icon: BsFeather,
            active: pathname === '/services'
        },
        {
            divider: true
        },
        {
            label: 'Chiến dịch tuyển dụng',
            href: '/recruitment-campaigns',
            icon: BsBriefcase,
            active: pathname === '/recruitment-campaigns'
        },
        {
            label: 'Tin tuyển dụng',
            href: '/jobs',
            icon: IoFileTrayFullOutline,
            active: pathname === '/jobs'
        },
        {
            label: 'Tạo tin mới',
            href: '/create-job',
            icon: IoPencilOutline,
            active: pathname === '/create-job'
        },
        {
            label: 'Quản lý hồ sơ ứng tuyển',
            href: '/applicants',
            icon: BsFilePerson,
            active: pathname === '/applicant'
        },
        {
            divider: true
        },
        {
            label: 'Cài đặt tài khoản',
            href: '/account/settings',
            icon: IoSettingsOutline,
            active: pathname.includes('/account/settings')
        },
        {
            divider: true
        },
        {
            label: 'Trợ giúp',
            href: '/help',
            icon: IoHelpCircleOutline,
            active: pathname === '/help'
        },
        {
            label: 'Đăng xuất',
            onClick: open,
            icon: IoLogOutOutline,
        },
    ], [pathname])

    const activeRoute = routes.find(item => item.active)

    return {
        routes,
        activeRoute
    }
}