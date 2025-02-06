import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../types/user"
import { RootState } from "./store"
import { deleteAuthInfo, getToken, getUser, setToken, setUser } from "../utils/storageUtils"

const token = getToken()
const user = getUser()

type AuthStateType = {
    isAuthenticated: boolean
    user: User | null
}

const initialState: AuthStateType = {
    isAuthenticated: !!token && !!user,
    user: user
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{
            token: string,
            user: User
        }>) => {
            const { token, user } = action.payload
            state.isAuthenticated = true
            state.user = user
            setToken(token)
            setUser(user)
        },
        updateInfo: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            setUser(action.payload)
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            deleteAuthInfo()
        }
    }
})

export const { login, updateInfo, logout } = authSlice.actions
export const authSelector = (state: RootState) => state.auth
export default authSlice.reducer