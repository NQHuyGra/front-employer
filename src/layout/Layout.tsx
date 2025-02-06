import Sider from "./sider/Sider";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import useSider from "../shared/hooks/useSider";
import { cn } from "../shared/utils/cn";
import { Outlet } from "react-router-dom";
import LogoutModal from "../shared/components/modals/LogoutModal";
import useSiderRoutes from "../shared/hooks/useSiderRoutes";
import { Suspense, useEffect } from "react";

export default function Layout() {

    const { isOpen } = useSider()
    const { activeRoute } = useSiderRoutes()

    useEffect(() => {
        document.title = activeRoute?.label ?? 'Tuyển dụng'
    }, [activeRoute])

    return (
        <div className="w-full min-h-lvh bg-slate-300">
            <Header/>
            <Sider/>
            <main className={cn(
                "relative pt-16 transition-all",
                isOpen ? 'md:pl-80' : 'md:pl-16'
            )}>
                <Suspense>
                    <Outlet/>
                </Suspense>
                <Footer/>
            </main>
            <LogoutModal/>
        </div>
    )
}