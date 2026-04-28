'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const textSize = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }[size]

  return (
    <span className={cn(textSize, 'tracking-wide text-[var(--fg)]', className)} style={{ fontFamily: 'var(--font-bebas-neue), "Bebas Neue", cursive' }}>
      BOT<span className="text-bb-teal">BRAINED</span>.
    </span>
  )
}
