'use client'

import { useParams, useRouter } from 'next/navigation'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { ArrowLeft, Maximize2 } from 'lucide-react'
import { useState } from 'react'

export default function PlayPage() {
    const { id } = useParams()
    const router = useRouter()
    const game = games.find(g => g.id === id)

    if (!game) return <div className="text-white p-20">Game not found!</div>

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar query="" onQueryChange={() => { }} />

            <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-white/50 hover:text-white mb-4 md:mb-6 transition-colors text-sm md:text-base"
                >
                    <ArrowLeft className="size-4" /> Back to Store
                </button>

                {/* Game Title & Info */}
                <div className="mb-4 md:mb-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{game.title}</h1>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">{game.category} • Fullscreen Mode available</p>
                </div>

                {/* Iframe Game Player (The Magic) */}
                <div className="relative w-full aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
                    <iframe
                        src={game.playUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Description Section */}
                <div className="mt-6 md:mt-8 p-5 md:p-8 bg-white/5 rounded-xl md:rounded-3xl border border-white/10">
                    <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">How to Play</h2>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">
                        Use your keyboard and mouse to interact with the game. This game is powered by WebGL/Three.js
                        for smooth 3D performance. If you experience lag, ensure your browser's hardware acceleration is turned on.
                    </p>
                </div>
            </main>
        </div>
    )
}