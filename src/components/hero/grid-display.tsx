'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const COLS = 26
const ROWS = 16
const TOTAL = COLS * ROWS

// Sparse labels scattered through the grid (scaled for 26×16 = 416 cells)
const LABELED: Record<number, string> = {
  11: '01', 28: 'BB', 45: '10', 67: 'AI', 83: '//',
  102: '>>', 118: '01', 139: 'BB', 157: '10', 174: 'AI',
  196: '//', 213: '>>', 231: '01', 249: 'BB', 268: '10',
  285: 'AI', 301: '//', 319: '>>', 337: '01', 356: 'BB',
  373: '10', 391: 'AI', 407: '//',
}

interface CellStyle extends React.CSSProperties {
  '--col'?: number
  '--row'?: number
}

export default function GridDisplay() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Stable random seed so cells don't shift on hydration
  const [cells, setCells] = useState<boolean[]>(() =>
    Array.from({ length: TOTAL }, (_, i) => {
      // Deterministic-ish pattern based on index
      const seed = ((i * 2654435761) >>> 0) % 1000
      return seed < 450
    })
  )

  // Keep a ref so the flicker interval can read current cells without re-creating
  const cellsRef = useRef(cells)
  useEffect(() => { cellsRef.current = cells }, [cells])

  // Mouse spotlight: only touch 2 CSS vars on the container element
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  // Idle flicker — runs once, reads via ref
  useEffect(() => {
    const id = setInterval(() => {
      const current = cellsRef.current
      const onIndexes: number[] = []
      for (let i = 0; i < current.length; i++) {
        if (current[i]) onIndexes.push(i)
      }
      if (onIndexes.length < 5) return

      const picks: number[] = []
      for (let k = 0; k < 3; k++) {
        picks.push(onIndexes[Math.floor(Math.random() * onIndexes.length)])
      }

      setCells(prev => {
        const next = [...prev]
        picks.forEach(i => { next[i] = false })
        return next
      })

      setTimeout(() => {
        setCells(prev => {
          const next = [...prev]
          picks.forEach(i => { next[i] = true })
          return next
        })
      }, 130)
    }, 420)

    return () => clearInterval(id)
  }, []) // intentionally empty — reads cells via ref

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none"
      onMouseMove={onMouseMove}
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(42,140,122,0.035) 3px, rgba(42,140,122,0.035) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Mouse spotlight — single element, no per-cell JS */}
      <div
        className="absolute pointer-events-none z-[3] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 'var(--mx)',
          top: 'var(--my)',
          width: 280,
          height: 280,
          background:
            'radial-gradient(140px circle at center, rgba(42,140,122,0.38) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />

      {/* Cell grid */}
      <div
        className="absolute inset-0 p-1"
        aria-hidden="true"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: '3px',
        }}
      >
          {cells.map((on, i) => {
            const col = i % COLS
            const row = Math.floor(i / COLS)
            const label = LABELED[i]

            return (
              <div
                key={i}
                style={
                  {
                    '--col': col,
                    '--row': row,
                    background: on ? 'rgba(42,140,122,0.62)' : 'transparent',
                    border: `1px solid ${on ? 'rgba(42,140,122,0.42)' : 'rgba(42,140,122,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6px',
                    fontFamily: 'monospace',
                    color: on ? 'rgba(42,140,122,0.9)' : 'rgba(42,140,122,0.12)',
                    opacity: 0,
                    animation: 'cellReveal 0.28s ease forwards',
                    animationDelay: `calc((var(--col) + var(--row)) * 28ms)`,
                    boxShadow: on ? '0 0 5px rgba(42,140,122,0.28)' : 'none',
                    transition: 'background 0.13s ease, box-shadow 0.13s ease, border-color 0.13s ease',
                  } as CellStyle
                }
              >
                {label}
              </div>
            )
          })}
      </div>
    </div>
  )
}
