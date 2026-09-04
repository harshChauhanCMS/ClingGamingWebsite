'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/lib/theme-context'

const PARTICLE_COUNT = 35

interface Particle {
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    delay: number
}

export function ParallaxBackground() {
    const { theme } = useTheme()
    const gridRef = useRef<HTMLDivElement>(null)
    const orbRef1 = useRef<HTMLDivElement>(null)
    const orbRef2 = useRef<HTMLDivElement>(null)
    const orbRef3 = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let rafId: number
        let lastY = window.scrollY

        function onScroll() {
            lastY = window.scrollY
        }

        function animate() {
            const y = lastY

            if (gridRef.current) {
                gridRef.current.style.transform = `translateY(${y * 0.12}px)`
            }
            if (orbRef1.current) {
                orbRef1.current.style.transform = `translateY(${y * 0.22}px)`
            }
            if (orbRef2.current) {
                orbRef2.current.style.transform = `translateY(${y * 0.15}px)`
            }
            if (orbRef3.current) {
                orbRef3.current.style.transform = `translateY(${y * 0.08}px)`
            }

            rafId = requestAnimationFrame(animate)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        rafId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('scroll', onScroll)
            cancelAnimationFrame(rafId)
        }
    }, [])

    // Generate stable particles
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const seed = i * 137.508
        return {
            x: ((seed * 31) % 100),
            y: ((seed * 17) % 100),
            size: 1 + (i % 4) * 0.8,
            speed: 6 + (i % 5) * 3,
            opacity: 0.3 + (i % 4) * 0.15,
            delay: -(i * 0.7),
        }
    })

    // Soft pastel gradient mesh in light mode
    if (theme === 'light') {
        return (
            <div className="parallax-bg" aria-hidden="true">
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, #fffafb 0%, #fdf6f7 100%)',
                }} />
                <div ref={orbRef1} className="parallax-orb-light parallax-orb-light-1" />
                <div ref={orbRef2} className="parallax-orb-light parallax-orb-light-2" />
            </div>
        )
    }

    return (
        <div className="parallax-bg" aria-hidden="true">
            {/* Dark base gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 70% 10%, rgba(180,10,40,0.18) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(120,0,20,0.12) 0%, transparent 50%), #050508',
                }}
            />

            {/* Grid layer — parallax scroll */}
            <div ref={gridRef} className="parallax-grid" />
            <div className="parallax-grid-diag" />

            {/* Glowing orbs */}
            <div ref={orbRef1} className="parallax-orb parallax-orb-1" />
            <div ref={orbRef2} className="parallax-orb parallax-orb-2" />
            <div ref={orbRef3} className="parallax-orb parallax-orb-3" />

            {/* Horizontal scan beam */}
            <div className="scan-sweep" />

            {/* Scanline texture */}
            <div className="parallax-scanline" />

            {/* Floating particles */}
            <div className="parallax-particles">
                {particles.map((p, i) => (
                    <span
                        key={i}
                        className="particle"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDuration: `${p.speed}s`,
                            animationDelay: `${p.delay}s`,
                            opacity: p.opacity,
                            boxShadow: `0 0 ${p.size * 3}px 1px rgba(225,29,72,0.6)`,
                        }}
                    />
                ))}
            </div>

            {/* Bottom vignette */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'linear-gradient(to top, rgba(5,5,8,0.8), transparent)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}
