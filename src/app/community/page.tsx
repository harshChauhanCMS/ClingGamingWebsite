'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Gamepad2, LayoutGrid, MessageCircleHeart, Star, Users2 } from 'lucide-react'
import { categories, games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { GameCard } from '@/components/game-card'

export default function CommunityPage() {
    const [query, setQuery] = useState('')

    const avgRating = useMemo(() => {
        const total = games.reduce((sum, g) => sum + parseFloat(g.rating), 0)
        return (total / games.length).toFixed(1)
    }, [])

    const topGames = useMemo(() => {
        return games
            .filter((g) => g.title.toLowerCase().includes(query.toLowerCase()))
            .slice()
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, 3)
    }, [query])

    const stats = [
        { icon: Gamepad2, value: String(games.length), label: 'Games' },
        { icon: LayoutGrid, value: String(categories.length), label: 'Categories' },
        { icon: Star, value: avgRating, label: 'Avg. Rating' },
    ]

    return (
        <div className="min-h-screen" style={{ color: 'var(--text-primary)' }}>
            <Navbar query={query} onQueryChange={setQuery} />

            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <Users2 className="size-5 text-red-500" />
                    <h1 className="text-2xl font-bold" style={{ letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                        Community
                    </h1>
                </div>
                <p className="text-sm mb-6 max-w-xl" style={{ color: 'var(--text-faint)' }}>
                    Where ClingVerse players discover what's worth playing next.
                </p>

                {/* Stats strip */}
                <div
                    className="flex flex-wrap items-center gap-6 sm:gap-10 mb-10 p-5 rounded-2xl"
                    style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-card-border)' }}
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex items-center gap-3">
                            <span
                                className="flex items-center justify-center rounded-full size-10 shrink-0"
                                style={{ background: 'rgba(225, 29, 72, 0.12)', border: '1px solid rgba(225, 29, 72, 0.3)' }}
                            >
                                <stat.icon className="size-4" style={{ color: '#e11d48' }} />
                            </span>
                            <div className="flex flex-col leading-none">
                                <span className="text-lg font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                                    {stat.value}
                                </span>
                                <span className="text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--text-faint)' }}>
                                    {stat.label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Top rated by the community */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        Top Rated by the Community
                    </h2>
                    <p className="text-xs mb-4" style={{ color: 'var(--text-faint)' }}>
                        The highest-rated games on the platform right now
                    </p>
                    {topGames.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {topGames.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm" style={{ color: 'var(--text-faint)' }}>No games match your search.</p>
                    )}
                </section>

                {/* Explore by category */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Explore by Category
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/?category=${encodeURIComponent(cat.name)}`}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
                                style={{
                                    background: 'var(--surface-card)',
                                    border: '1px solid var(--surface-card-border)',
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                <span className="text-base leading-none">{cat.icon}</span>
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Coming soon */}
                <section
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl"
                    style={{ background: 'var(--surface-hover)', border: '1px dashed var(--surface-card-border)' }}
                >
                    <MessageCircleHeart className="size-6 shrink-0" style={{ color: '#e11d48' }} />
                    <div>
                        <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                            More community features are on the way
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                            Reviews, friend leaderboards, and chat are in the works. For now, browse what's trending above and jump into a game.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}
