'use client'

import { useState, useMemo } from 'react'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { CategorySidebar } from '@/components/category-sidebar'
import { GameCard } from '@/components/game-card'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Games')

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = selectedCategory === 'All Games' || game.category === selectedCategory
      return matchesQuery && matchesCategory
    })
  }, [query, selectedCategory])

  return (
    <div className="min-h-screen" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
      <Navbar query={query} onQueryChange={setQuery} />

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <Hero />

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <CategorySidebar
            activeCategory={selectedCategory}
            setCategory={setSelectedCategory}
          />

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-2xl font-bold" style={{ letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                  {selectedCategory}
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{filteredGames.length} games available</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}