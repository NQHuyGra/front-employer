import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"

const initialState : {
    isOpen: boolean
} = {
    isOpen: false
}

const siderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        toggleSider: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const { toggleSider } = siderSlice.actions
export const siderSelector = (state: RootState) => state.sider
export default siderSlice.reducer