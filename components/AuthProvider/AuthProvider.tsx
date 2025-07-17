'use client'

import { useAuth } from "../../lib/store/authStore"
import { checkSession, getMe } from "../../lib/api/clientApi"
import { useEffect } from "react"

type Props = {
    children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const setUser = useAuth((state) => state.setUser)
    const clearUser = useAuth((state) => state.clearUser)

    useEffect(() => {
        const fetchSession = async () => {
            const isAuthenticated = await checkSession()
            if(isAuthenticated) {
                const user = await getMe()
                setUser(user)
            } else {
                clearUser()
            }
        }
        fetchSession()
    }, [setUser, clearUser])
    return children
}

export default AuthProvider