import { configureStore } from "@reduxjs/toolkit";
import siderSlice from "./siderSlice";
import authSlice from "./authSlice";
import logoutModalSlice from "./logoutModalSlice";

export const store = configureStore({
    reducer: {
        sider: siderSlice,
        auth: authSlice,
        logoutModal: logoutModalSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch