'use client'

import { ArrowRight, Flame, Gamepad2, Star, Zap } from 'lucide-react'

const stats = [
    { icon: Star, value: '4.9', label: 'Rating' },
    { icon: Gamepad2, value: '200+', label: 'Games' },
    { icon: Flame, value: '12.6M', label: 'Players' },
]

export function Hero() {
    function scrollToGames() {
        document.getElementById('all-games')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section className="relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden mb-6 md:mb-10" style={{
            border: '1px solid var(--surface-modal-border)',
            boxShadow: '0 0 60px rgba(225, 29, 72, calc(0.15 * var(--glow-opacity))), 0 0 0 1px rgba(225, 29, 72, 0.15)',
        }}>
            {/* Background image */}
            <img
                src="/Gemini_Generated_Image_f7r6dpf7r6dpf7r6.png"
                className="absolute inset-0 w-full h-full object-cover object-right"
                alt="ClingVerse gaming platform"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{
                background: `linear-gradient(to right, var(--hero-gradient-start) 0%, var(--hero-gradient-mid) 45%, var(--hero-gradient-light) 75%, transparent 100%)`,
            }} />
            <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, var(--hero-bottom) 0%, transparent 50%)`,
            }} />
            {/* Extra left-to-right readability overlay */}
            <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 45%, transparent 80%)',
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
                <div className="hero-fade-up flex items-center gap-2 mb-4 md:mb-6" style={{ animationDelay: '0ms' }}>
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] md:text-xs font-semibold uppercase tracking-widest backdrop-blur-sm" style={{
                        border: '1px solid rgba(225, 29, 72, 0.5)',
                        background: 'rgba(225, 29, 72, 0.15)',
                        color: '#ff6080',
                    }}>
                        <Zap className="w-3 h-3 fill-current" />
                        Discover. Play. Repeat.
                    </span>
                </div>

                {/* Headline */}
                <h1 className="hero-fade-up font-display font-extrabold uppercase leading-[0.98] mb-4 md:mb-5" style={{ animationDelay: '90ms', letterSpacing: '0.01em' }}>
                    <span className="block text-3xl sm:text-4xl md:text-6xl" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(225,29,72,0.25)' }}>
                        Your Next
                    </span>
                    <span
                        className="block text-4xl sm:text-5xl md:text-7xl"
                        style={{
                            backgroundImage: 'linear-gradient(135deg, #ff3d68 0%, #ff6b9d 45%, #e11d48 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            filter: 'drop-shadow(0 0 26px rgba(225,29,72,0.55))',
                        }}
                    >
                        Obsession
                    </span>
                    <span className="block text-3xl sm:text-4xl md:text-6xl" style={{ color: '#ffffff', textShadow: '0 0 30px rgba(225,29,72,0.25)' }}>
                        Starts Here.
                    </span>
                </h1>

                {/* Description */}
                <p className="hero-fade-up text-xs sm:text-sm mb-5 md:mb-7 leading-relaxed max-w-xs md:max-w-sm" style={{ animationDelay: '180ms', color: 'rgba(255,255,255,0.72)' }}>
                    Discover games worth playing. Explore epic worlds, compete with players, and find your next favorite game.
                </p>

                {/* Stats */}
                <div className="hero-fade-up flex items-center gap-4 sm:gap-6 mb-6 md:mb-8" style={{ animationDelay: '270ms' }}>
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="flex items-center gap-4 sm:gap-6">
                            {i > 0 && (
                                <span className="h-8 w-px" style={{ background: 'rgba(255,255,255,0.25)' }} aria-hidden="true" />
                            )}
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center rounded-full size-7 sm:size-9 shrink-0" style={{
                                    background: 'rgba(225, 29, 72, 0.15)',
                                    border: '1px solid rgba(225, 29, 72, 0.35)',
                                }}>
                                    <stat.icon className="size-3.5 sm:size-4" style={{ color: '#ff6080' }} />
                                </span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-sm sm:text-base font-bold font-display" style={{ color: '#ffffff' }}>
                                        {stat.value}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                        {stat.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="hero-fade-up" style={{ animationDelay: '360ms' }}>
                    <button
                        type="button"
                        onClick={scrollToGames}
                        className="group flex items-center gap-2 rounded-lg px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest text-white transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #e11d48, #be123c)',
                            border: '1px solid rgba(255, 128, 160, 0.6)',
                            boxShadow: '0 4px 24px rgba(225, 29, 72, 0.45)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.boxShadow = '0 4px 34px rgba(225, 29, 72, 0.85), 0 0 0 1px rgba(255,128,160,0.9)'
                            e.currentTarget.style.transform = 'translateY(-1px)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.boxShadow = '0 4px 24px rgba(225, 29, 72, 0.45)'
                            e.currentTarget.style.transform = 'translateY(0)'
                        }}
                    >
                        Explore Games
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    )
}
