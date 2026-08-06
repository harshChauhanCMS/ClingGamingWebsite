'use client'

import { Play, Plus, Star, Zap } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative h-[320px] md:h-[480px] rounded-2xl overflow-hidden mb-6 md:mb-10" style={{
            border: '1px solid var(--surface-modal-border)',
            boxShadow: '0 0 60px rgba(225, 29, 72, calc(0.15 * var(--glow-opacity))), 0 0 0 1px rgba(225, 29, 72, 0.15)',
        }}>
            {/* Background image */}
            <img
                src="/hero.png"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Aeon Protocol"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{
                background: `linear-gradient(to right, var(--hero-gradient-start) 0%, var(--hero-gradient-mid) 45%, var(--hero-gradient-light) 75%, transparent 100%)`,
            }} />
            <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, var(--hero-bottom) 0%, transparent 50%)`,
            }} />

            {/* Red top-left corner accent */}
            <div className="absolute top-0 left-0 w-40 h-1" style={{
                background: 'linear-gradient(to right, #e11d48, transparent)',
            }} />
            <div className="absolute top-0 left-0 w-1 h-40" style={{
                background: 'linear-gradient(to bottom, #e11d48, transparent)',
            }} />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-6 md:px-10 max-w-xl">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3 md:mb-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-widest backdrop-blur-sm" style={{
                        border: '1px solid rgba(225, 29, 72, 0.5)',
                        background: 'rgba(225, 29, 72, 0.15)',
                        color: '#ff6080',
                    }}>
                        <Zap className="w-3 h-3 fill-current" />
                        Featured 3D Game
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3 leading-tight" style={{
                    letterSpacing: '0.05em',
                    textShadow: '0 0 40px rgba(225, 29, 72, 0.3)',
                    color: 'var(--text-primary)',
                }}>
                    Aeon Protocol
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm mb-4 leading-relaxed max-w-xs md:max-w-sm line-clamp-2 md:line-clamp-none" style={{ color: 'var(--text-muted)' }}>
                    Dive into a neon-soaked open world where every choice reshapes the battlefield. Real-time 3D combat, stunning visuals, and endless replayability.
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-5 md:mb-6 text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                        4.9
                    </span>
                    <span className="hidden sm:inline" style={{ color: 'var(--text-faintest)' }}>•</span>
                    <span>Adventure · Sci-Fi</span>
                    <span className="hidden sm:inline" style={{ color: 'var(--text-faintest)' }}>•</span>
                    <span>12.6M Players</span>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                    <button className="flex items-center gap-2 rounded-lg px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-white transition-all" style={{
                        background: 'linear-gradient(135deg, #e11d48, #be123c)',
                        boxShadow: '0 4px 20px rgba(225, 29, 72, 0.4)',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 30px rgba(225, 29, 72, 0.7)')}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(225, 29, 72, 0.4)')}
                    >
                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" /> Play Now
                    </button>
                    <button className="flex items-center gap-2 rounded-lg px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold backdrop-blur-sm transition-all" style={{
                        border: '1px solid var(--surface-card-border)',
                        background: 'var(--surface-hover)',
                        color: 'var(--text-primary)',
                    }}>
                        <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" /> Add to Library
                    </button>
                </div>
            </div>
        </section>
    )
}