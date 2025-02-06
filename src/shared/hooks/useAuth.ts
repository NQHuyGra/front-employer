import { authSelector, login, logout, updateInfo } from "../toolkits/authSlice";
import { User } from "../types/user";
import { useAppDispatch, useAppSelector } from "./redux";

export default function useAuth() {
    
    const { isAuthenticated, user } = useAppSelector(authSelector)
    const dispatch = useAppDispatch()

    const handleLogin = (token: string, user: User) => dispatch(login({token, user}))

    const update = (user: User) => dispatch(updateInfo(user))

    const handleLogout = () => dispatch(logout())

    return {
        isAuthenticated,
        user,
        login: handleLogin,
        update,
        logout: handleLogout,
    }
}