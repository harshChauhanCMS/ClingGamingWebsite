'use client'

import { useEffect, useRef, useState } from 'react'
import {
    ChevronDown,
    Gamepad2,
    Moon,
    Search,
    Sun,
    X,
} from 'lucide-react'
import { categories } from '@/lib/games'
import { useTheme } from '@/lib/theme-context'

type NavbarProps = {
    query: string
    onQueryChange: (value: string) => void
    onSelectCategory?: (category: string) => void
}

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

export function Navbar({
    query,
    onQueryChange,
    onSelectCategory,
}: NavbarProps) {
    const { theme, toggleTheme } = useTheme()

    const [browseOpen, setBrowseOpen] = useState(false)
    const [searchExpanded, setSearchExpanded] = useState(false)

    const browseRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useClickOutside(browseRef, () => setBrowseOpen(false), browseOpen)
    useClickOutside(
        searchRef,
        () => { if (!query) setSearchExpanded(false) },
        searchExpanded,
    )

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setBrowseOpen(false)
                if (!query) setSearchExpanded(false)
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [query])

    function handleExpandSearch() {
        setSearchExpanded(true)
        requestAnimationFrame(() => searchInputRef.current?.focus())
    }

    function handleBrowseSelect(category: string) {
        onSelectCategory?.(category)
        setBrowseOpen(false)
    }

    const isLight = theme === 'light'

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ borderBottom: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid var(--border)', background: 'var(--navbar-bg)', boxShadow: isLight ? '0 2px 12px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s ease' }}>
            <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-2 px-4 md:gap-4 md:px-6">
                <a href="/" className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg text-white" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 0 20px rgba(225,29,72,0.5)' }}>
                        <Gamepad2 className="size-5" />
                    </span>
                    <span className="hidden font-display text-xl font-bold tracking-widest glow-text sm:inline" style={{ color: 'var(--text-primary)' }}>
                        ClingVerse
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
                </div>
            </div>
        </header>
    )
}
