'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20, mass: 0.5 })
  const ringY = useSpring(useMotionValue(-100), { stiffness: 150, damping: 20, mass: 0.5 })
  const ringScale = useSpring(1, { stiffness: 200, damping: 20 })
  const isVisible = useRef(false)

  useEffect(() => {
    // Only activate on hover-capable (desktop) devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rawDotX = dotX
    const rawDotY = dotY
    // Use separate spring-backed values for the ring
    const springX = ringX
    const springY = ringY

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      rawDotX.set(x)
      rawDotY.set(y)
      springX.set(x)
      springY.set(y)
      if (!isVisible.current) {
        isVisible.current = true
      }
    }

    const handleEnterInteractive = () => ringScale.set(2.2)
    const handleLeaveInteractive = () => ringScale.set(1)

    window.addEventListener('mousemove', moveCursor, { passive: true })

    // Attach hover listeners to interactive elements
    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', handleEnterInteractive)
        el.addEventListener('mouseleave', handleLeaveInteractive)
      })
    }
    attach()

    // Re-attach on DOM changes
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [dotX, dotY, ringX, ringY, ringScale])

  return (
    <>
      {/* Small solid dot — snaps to cursor */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-bb-teal hidden sm:block"
        aria-hidden="true"
      />
      {/* Outlined ring — springs behind */}
      <motion.div
        style={{ x: ringX, y: ringY, scale: ringScale }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-bb-teal opacity-60 hidden sm:block"
        aria-hidden="true"
      />
    </>
  )
}
