'use client'

import { useEffect, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import {
    Bell,
    Check,
    ChevronDown,
    Eye,
    EyeOff,
    Gamepad2,
    Lock,
    LogOut,
    Mail,
    Moon,
    Search,
    Settings,
    Sun,
    User,
    X,
} from 'lucide-react'
import { categories } from '@/lib/games'
import { useAuth, type AuthUser } from '@/lib/auth-context'
import { useTheme } from '@/lib/theme-context'

type NavbarProps = {
    query: string
    onQueryChange: (value: string) => void
    onSelectCategory?: (category: string) => void
}

type Notification = {
    id: string
    title: string
    detail: string
    time: string
    unread: boolean
}

const initialNotifications: Notification[] = [
    {
        id: 'n1',
        title: 'Void Strike Season 4 is live',
        detail: 'New maps, ranked rewards, and a battle pass await.',
        time: '2m ago',
        unread: true,
    },
    {
        id: 'n2',
        title: 'Friend request from NeonRider',
        detail: 'You have a new co-op invite for Neon Drift.',
        time: '1h ago',
        unread: true,
    },
    {
        id: 'n3',
        title: 'Achievement unlocked',
        detail: 'You reached the top 5% in Cyber League this week.',
        time: '5h ago',
        unread: false,
    },
]

const navLinks = ['Home', 'New', 'Top Rated', 'Community']

function useClickOutside(
    ref: React.RefObject<HTMLElement | null>,
    onClose: () => void,
    active: boolean,
) {
    useEffect(() => {
        if (!active) return
        function handle(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose()
            }
        }
        document.addEventListener('mousedown', handle)
        return () => document.removeEventListener('mousedown', handle)
    }, [ref, onClose, active])
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0]?.toUpperCase() ?? '')
        .slice(0, 2)
        .join('')
}

