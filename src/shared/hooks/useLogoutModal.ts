import { useNavigate } from "react-router-dom"
import { closeModal, logoutModalSelector, openModal } from "../toolkits/logoutModalSlice"
import { useAppDispatch, useAppSelector } from "./redux"
import useAuth from "./useAuth"

export default function useLogoutModal() {

    const { logout: handleLogout } = useAuth()
    const { isOpen } = useAppSelector(logoutModalSelector)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const open = () => {
        dispatch(openModal())
    }

    const close = () => {
        dispatch(closeModal())
    }

    const logout = () => {
        handleLogout()
        close()
        navigate("/login")
    }

    return {
        isOpen,
        open,
        close,
        logout
    }
}