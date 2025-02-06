import { Outlet } from "react-router-dom";
import AccountSettingSider from "./sider/AccountSettingSider";
import Card from "../shared/components/cards/Card";
import { Suspense } from "react";
import ContainerTitle from "../shared/components/ContainerTitle";

export default function AccountLayout() {

    return (
        <ContainerTitle title="Cài đặt tài khoản">
            <Card className="relative flex min-h-96 p-0 m-4">
                <AccountSettingSider/>
                <div className="pl-11 lg:pl-80 w-full">
                    <Suspense>
                        <Outlet/>
                    </Suspense>
                </div>
            </Card>
        </ContainerTitle>
    )
}