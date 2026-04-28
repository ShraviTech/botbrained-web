'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, ArrowRight, Waves, Cpu, Zap, Timer } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── Feature pills ────────────────────────────────────────────────────────

const PILLS = [
  { label: 'Voice AI Agents', icon: Waves },
  { label: 'Custom LLM Workflows', icon: Cpu },
  { label: 'AI Automation', icon: Zap },
  { label: 'Real-time Processing', icon: Timer },
]

// ─── Animated voice orb visual ────────────────────────────────────────────

function VoiceOrb() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[320px]">
      {/* Outermost ring */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border border-bb-teal/20"
        style={{ width: 280, height: 280 }}
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.25, 0.08, 0.25],
        }}
        transition={{
          duration: 3.2,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0,
        }}
      />

      {/* Middle ring */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border border-bb-teal/30"
        style={{ width: 210, height: 210 }}
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.4, 0.12, 0.4],
        }}
        transition={{
          duration: 3.2,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.55,
        }}
      />

      {/* Inner ring */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border border-bb-teal/40"
        style={{ width: 148, height: 148 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.55, 0.18, 0.55],
        }}
        transition={{
          duration: 3.2,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 1.1,
        }}
      />

      {/* Soft glow halo */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          width: 110,
          height: 110,
          background:
            'radial-gradient(circle, rgba(42,140,122,0.38) 0%, transparent 70%)',
          filter: 'blur(16px)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 2.6,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.3,
        }}
      />

      {/* Center circle */}
      <motion.div
        className={cn(
          'relative z-10 flex items-center justify-center rounded-full',
          'bg-gradient-to-br from-bb-teal to-bb-teal-light',
          'shadow-[0_0_32px_rgba(42,140,122,0.55)]',
        )}
        style={{ width: 80, height: 80 }}
        animate={{
          boxShadow: [
            '0 0 28px rgba(42,140,122,0.45)',
            '0 0 52px rgba(42,140,122,0.65)',
            '0 0 28px rgba(42,140,122,0.45)',
          ],
        }}
        transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity }}
      >
        <Bot size={34} className="text-white" strokeWidth={1.6} />
      </motion.div>

      {/* Floating waveform bars around center */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full bg-bb-teal/50"
          style={{
            width: 3,
            height: 14 + i * 6,
            bottom: '50%',
            left: `calc(50% + ${(i - 2) * 14}px)`,
            transformOrigin: 'bottom center',
          }}
          animate={{
            scaleY: [1, 1.8 + i * 0.3, 0.6, 1],
            opacity: [0.5, 0.9, 0.4, 0.5],
          }}
          transition={{
            duration: 1.4,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: i * 0.18,
          }}
        />
      ))}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────

export function AISpotlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const leftInView = useInView(leftRef, { once: true, margin: '-80px 0px' })
  const rightInView = useInView(rightRef, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="ai"
      ref={sectionRef}
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-label="AI & Voice"
    >
      {/* ── Background orbs ── */}
      <span
        aria-hidden="true"
        className="orb"
        style={{
          width: 560,
          height: 560,
          top: '50%',
          left: '-10%',
          transform: 'translateY(-50%)',
          background:
            'radial-gradient(circle, rgba(42,140,122,0.2) 0%, transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="orb"
        style={{
          width: 360,
          height: 360,
          top: '10%',
          right: '-5%',
          background:
            'radial-gradient(circle, rgba(61,189,168,0.14) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left column — text */}
          <motion.div
            ref={leftRef}
            variants={containerVariants}
            initial="hidden"
            animate={leftInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-7"
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]"
            >
              <span className="w-6 h-px bg-[var(--fg-subtle)]" />
              <span>03 / AI</span>
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--fg)] leading-[0.9] tracking-[-0.03em]"
            >
              We don&apos;t just{' '}
              <br className="hidden sm:block" />
              integrate AI.{' '}
              <span className="text-gradient">We build it.</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed text-[var(--fg-muted)] max-w-lg"
            >
              LeadVoice is our in-house AI voice agent — built to qualify leads,
              handle outbound calls, and run 24/7 without burning a sales team.
              We apply the same AI engineering to every client engagement.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3"
            >
              {PILLS.map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                    'glass glow-border text-[var(--fg)]',
                    'border-[var(--border-strong)]',
                  )}
                >
                  <Icon size={14} className="text-bb-teal shrink-0" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <a
                href="#contact"
                className={cn(
                  'group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm',
                  'bg-gradient-to-r from-bb-teal to-bb-teal-light text-white',
                  'shadow-[0_4px_20px_rgba(42,140,122,0.38)]',
                  'hover:shadow-[0_4px_32px_rgba(42,140,122,0.55)] hover:brightness-110',
                  'transition-all duration-300',
                )}
              >
                See LeadVoice
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* Right column — animated voice visual */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={rightInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex items-center justify-center"
          >
            {/* Glass card wrapping the orb */}
            <div
              className={cn(
                'relative w-full max-w-[400px] aspect-square rounded-3xl',
                'glass glow-border flex items-center justify-center overflow-hidden',
              )}
            >
              {/* Inner grid pattern */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl opacity-[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--bb-teal) 1px, transparent 1px), linear-gradient(90deg, var(--bb-teal) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <VoiceOrb />

              {/* LeadVoice label */}
              <div
                className={cn(
                  'absolute bottom-5 left-1/2 -translate-x-1/2',
                  'flex items-center gap-2 px-4 py-2 rounded-full',
                  'bg-[rgba(42,140,122,0.12)] border border-[var(--border-strong)]',
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bb-teal-light opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bb-teal" />
                </span>
                <span className="font-mono text-xs text-bb-teal-light tracking-widest uppercase">
                  LeadVoice
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
