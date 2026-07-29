'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type AuthUser = {
    username: string
    email: string
}

type AuthContextType = {
    user: AuthUser | null
    login: (user: AuthUser) => void
    logout: () => void
    openLoginModal: () => void
    closeLoginModal: () => void
    loginModalOpen: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    openLoginModal: () => { },
    closeLoginModal: () => { },
    loginModalOpen: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loginModalOpen, setLoginModalOpen] = useState(false)

    useEffect(() => {
        try {
            const stored = localStorage.getItem('nova_user')
            if (stored) setUser(JSON.parse(stored))
        } catch { }
    }, [])

    function login(u: AuthUser) {
        setUser(u)
        localStorage.setItem('nova_user', JSON.stringify(u))
        setLoginModalOpen(false)
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('nova_user')
        localStorage.removeItem('nova_pwd')
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            openLoginModal: () => setLoginModalOpen(true),
            closeLoginModal: () => setLoginModalOpen(false),
            loginModalOpen,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
