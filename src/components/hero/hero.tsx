'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const GridDisplay = dynamic(() => import('./grid-display'), { ssr: false })

const MARQUEE_ITEMS = ['SHOPIFY', 'SAAS', 'AI PRODUCTS', 'MOBILE APPS', 'VOICE AGENTS', 'FULL-STACK', 'CONSULTING', 'FLUTTER']

const SHIPPING = ['Fisique Fitness', 'WhaBuzz', 'TapVerifi', 'ShraviTech', 'LeadVoice']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}


export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % SHIPPING.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col" aria-label="Hero">
      <div className="absolute inset-0 z-0">
        <GridDisplay />
      </div>

      {/* Left-biased vignette for split layout */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 90% at 22% 52%, rgba(8,13,12,0.45) 0%, rgba(8,13,12,0.9) 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none dark:opacity-0 opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(ellipse 90% 90% at 22% 52%, rgba(245,255,254,0.6) 0%, rgba(245,255,254,0.93) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center px-5 sm:px-8 pt-24 pb-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-20 items-center">

          {/* Left: headline + CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass glow-border font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--fg-muted)]">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bb-teal opacity-75" style={{ animationDuration: '1.8s' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bb-teal" />
                </span>
                A ShraviTech Brand
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display font-black leading-[0.88] tracking-[-0.04em] text-[var(--fg)] mb-8"
              style={{ fontSize: 'clamp(4rem, 12vw, 9.5rem)' }}
            >
              YOUR<br />
              IDEA.<br />
              <span className="text-bb-teal">SHIPPED.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-xl text-[var(--fg-muted)] max-w-md leading-relaxed mb-10 font-body"
            >
              We build the software your business runs on — fast, opinionated, and built to last.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#contact"
                className={cn(
                  'group inline-flex items-center gap-2 px-7 py-3.5 rounded-full',
                  'text-sm font-semibold tracking-wide bg-bb-teal text-white',
                  'hover:brightness-110 transition-all duration-300',
                )}
                style={{ boxShadow: 'var(--glow-md)' }}
              >
                Start a Project
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className={cn(
                  'group inline-flex items-center gap-2 px-7 py-3.5 rounded-full',
                  'text-sm font-semibold tracking-wide glass glow-border',
                  'text-[var(--fg)] hover:text-bb-teal transition-all duration-300',
                )}
              >
                See Our Work
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Currently shipping — dramatic vertical cycler */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col justify-center gap-6 items-end text-right"
          >
            <div className="flex items-center gap-3 flex-row-reverse">
              <span
                className="w-2 h-2 rounded-full bg-bb-teal shrink-0 animate-pulse"
                style={{ boxShadow: '0 0 10px rgba(42,140,122,1)', animationDuration: '1.8s' }}
              />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">
                Currently shipping
              </p>
            </div>

            <div className="relative overflow-hidden w-full" style={{ height: 'calc(clamp(2rem, 4vw, 3.5rem) * 2 * 1.15)' }}>
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={activeIdx}
                  initial={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 font-display font-black leading-[1.1] tracking-[-0.03em] text-[var(--fg)] text-right break-words"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                  {SHIPPING[activeIdx]}
                </motion.p>
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Marquee strip */}
      <div
        className="relative z-10 border-t border-[var(--border)] py-4 overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
        aria-hidden="true"
      >
        <motion.div
          className="flex gap-10 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)] shrink-0 flex items-center gap-10">
              {item}
              <span className="w-1 h-1 rounded-full bg-bb-teal" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
