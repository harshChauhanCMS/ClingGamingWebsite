'use client'

import { Play, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'

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
                background: 'rgba(10, 5, 7, 0.85)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(4px)',
            }}
            onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.border = '1px solid rgba(225, 29, 72, 0.45)'
                el.style.boxShadow = '0 8px 30px rgba(225, 29, 72, 0.15)'
            }}
            onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.border = '1px solid rgba(255,255,255,0.06)'
                el.style.boxShadow = 'none'
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
                    background: 'linear-gradient(to top, rgba(10,5,7,0.9) 0%, transparent 55%)',
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
                    <h3 className="font-bold text-white text-sm leading-tight">{game.title}</h3>
                    {game.subtitle && (
                        <p className="text-xs text-white/35 mt-0.5">{game.subtitle}</p>
                    )}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <Users className="size-3" />
                    <span>{game.players} players</span>
                </div>

                <Link href={`/play/${game.id}`} onClick={handlePlay}>
                    <button
                        className="w-full flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-white transition-all"
                        style={{
                            border: '1px solid rgba(225, 29, 72, 0.3)',
                            background: 'rgba(225, 29, 72, 0.1)',
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = 'linear-gradient(135deg, #e11d48, #be123c)'
                            el.style.border = '1px solid #e11d48'
                            el.style.boxShadow = '0 2px 16px rgba(225,29,72,0.4)'
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = 'rgba(225, 29, 72, 0.1)'
                            el.style.border = '1px solid rgba(225, 29, 72, 0.3)'
                            el.style.boxShadow = 'none'
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