'use client'

import { useMemo, useState } from 'react'
import { Trophy } from 'lucide-react'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { CategorySidebar } from '@/components/category-sidebar'
import { GameCard } from '@/components/game-card'

export default function TopRatedPage() {
    const [query, setQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All Games')

    const rankedGames = useMemo(() => {
        return games
            .filter((game) => {
                const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase())
                const matchesCategory = selectedCategory === 'All Games' || game.category === selectedCategory
                return matchesQuery && matchesCategory
            })
            .slice()
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    }, [query, selectedCategory])

    return (
        <div className="min-h-screen" style={{ color: 'var(--text-primary)' }}>
            <Navbar query={query} onQueryChange={setQuery} onSelectCategory={setSelectedCategory} />

            <main className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <CategorySidebar activeCategory={selectedCategory} setCategory={setSelectedCategory} />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Trophy className="size-5 text-yellow-500" />
                            <h1 className="text-2xl font-bold" style={{ letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                                Top Rated
                            </h1>
                        </div>
                        <p className="text-xs mb-5" style={{ color: 'var(--text-faint)' }}>
                            {rankedGames.length} games, ranked by rating
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {rankedGames.map((game, i) => (
                                <div key={game.id} className="relative">
                                    {i < 3 && (
                                        <span
                                            className="absolute -top-2 -left-2 z-10 flex items-center justify-center size-7 rounded-full text-xs font-bold text-white"
                                            style={{
                                                background: i === 0 ? 'linear-gradient(135deg, #fbbf24, #d97706)' : i === 1 ? 'linear-gradient(135deg, #cbd5e1, #64748b)' : 'linear-gradient(135deg, #d97706, #92400e)',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                                            }}
                                        >
                                            #{i + 1}
                                        </span>
                                    )}
                                    <GameCard game={game} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
