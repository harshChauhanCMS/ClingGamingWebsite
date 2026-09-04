'use client'

import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { GameCard } from '@/components/game-card'

export default function NewGamesPage() {
    const [query, setQuery] = useState('')

    const newGames = useMemo(() => {
        return games.filter(
            (game) => game.isNew && game.title.toLowerCase().includes(query.toLowerCase())
        )
    }, [query])

    return (
        <div className="min-h-screen" style={{ color: 'var(--text-primary)' }}>
            <Navbar query={query} onQueryChange={setQuery} />

            <main className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="size-5 text-red-500" />
                    <h1 className="text-2xl font-bold" style={{ letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                        New Releases
                    </h1>
                </div>
                <p className="text-xs mb-5" style={{ color: 'var(--text-faint)' }}>
                    {newGames.length} freshly added game{newGames.length === 1 ? '' : 's'}
                </p>

                {newGames.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {newGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm" style={{ color: 'var(--text-faint)' }}>
                        No new games match your search.
                    </p>
                )}
            </main>
        </div>
    )
}
