'use client'

import { useParams, useRouter } from 'next/navigation'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { ArrowLeft, Maximize2, Star, Users } from 'lucide-react'
import { useState } from 'react'

export default function GamePlayPage() {
    const { id } = useParams()
    const router = useRouter()
    const [query, setQuery] = useState('')

    // Database (lib/games) se sahi game dhoondo
    const game = games.find((g) => g.id === id)

    if (!game) return <div className="text-white p-20 text-center">Game not found!</div>

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--text-primary)' }}>
            <Navbar query={query} onQueryChange={setQuery} />

            <main className="max-w-[1200px] mx-auto px-6 py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 mb-6 transition-colors"
                    style={{ color: 'var(--text-faint)' }}
                >
                    <ArrowLeft className="size-4" /> Back to Catalog
                </button>

                <div className="flex flex-col gap-6">
                    {/* Game Title & Stats */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{game.title}</h1>
                            <div className="flex gap-4 text-sm" style={{ color: 'var(--text-faint)' }}>
                                <span className="flex items-center gap-1"><Star className="size-4 text-yellow-500 fill-current" /> {game.rating}</span>
                                <span className="flex items-center gap-1"><Users className="size-4" /> {game.players} players</span>
                                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">{game.category}</span>
                            </div>
                        </div>
                        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <Maximize2 className="size-4" /> Fullscreen
                        </button>
                    </div>

                    {/* THE GAME PLAYER (Iframe) */}
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl"
                        style={{ border: '1px solid var(--surface-modal-border)', background: '#000' }}>
                        <iframe
                            src={game.playUrl}
                            className="w-full h-full"
                            allowFullScreen
                            frameBorder="0"
                        ></iframe>
                    </div>

                    {/* Description Section */}
                    <div className="rounded-2xl p-6" style={{ background: 'var(--surface-hover)', border: '1px solid var(--surface-modal-border)' }}>
                        <h2 className="text-xl font-bold mb-3">About {game.title}</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Experience high-quality 3D gameplay directly in your browser. No downloads required.
                            Powered by WebGL and Three.js for optimal performance on all devices.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}