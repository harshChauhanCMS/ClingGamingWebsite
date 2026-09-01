'use client'

import { useParams, useRouter } from 'next/navigation'
import { games } from '@/lib/games'
import { Navbar } from '@/components/navbar'
import { ArrowLeft, Maximize2, Info } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function PlayPage() {
    const { id } = useParams()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    // Game dhoondo ID ke base par
    const game = games.find(g => g.id === id)

    // Browser ka title change karne ke liye
    useEffect(() => {
        if (game) {
            document.title = `Playing ${game.title} | ClingVerse`;
        }
    }, [game]);

    if (!game) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Game not found!</h1>
                    <button onClick={() => router.push('/')} className="text-red-500 hover:underline">Back to Home</button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ background: 'var(--surface-bg)', color: 'var(--text-primary)' }}>
            {/* Navbar with working search state */}
            <Navbar query={searchQuery} onQueryChange={setSearchQuery} />

            <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 mb-4 md:mb-6 transition-all text-sm md:text-base hover:text-red-400 group"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Store
                </button>

                {/* Game Title & Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                            {game.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-500 border border-red-500/20">
                                {game.category}
                            </span>
                            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-faint)' }}>
                                • {game.players} players online
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm">
                            <Maximize2 className="size-4" /> Fullscreen
                        </button>
                    </div>
                </div>

                {/* Iframe Game Player (The Heart of the page) */}
                <div className="relative w-full aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.15)]"
                    style={{ border: '1px solid var(--surface-card-border)' }}>

                    <iframe
                        src={game.playUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        // IMPORTANT: Ye permissions game ko Keyboard, Mouse, aur Gamepad access deti hain
                        allow="autoplay; gamepad; fullscreen; keyboard; focus-without-user-activation; self; *;"
                        title={game.title}
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Info & How to Play Section */}
                <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 p-5 md:p-8 rounded-xl md:rounded-3xl"
                        style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-card-border)' }}>

                        <div className="flex items-center gap-2 mb-4">
                            <Info className="size-5 text-red-500" />
                            <h2 className="text-lg md:text-xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                                How to Play
                            </h2>
                        </div>

                        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            {game.subtitle}. Use your <b>Keyboard</b> and <b>Mouse</b> to interact with the world.
                            This experience is powered by <b>WebGL/Three.js</b> for high-performance 3D graphics
                            directly in your browser.
                        </p>

                        <div className="mt-4 p-3 rounded-lg bg-red-500/5 border border-red-500/10 text-xs" style={{ color: 'var(--text-faint)' }}>
                            Tip: For the best experience, ensure "Hardware Acceleration" is enabled in your browser settings.
                        </div>
                    </div>

                    {/* Quick Stats Sidebar */}
                    <div className="p-5 md:p-8 rounded-xl md:rounded-3xl flex flex-col justify-center"
                        style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-card-border)' }}>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-500 mb-1">{game.rating}</div>
                            <p className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-faintest)' }}>User Rating</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}