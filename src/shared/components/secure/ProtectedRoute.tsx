import { PropsWithChildren } from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({children}: PropsWithChildren) {

    const { isAuthenticated, user, logout } = useAuth()
    const allowRole = ['ADMIN', 'EMPLOYER']

    if(!isAuthenticated) return <Navigate to="/login"/>

    if(!allowRole.some(item => user?.roles.includes(item))) {
        toast.error('Tài khoản không phải nhà tuyển dụng!')
        logout()
        return <Navigate to="/login"/>
    }

    return children
}