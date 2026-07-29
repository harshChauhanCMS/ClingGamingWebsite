'use client'

import { Play, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useTheme } from '@/lib/theme-context'

const categoryColors: Record<string, string> = {
    Racing: 'bg-orange-500',
    Shooting: 'bg-red-600',
    Adventure: 'bg-emerald-600',
    Strategy: 'bg-blue-600',
    Sports: 'bg-lime-600',
    Horror: 'bg-rose-900',
    Puzzle: 'bg-cyan-600',
}

export function GameCard({ game }: { game: any }) {
    const { user, openLoginModal } = useAuth()
    const { theme } = useTheme()
    const isLight = theme === 'light'

    function handlePlay(e: React.MouseEvent) {
        if (!user) {
            e.preventDefault()
            openLoginModal()
        }
    }

    const catColor = categoryColors[game.category] ?? 'bg-red-700'

    return (
        <div
            className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--surface-card-border)',
                boxShadow: isLight ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.border = '1px solid var(--surface-card-hover-border)'
                el.style.boxShadow = isLight
                    ? '0 8px 30px rgba(225, 29, 72, 0.12), 0 4px 16px rgba(0,0,0,0.08)'
                    : '0 8px 30px rgba(225, 29, 72, 0.15)'
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.border = '1px solid var(--surface-card-border)'
                el.style.boxShadow = isLight ? '0 2px 12px rgba(0,0,0,0.08)' : 'none'
            }}
        >
            {/* Poster image */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{
                    background: isLight
                        ? 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.3) 30%, transparent 55%)'
                        : 'linear-gradient(to top, rgba(10,5,7,0.9) 0%, transparent 55%)',
                }} />

                {/* Category badge */}
                <span className={`absolute top-2.5 left-2.5 ${catColor} rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg`}>
                    {game.category}
                </span>

                {/* Rating badge */}
                <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-bold text-yellow-400 backdrop-blur-sm">
                    <Star className="size-2.5 fill-yellow-400" />
                    {game.rating}
                </span>
            </div>

            {/* Card info */}
            <div className="flex flex-col gap-2 p-3">
                <div>
                    <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{game.title}</h3>
                    {game.subtitle && (
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{game.subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    <Users className="size-3" />
                    <span>{game.players} players</span>
                </div>

                <Link href={`/play/${game.id}`} onClick={handlePlay}>
                    <button
                        className="w-full flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-white transition-all"
                        style={{
                            border: '1px solid rgba(225, 29, 72, 0.3)',
                            background: isLight
                                ? 'linear-gradient(135deg, #e11d48, #be123c)'
                                : 'rgba(225, 29, 72, 0.1)',
                            boxShadow: isLight ? '0 2px 8px rgba(225,29,72,0.25)' : 'none',
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = 'linear-gradient(135deg, #e11d48, #be123c)'
                            el.style.border = '1px solid #e11d48'
                            el.style.boxShadow = '0 2px 16px rgba(225,29,72,0.4)'
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            if (isLight) {
                                el.style.background = 'linear-gradient(135deg, #e11d48, #be123c)'
                                el.style.boxShadow = '0 2px 8px rgba(225,29,72,0.25)'
                            } else {
                                el.style.background = 'rgba(225, 29, 72, 0.1)'
                                el.style.boxShadow = 'none'
                            }
                            el.style.border = '1px solid rgba(225, 29, 72, 0.3)'
                        }}
                    >
                        <Play className="w-3 h-3 fill-current" />
                        {user ? 'Play Now' : 'Login to Play'}
                    </button>
                </Link>
            </div>
        </div>
    )
}