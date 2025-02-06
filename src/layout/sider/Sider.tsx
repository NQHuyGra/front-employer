import useSider from "../../shared/hooks/useSider"
import { cn } from "../../shared/utils/cn"
import placeholder from "../../assets/images/placeholder.webp"
import SiderItem from "./SiderItem"
import { Link } from "react-router-dom"
import useSiderRoutes from "../../shared/hooks/useSiderRoutes"

export default function Sider() {

    const { isOpen, toggle } = useSider()
    const { routes } = useSiderRoutes()

    return (
        <>
            <aside className={cn(
                "fixed top-0 z-40 pt-16 h-full bg-white shadow-md transition-all overflow-hidden hover:w-80",
                isOpen ? 'w-80' : 'w-0 md:w-16'
            )}>
                <div className="relative flex flex-col h-full p-3 gap-3 w-80 overflow-y-auto overflow-x-hidden">
                    <Link to="/account/settings" className="flex items-center gap-4">
                        <img
                            className="border rounded-full object-cover w-10 h-10"
                            src={placeholder}
                            alt=""
                        />
                        <div>
                            <h5 className="font-medium">Nguyễn Quang Huy</h5>
                            <p className="text-sm">Employer</p>
                        </div>
                    </Link>
                    {routes.map((item, index) => (
                        <SiderItem
                            key={index}
                            divider={item.divider}
                            label={item.label}
                            onClick={item.onClick}
                            icon={item.icon}
                            href={item.href}
                            active={item.active}
                        />
                    ))}
                </div>
            </aside>
            <button
                className={cn(
                    "absolute top-0 left-0 z-10 w-lvw bg-black/20 h-full",
                    isOpen ? 'block md:hidden' : 'hidden'
                )}
                onClick={toggle}
            ></button>
        </>
    )
}