'use client'

import { categories } from '@/lib/games'
import { Crown } from 'lucide-react'

export function CategorySidebar({ activeCategory, setCategory }: { activeCategory: string; setCategory: (cat: string) => void }) {
    return (
        <aside className="w-full md:w-56 shrink-0 flex flex-col gap-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 px-1 hidden md:block" style={{ color: 'rgba(255,200,200,0.35)' }}>
                Categories
            </h3>

            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2 md:gap-0.5 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.name)}
                        className={`flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 py-2 md:px-3 md:py-2.5 rounded-xl transition-all text-sm font-medium border shrink-0 ${activeCategory === cat.name
                            ? 'text-white'
                            : 'text-white/50 hover:text-white/80 border-transparent'
                            }`}
                        style={activeCategory === cat.name ? {
                            background: 'rgba(225, 29, 72, 0.2)',
                            border: '1px solid rgba(225, 29, 72, 0.4)',
                            boxShadow: '0 0 12px rgba(225, 29, 72, 0.1)',
                        } : {
                            background: 'transparent',
                        }}
                    >
                        <span className="text-base leading-none">{cat.icon}</span>
                        <span className="whitespace-nowrap">{cat.name}</span>
                    </button>
                ))}
            </div>

            {/* Go Premium card - hidden on mobile purely for space concerns */}
            <div className="hidden md:block mt-4 rounded-xl p-4" style={{
                border: '1px solid rgba(225, 29, 72, 0.25)',
                background: 'rgba(180, 10, 30, 0.12)',
            }}>
                <div className="flex items-center gap-2 mb-2">
                    <Crown className="size-4 text-yellow-400" />
                    <p className="text-sm font-bold text-white">Go Premium</p>
                </div>
                <p className="text-xs text-white/40 mb-3 leading-relaxed">
                    Unlock every title, ad-free play, and exclusive drops.
                </p>
                <button
                    className="w-full rounded-lg py-2 text-xs font-semibold text-white transition-all"
                    style={{
                        background: 'linear-gradient(135deg, #e11d48, #9f1239)',
                        boxShadow: '0 2px 12px rgba(225, 29, 72, 0.3)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 20px rgba(225, 29, 72, 0.6)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(225, 29, 72, 0.3)')}
                >
                    Upgrade Now
                </button>
            </div>
        </aside>
    )
}