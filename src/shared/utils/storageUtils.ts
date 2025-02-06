import { User } from "../types/user"

const KEY_PREFIX = 'job-portal-employer-'
const TOKEN_KEY = KEY_PREFIX + 'access-token'
const USER_KEY = KEY_PREFIX + 'user-info'

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const deleteToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const getUser = () => {
    const storedUser = localStorage.getItem(USER_KEY)
    if(!storedUser) return null
    return JSON.parse(storedUser) as User
}

export const setUser = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const deleteUser = () => {
    localStorage.removeItem(USER_KEY)
}

export const deleteAuthInfo = () => {
    deleteToken()
    deleteUser()
}