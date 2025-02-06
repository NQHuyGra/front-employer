import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState : {
    isOpen: boolean
} = {
    isOpen: false
}

const logoutModalSlice = createSlice({
    name: "logoutModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        }
    }
})

export const { openModal, closeModal } = logoutModalSlice.actions
export const logoutModalSelector = (state: RootState) => state.logoutModal
export default logoutModalSlice.reducer