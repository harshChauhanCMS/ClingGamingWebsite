'use client'

import { categories } from '@/lib/games'
import { useTheme } from '@/lib/theme-context'

export function CategorySidebar({ activeCategory, setCategory }: { activeCategory: string; setCategory: (cat: string) => void }) {
    const { theme } = useTheme()
    const isLight = theme === 'light'

    return (
        <aside className="w-full md:w-56 shrink-0 flex flex-col gap-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 px-1 hidden md:block" style={{ color: 'var(--text-faintest)' }}>
                Categories
            </h3>

            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2 md:gap-0.5 no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.name)}
                        className="flex items-center justify-center md:justify-start gap-2 md:gap-3 px-4 py-2 md:px-3 md:py-2.5 rounded-xl transition-all text-sm font-medium border shrink-0"
                        style={activeCategory === cat.name ? {
                            background: isLight ? 'rgba(225, 29, 72, 0.1)' : 'rgba(225, 29, 72, 0.2)',
                            border: '1px solid rgba(225, 29, 72, 0.4)',
                            boxShadow: isLight ? '0 2px 8px rgba(225,29,72,0.1)' : '0 0 12px rgba(225, 29, 72, 0.1)',
                            color: isLight ? '#be123c' : 'var(--text-primary)',
                        } : {
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: 'var(--text-muted)',
                        }}
                    >
                        <span className="text-base leading-none">{cat.icon}</span>
                        <span className="whitespace-nowrap">{cat.name}</span>
                    </button>
                ))}
            </div>

        </aside>
    )
}