'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export type AuthUser = {
    username: string
    email: string
    image?: string
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
    const { data: session } = useSession()
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loginModalOpen, setLoginModalOpen] = useState(false)

    // Sync NextAuth session → local user state
    useEffect(() => {
        if (session?.user) {
            const sessionUser: AuthUser = {
                username: session.user.name ?? session.user.email?.split('@')[0] ?? 'Player',
                email: session.user.email ?? '',
                image: session.user.image ?? undefined,
            }
            setUser(sessionUser)
            localStorage.setItem('nova_user', JSON.stringify(sessionUser))
            setLoginModalOpen(false)
        } else {
            // Fallback: check localStorage for legacy/email-based logins
            try {
                const stored = localStorage.getItem('nova_user')
                if (stored) setUser(JSON.parse(stored))
            } catch { }
        }
    }, [session])

    function login(u: AuthUser) {
        setUser(u)
        localStorage.setItem('nova_user', JSON.stringify(u))
        setLoginModalOpen(false)
    }

    function logout() {
        setUser(null)
        localStorage.removeItem('nova_user')
        localStorage.removeItem('nova_pwd')
        // Also sign out from NextAuth (clears JWT/session cookie)
        if (session) {
            signOut({ redirect: false })
        }
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
