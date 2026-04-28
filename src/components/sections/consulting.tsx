'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Consulting() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section
      id="consulting"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Consulting"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* Eyebrow */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="flex flex-col items-start gap-8"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 w-full">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">
              05 / CONSULTING
            </span>
            <span className="flex-1 h-px bg-[var(--border)]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display font-black leading-[0.88] tracking-[-0.04em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
          >
            Got an idea?<br />
            <span className="text-bb-teal">Let&apos;s build it.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-xl text-[var(--fg-muted)] max-w-lg leading-relaxed"
          >
            30 minutes. Walk in with a problem, walk out with a plan. No pressure, no retainer.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-bb-teal text-white hover:brightness-110 transition-all duration-300"
              style={{ boxShadow: 'var(--glow-md)' }}
            >
              Book a Discovery Call
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide glass glow-border text-[var(--fg)] hover:text-bb-teal transition-all duration-300"
            >
              Architecture Review
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