export function Navbar({
    query,
    onQueryChange,
    onSelectCategory,
}: NavbarProps) {
    const { user, logout, loginModalOpen, openLoginModal, closeLoginModal, login } = useAuth()
    const { theme, toggleTheme } = useTheme()

    const [browseOpen, setBrowseOpen] = useState(false)
    const [notifOpen, setNotifOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [searchExpanded, setSearchExpanded] = useState(false)
    const [notifications, setNotifications] = useState(initialNotifications)

    const browseRef = useRef<HTMLDivElement>(null)
    const notifRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useClickOutside(browseRef, () => setBrowseOpen(false), browseOpen)
    useClickOutside(notifRef, () => setNotifOpen(false), notifOpen)
    useClickOutside(profileRef, () => setProfileOpen(false), profileOpen)
    useClickOutside(
        searchRef,
        () => { if (!query) setSearchExpanded(false) },
        searchExpanded,
    )

    const unreadCount = notifications.filter((n) => n.unread).length

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setBrowseOpen(false)
                setNotifOpen(false)
                closeLoginModal()
                setProfileOpen(false)
                if (!query) setSearchExpanded(false)
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [query, closeLoginModal])

    function handleExpandSearch() {
        setSearchExpanded(true)
        requestAnimationFrame(() => searchInputRef.current?.focus())
    }

    function handleBrowseSelect(category: string) {
        onSelectCategory?.(category)
        setBrowseOpen(false)
    }

    function markAllRead() {
        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    }

    function handleLogout() {
        logout()
        setProfileOpen(false)
    }

    const initials = user ? getInitials(user.username) : ''
    const isLight = theme === 'light'

    return (
        <>
            <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ borderBottom: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid var(--border)', background: 'var(--navbar-bg)', boxShadow: isLight ? '0 2px 12px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s ease' }}>
                <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-4 md:gap-4 md:px-6">
                    <a href="/" className="flex items-center gap-2">
                        <span className="flex size-9 items-center justify-center rounded-lg text-white" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 0 20px rgba(225,29,72,0.5)' }}>
                            <Gamepad2 className="size-5" />
                        </span>
                        <span className="hidden font-display text-xl font-bold tracking-widest glow-text sm:inline" style={{ color: 'var(--text-primary)' }}>
                            NOVA
                        </span>
                    </a>

                    <nav className="ml-2 hidden items-center gap-1 lg:flex">
                        <a
                            href="/"
                            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary"
                            style={{ color: 'var(--primary)' }}
                        >
                            Home
                        </a>

                        <div className="relative" ref={browseRef}>
                            <button
                                type="button"
                                onClick={() => setBrowseOpen((v) => !v)}
                                aria-haspopup="menu"
                                aria-expanded={browseOpen}
                                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-red-400`}
                                style={{ color: browseOpen ? '#f87171' : 'var(--text-muted)' }}
                            >
                                Browse
                                <ChevronDown className={`size-4 transition-transform ${browseOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {browseOpen && (
                                <div
                                    role="menu"
                                    className="absolute left-0 top-full mt-2 w-56 origin-top-left animate-in fade-in-0 zoom-in-95 rounded-xl p-2 shadow-xl backdrop-blur-xl" style={{ border: '1px solid var(--surface-modal-border)', background: 'var(--surface-dropdown)', boxShadow: '0 0 30px rgba(225,29,72,0.15)' }}
                                >
                                    <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-faintest)' }}>
                                        Categories
                                    </p>
                                    <div className="grid grid-cols-1 gap-0.5">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.name}
                                                type="button"
                                                role="menuitem"
                                                onClick={() => handleBrowseSelect(cat.name)}
                                                className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:text-red-400"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {navLinks.slice(1).map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-red-400"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {link}
                            </a>
                        ))}
                    </nav>

                    {/* Search bar */}
                    <div
                        ref={searchRef}
                        className={`relative ml-auto transition-all duration-300 ease-out ${searchExpanded ? 'w-full max-w-md' : 'w-10 md:w-44'}`}
                    >
                        <button
                            type="button"
                            onClick={handleExpandSearch}
                            aria-label="Expand search"
                            className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ color: 'var(--text-muted)' }}
                            tabIndex={searchExpanded ? -1 : 0}
                        >
                            <Search className="size-4" />
                        </button>
                        <input
                            ref={searchInputRef}
                            type="search"
                            value={query}
                            onChange={(e) => onQueryChange(e.target.value)}
                            onFocus={() => setSearchExpanded(true)}
                            placeholder="Search games..."
                            aria-label="Search games"
                            className={`h-10 w-full rounded-full border pl-10 pr-4 text-sm focus:outline-none ${searchExpanded ? 'cursor-text' : 'cursor-pointer'}`}
                            style={searchExpanded ? { borderColor: 'rgba(225,29,72,0.7)', background: 'var(--surface-input-bg)', boxShadow: '0 0 16px rgba(225,29,72,0.2)', color: 'var(--text-primary)' } : { borderColor: 'var(--surface-input-border)', background: 'var(--surface-input-bg)', color: 'var(--text-primary)' }}
                        />
                        {searchExpanded && query && (
                            <button
                                type="button"
                                onClick={() => { onQueryChange(''); searchInputRef.current?.focus() }}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                style={{ color: 'var(--text-faint)' }}
                            >
                                <X className="size-4" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Theme Toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            className="relative flex size-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-red-500/10"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <Moon className={`size-[18px] absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                            <Sun className={`size-[18px] absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                        </button>

                        {/* Notifications */}
                        <div className="relative" ref={notifRef}>
                            <button
                                type="button"
                                onClick={() => setNotifOpen((v) => !v)}
                                aria-label="Notifications"
                                className="relative flex size-10 items-center justify-center rounded-md transition-colors hover:text-red-400 hover:bg-red-500/10"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                <Bell className="size-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: '#e11d48', boxShadow: '0 0 8px rgba(225,29,72,0.6)' }}>
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {notifOpen && (
                                <div
                                    role="dialog"
                                    aria-label="Notifications"
                                    className="absolute right-0 top-full mt-2 w-80 origin-top-right animate-in fade-in-0 zoom-in-95 rounded-xl shadow-xl backdrop-blur-xl"
                                    style={{ border: '1px solid var(--surface-modal-border)', background: 'var(--surface-dropdown)', boxShadow: '0 0 30px rgba(225,29,72,0.15)' }}
                                >
                                    <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--divider)' }}>
                                        <p className="font-display text-sm font-semibold tracking-wide" style={{ color: 'var(--text-primary)' }}>Notifications</p>
                                        {unreadCount > 0 && (
                                            <button type="button" onClick={markAllRead} className="text-xs font-medium text-primary hover:underline">
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <ul className="max-h-80 overflow-y-auto py-1">
                                        {notifications.map((n) => (
                                            <li key={n.id}>
                                                <div className="flex gap-3 px-4 py-3 transition-colors hover:bg-primary/10">
                                                    <span className={`mt-1.5 size-2 shrink-0 rounded-full ${n.unread ? '' : 'bg-transparent'}`} style={n.unread ? { background: '#e11d48', boxShadow: '0 0 6px rgba(225,29,72,0.6)' } : {}} aria-hidden="true" />
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{n.title}</p>
                                                        <p className="mt-0.5 text-xs" style={{ color: 'var(--text-faint)' }}>{n.detail}</p>
                                                        <p className="mt-1 text-[11px]" style={{ color: 'var(--text-faintest)' }}>{n.time}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="p-2" style={{ borderTop: '1px solid var(--divider)' }}>
                                        <button type="button" className="w-full rounded-lg px-3 py-2 text-center text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10">
                                            View all activity
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auth: logged in → avatar, else → login button */}
                        {user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen((v) => !v)}
                                    aria-haspopup="menu"
                                    aria-expanded={profileOpen}
                                    aria-label="User menu"
                                    className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 text-sm font-medium transition-colors"
                                    style={{ border: '1px solid var(--surface-modal-border)', background: 'var(--surface-hover)', color: 'var(--text-primary)' }}
                                >
                                    <span className="flex size-7 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
                                        {initials}
                                    </span>
                                    <span className="hidden max-w-[100px] truncate sm:inline">{user.username}</span>
                                    <ChevronDown className={`size-3.5 transition-transform ${profileOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--text-faint)' }} />
                                </button>

                                {profileOpen && (
                                    <div
                                        role="menu"
                                        className="absolute right-0 top-full mt-2 w-56 origin-top-right animate-in fade-in-0 zoom-in-95 rounded-xl p-2 shadow-xl backdrop-blur-xl"
                                        style={{ border: '1px solid var(--surface-modal-border)', background: 'var(--surface-dropdown)', boxShadow: '0 0 30px rgba(225,29,72,0.15)' }}
                                    >
                                        <div className="px-3 py-2 mb-1" style={{ borderBottom: '1px solid var(--divider)' }}>
                                            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.username}</p>
                                            <p className="text-xs truncate" style={{ color: 'var(--text-faint)' }}>{user.email}</p>
                                        </div>
                                        <button type="button" role="menuitem" onClick={() => setProfileOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-red-500/10 hover:text-red-400" style={{ color: 'var(--text-secondary)' }}>
                                            <User className="size-4" /> My Profile
                                        </button>
                                        <button type="button" role="menuitem" onClick={() => setProfileOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-red-500/10 hover:text-red-400" style={{ color: 'var(--text-secondary)' }}>
                                            <Settings className="size-4" /> Settings
                                        </button>
                                        <div className="my-1" style={{ borderTop: '1px solid var(--divider)' }} />
                                        <button type="button" role="menuitem" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10">
                                            <LogOut className="size-4" /> Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button type="button" onClick={openLoginModal} className="flex size-10 items-center justify-center rounded-md transition-colors hover:text-red-400 hover:bg-red-500/10 sm:hidden" aria-label="Log in" style={{ color: 'var(--text-muted)' }}>
                                    <User className="size-5" />
                                </button>
                                <button type="button" onClick={openLoginModal} className="hidden items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-all sm:inline-flex" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 2px 16px rgba(225,29,72,0.4)' }}>
                                    <User className="size-4" /> Login
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {loginModalOpen && <LoginModal onClose={closeLoginModal} onLoginSuccess={login} />}
        </>
    )
}

// ─── Login / Signup Modal ───────────────────────────────────────────────────

type LoginModalProps = {
    onClose: () => void
    onLoginSuccess: (user: AuthUser) => void
}

function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
    const [step, setStep] = useState<'social' | 'password' | 'signup'>('social')

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [submitError, setSubmitError] = useState('')

    function handleSocialLogin(provider: 'google' | 'facebook' | 'apple') {
        if (provider === 'google') {
            signIn('google', { callbackUrl: '/' })
            return
        }
        const mockEmails: Record<string, string> = {
            facebook: 'player@facebook.com',
            apple: 'player@icloud.com',
        }
        const mockNames: Record<string, string> = {
            facebook: 'FBGamer',
            apple: 'AppleGamer',
        }
        onLoginSuccess({ username: mockNames[provider], email: mockEmails[provider] })
    }

    function handleEmailContinue(e: React.FormEvent) {
        e.preventDefault()
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Enter a valid email address.')
            return
        }
        setEmailError('')
        setStep('password')
    }

    function handlePasswordLogin(e: React.FormEvent) {
        e.preventDefault()
        setSubmitError('')
        if (!password || password.length < 6) { setSubmitError('Password must be at least 6 characters.'); return }

        try {
            const stored = localStorage.getItem('nova_user')
            const storedPwd = localStorage.getItem('nova_pwd')
            if (stored) {
                const storedUser: AuthUser = JSON.parse(stored)
                if (storedUser.email === email) {
                    if (storedPwd === password) {
                        onLoginSuccess({ username: storedUser.username, email: storedUser.email })
                        return
                    } else {
                        setSubmitError('Incorrect password. Please try again.')
                        return
                    }
                }
            }
        } catch { }

        const newUser: AuthUser = { username: email.split('@')[0], email: email.trim() }
        localStorage.setItem('nova_pwd', password)
        onLoginSuccess(newUser)
    }

    function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setSubmitError('')
        if (!username.trim() || username.length < 3) { setSubmitError('Username must be at least 3 characters.'); return }
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setSubmitError('Enter a valid email.'); return }
        if (!password || password.length < 6) { setSubmitError('Password must be at least 6 characters.'); return }
        if (confirmPassword !== password) { setSubmitError('Passwords do not match.'); return }

        const newUser: AuthUser = { username: username.trim(), email: email.trim() }
        localStorage.setItem('nova_pwd', password)
        onLoginSuccess(newUser)
    }

    const inputCls = (err?: boolean) =>
        `h-11 w-full rounded-lg border pl-10 pr-3 text-sm placeholder:text-white/35 focus:outline-none transition-all ${err ? 'border-red-500' : ''}`

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Log in or sign up"
        >
            <div className="absolute inset-0 backdrop-blur-sm animate-in fade-in-0" style={{ background: 'var(--surface-overlay)' }} onClick={onClose} aria-hidden="true" />

            <div className="relative w-full max-w-sm animate-in fade-in-0 zoom-in-95 rounded-2xl p-6 shadow-2xl"
                style={{ background: 'var(--surface-modal)', border: '1px solid var(--surface-modal-border)', boxShadow: '0 0 60px rgba(225,29,72,0.18), 0 25px 50px rgba(0,0,0,0.6)' }}>

                <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-md p-1 transition-colors" style={{ color: 'var(--text-faintest)' }}>
                    <X className="size-5" />
                </button>

                <div className="mb-6 text-center">
                    <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 0 20px rgba(225,29,72,0.5)' }}>
                        <Gamepad2 className="size-5" />
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif", color: 'var(--text-primary)' }}>
                        {step === 'signup' ? 'Join NOVA' : 'Log in or sign up'}
                    </h2>
                    {step === 'password' && (
                        <p className="mt-1 text-xs" style={{ color: 'var(--text-faintest)' }}>Continuing as <span className="text-red-400">{email}</span></p>
                    )}
                </div>

                {step === 'social' && (
                    <div className="flex flex-col gap-3">
                        <button type="button" onClick={() => handleSocialLogin('google')}
                            className="flex h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-semibold text-gray-800 transition-all hover:shadow-lg hover:shadow-white/10"
                            style={{ background: '#ffffff' }}>
                            <svg width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Sign in with Google
                        </button>

                        <button type="button" onClick={() => handleSocialLogin('facebook')}
                            className="flex h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                            style={{ background: '#1877F2' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="shrink-0">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Continue with Facebook
                        </button>

                        <button type="button" onClick={() => handleSocialLogin('apple')}
                            className="flex h-11 w-full items-center gap-3 rounded-xl px-4 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                            style={{ background: '#000000', border: '1px solid rgba(255,255,255,0.15)' }}>
                            <svg width="18" height="18" viewBox="0 0 814 1000" fill="white" className="shrink-0">
                                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-42.8-168.2-103.3c-73.2-72.3-134.3-180.9-134.3-284.9 0-195.4 131.4-298.5 260.8-298.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
                            </svg>
                            Continue with Apple
                        </button>

                        <div className="flex items-center gap-3 my-1">
                            <div className="h-px flex-1" style={{ background: 'var(--divider)' }} />
                            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-faintest)' }}>OR</span>
                            <div className="h-px flex-1" style={{ background: 'var(--divider)' }} />
                        </div>

                        <form onSubmit={handleEmailContinue} className="flex flex-col gap-2">
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />
                                <input
                                    type="email" value={email}
                                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className={inputCls(!!emailError)}
                                    style={emailError
                                        ? { borderColor: '#ef4444', background: 'rgba(239,68,68,0.05)', color: 'var(--text-primary)' }
                                        : { borderColor: 'var(--surface-input-border)', background: 'var(--surface-input-bg)', color: 'var(--text-primary)' }}
                                />
                            </div>
                            {emailError && <p className="text-xs text-red-400">{emailError}</p>}
                            <button type="submit"
                                className="h-11 w-full rounded-xl text-sm font-semibold transition-all"
                                style={{ background: email ? 'linear-gradient(135deg, #e11d48, #9f1239)' : 'var(--surface-hover)', color: email ? '#fff' : 'var(--text-faintest)', cursor: email ? 'pointer' : 'default', boxShadow: email ? '0 2px 16px rgba(225,29,72,0.35)' : 'none' }}>
                                Continue with Email
                            </button>
                        </form>

                        <p className="text-center text-xs mt-1" style={{ color: 'var(--text-faintest)' }}>
                            New here?{' '}
                            <button type="button" onClick={() => setStep('signup')} className="font-semibold text-red-400 hover:underline">
                                Create account
                            </button>
                        </p>
                    </div>
                )}

                {step === 'password' && (
                    <form onSubmit={handlePasswordLogin} className="flex flex-col gap-4">
                        {submitError && (
                            <div className="rounded-lg px-4 py-2.5 text-sm text-red-400" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                                {submitError}
                            </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'} value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" autoComplete="current-password"
                                    className={inputCls()}
                                    style={{ borderColor: 'var(--surface-input-border)', background: 'var(--surface-input-bg)', paddingRight: '2.5rem', color: 'var(--text-primary)' }}
                                />
                                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} tabIndex={-1}>
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <button type="button" onClick={() => { setStep('social'); setPassword(''); setSubmitError('') }} style={{ color: 'var(--text-faintest)' }} className="hover:opacity-80">
                                ← Back
                            </button>
                            <a href="#" className="font-medium text-red-400 hover:underline">Forgot password?</a>
                        </div>

                        <button type="submit"
                            className="h-11 w-full rounded-xl text-sm font-semibold text-white transition-all"
                            style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 2px 16px rgba(225,29,72,0.35)' }}>
                            <Check className="mr-2 inline size-4" /> Log in
                        </button>

                        <p className="text-center text-xs" style={{ color: 'var(--text-faintest)' }}>
                            No account?{' '}
                            <button type="button" onClick={() => { setStep('signup'); setPassword('') }} className="font-semibold text-red-400 hover:underline">
                                Sign up
                            </button>
                        </p>
                    </form>
                )}

                {step === 'signup' && (
                    <form onSubmit={handleSignup} className="flex flex-col gap-3">
                        {submitError && (
                            <div className="rounded-lg px-4 py-2.5 text-sm text-red-400" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                                {submitError}
                            </div>
                        )}

                        {[
                            { id: 'su-name', label: 'Username', value: username, setter: setUsername, icon: <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />, type: 'text', placeholder: 'ProGamer99', auto: 'username' },
                            { id: 'su-email', label: 'Email', value: email, setter: setEmail, icon: <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />, type: 'email', placeholder: 'you@example.com', auto: 'email' },
                        ].map(f => (
                            <div key={f.id} className="flex flex-col gap-1">
                                <label htmlFor={f.id} className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
                                <div className="relative">
                                    {f.icon}
                                    <input id={f.id} type={f.type} value={f.value}
                                        onChange={e => f.setter(e.target.value)}
                                        placeholder={f.placeholder} autoComplete={f.auto}
                                        className={inputCls()}
                                        style={{ borderColor: 'var(--surface-input-border)', background: 'var(--surface-input-bg)', color: 'var(--text-primary)' }} />
                                </div>
                            </div>
                        ))}

                        {[
                            { id: 'su-pwd', label: 'Password', value: password, setter: setPassword, show: showPassword, showSetter: setShowPassword, auto: 'new-password' },
                            { id: 'su-cpwd', label: 'Confirm Password', value: confirmPassword, setter: setConfirmPassword, show: showConfirm, showSetter: setShowConfirm, auto: 'new-password' },
                        ].map(f => (
                            <div key={f.id} className="flex flex-col gap-1">
                                <label htmlFor={f.id} className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{f.label}</label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} />
                                    <input id={f.id} type={f.show ? 'text' : 'password'} value={f.value}
                                        onChange={e => f.setter(e.target.value)}
                                        placeholder="••••••••" autoComplete={f.auto}
                                        className={inputCls()}
                                        style={{ borderColor: 'var(--surface-input-border)', background: 'var(--surface-input-bg)', paddingRight: '2.5rem', color: 'var(--text-primary)' }} />
                                    <button type="button" onClick={() => f.showSetter(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-faint)' }} tabIndex={-1}>
                                        {f.show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button type="submit"
                            className="mt-1 h-11 w-full rounded-xl text-sm font-semibold text-white transition-all"
                            style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 2px 16px rgba(225,29,72,0.35)' }}>
                            <Check className="mr-2 inline size-4" /> Create account
                        </button>

                        <p className="text-center text-xs" style={{ color: 'var(--text-faintest)' }}>
                            Already have an account?{' '}
                            <button type="button" onClick={() => { setStep('social'); setSubmitError('') }} className="font-semibold text-red-400 hover:underline">
                                Log in
                            </button>
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}
