import { siderSelector, toggleSider } from "../toolkits/siderSlice";
import { useAppDispatch, useAppSelector } from "./redux";

export default function useSider() {

    const { isOpen } = useAppSelector(siderSelector)
    const dispatch = useAppDispatch()

    const toggle = () => {
        dispatch(toggleSider())
    }
    
    return {
        isOpen,
        toggle
    }

}