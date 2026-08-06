'use client'

import { useParams, useRouter } from 'next/navigation'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { ArrowLeft } from 'lucide-react'

export default function PlayPage() {
    const { id } = useParams()
    const router = useRouter()
    const game = games.find(g => g.id === id)

    if (!game) return <div className="p-20" style={{ color: 'var(--text-primary)' }}>Game not found!</div>

    return (
        <div className="min-h-screen" style={{ background: 'var(--surface-bg)', color: 'var(--text-primary)' }}>
            <Navbar query="" onQueryChange={() => { }} />

            <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 mb-4 md:mb-6 transition-colors text-sm md:text-base hover:text-red-400"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <ArrowLeft className="size-4" /> Back to Store
                </button>

                {/* Game Title & Info */}
                <div className="mb-4 md:mb-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>{game.title}</h1>
                    <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{game.category} • Fullscreen Mode available</p>
                </div>

                {/* Iframe Game Player */}
                <div className="relative w-full aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--surface-card-border)' }}>
                    <iframe
                        src={game.playUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Description Section */}
                <div className="mt-6 md:mt-8 p-5 md:p-8 rounded-xl md:rounded-3xl" style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-card-border)' }}>
                    <h2 className="text-lg md:text-xl font-bold font-display mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>How to Play</h2>
                    <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Use your keyboard and mouse to interact with the game. This game is powered by WebGL/Three.js
                        for smooth 3D performance. If you experience lag, ensure your browser&apos;s hardware acceleration is turned on.
                    </p>
                </div>
            </main>
        </div>
    )
}