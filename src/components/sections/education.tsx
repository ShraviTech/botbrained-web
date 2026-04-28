'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Users, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Data ──────────────────────────────────────────────────────────────────

const FORMATS = [
  {
    icon: Zap,
    title: '90-Min Intensive',
    description:
      'One topic, deep-dive, done in 90 minutes. Perfect for busy professionals.',
    tags: ['Single session', 'One focused topic', 'Live Q&A'],
    accent: false,
  },
  {
    icon: Users,
    title: 'Weekly Cohort',
    description:
      'Multi-week program with projects, feedback, and community.',
    tags: ['Multi-week', 'Hands-on projects', 'Peer community'],
    accent: true,
  },
  {
    icon: Building2,
    title: 'Live Seminars for Organizations',
    description:
      'Private, on-site or virtual seminars tailored for your team. We cover AI strategy, tooling, and hands-on workflows relevant to your industry.',
    tags: ['Custom curriculum', 'Team-wide upskilling', 'Private cohort'],
    accent: false,
  },
]

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

// ─── FormatCard ───────────────────────────────────────────────────────────

function FormatCard({
  format,
}: {
  format: (typeof FORMATS)[number]
}) {
  const Icon = format.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.018 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'group relative flex flex-col gap-6 p-8 rounded-2xl',
        'glass glow-border cursor-default select-none',
        format.accent && [
          'before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none',
          'before:bg-gradient-to-br before:from-[rgba(42,140,122,0.1)] before:to-transparent',
        ],
      )}
    >
      {/* Accent top border */}
      {format.accent && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-bb-teal to-transparent opacity-70"
        />
      )}

      {/* Icon */}
      <div
        className={cn(
          'relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0',
          'border transition-colors duration-300',
          format.accent
            ? 'bg-[rgba(42,140,122,0.16)] border-[var(--border-strong)]'
            : 'bg-[rgba(42,140,122,0.08)] border-[var(--border)]',
          'group-hover:bg-[rgba(42,140,122,0.22)] group-hover:border-[var(--border-strong)]',
        )}
      >
        <Icon
          size={26}
          className="text-bb-teal group-hover:scale-110 transition-transform duration-300"
          strokeWidth={1.7}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 flex-1">
        <h3 className="font-display font-bold text-xl text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-300">
          {format.title}
        </h3>
        <p className="text-[var(--fg-muted)] leading-relaxed text-sm sm:text-base">
          {format.description}
        </p>
      </div>

      {/* Tags / feature list */}
      <ul className="flex flex-col gap-2">
        {format.tags.map((tag) => (
          <li
            key={tag}
            className="flex items-center gap-2.5 text-sm text-[var(--fg-muted)]"
          >
            <CheckCircle2
              size={15}
              className="text-bb-teal shrink-0"
              strokeWidth={2}
            />
            {tag}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────

export function Education() {
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const headingInView = useInView(headingRef, { once: true, margin: '-80px 0px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px 0px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-40px 0px' })

  return (
    <section
      id="education"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-label="AI Education"
    >
      {/* ── Background orb ── */}
      <span
        aria-hidden="true"
        className="orb"
        style={{
          width: 500,
          height: 500,
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(42,140,122,0.16) 0%, transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="orb"
        style={{
          width: 260,
          height: 260,
          bottom: '0%',
          left: '-4%',
          background:
            'radial-gradient(circle, rgba(61,189,168,0.18) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* Heading block */}
        <motion.div
          ref={headingRef}
          variants={containerVariants}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-14 sm:mb-18"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)] mb-6"
          >
            <span className="w-6 h-px bg-[var(--fg-subtle)]" />
            <span>04 / EDUCATION</span>
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--fg)] leading-[0.9] tracking-[-0.03em] mb-4"
          >
            Learn AI.{' '}
            <span className="text-gradient">Live.</span>{' '}
            No recordings.
          </motion.h2>

          {/* Divider bar */}
          <motion.div
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: {
                scaleX: 1,
                opacity: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
              },
            }}
            className="h-[3px] w-16 rounded-full bg-gradient-to-r from-bb-teal to-bb-teal-light mb-6 origin-center"
          />

          {/* Body */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--fg-muted)] max-w-2xl leading-relaxed"
          >
            We run live classes — not pre-recorded courses. Come for a focused
            90-minute intensive or commit to a multi-week cohort. Hands-on,
            practical, taught by people who build AI products daily.
          </motion.p>
        </motion.div>

        {/* Format cards */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14"
        >
          {FORMATS.map((format) => (
            <FormatCard key={format.title} format={format} />
          ))}
        </motion.div>

        {/* Practitioner stat + CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          {/* Stat line */}
          <p className="font-display font-medium text-base text-[var(--fg-subtle)] italic">
            &ldquo;Taught by practitioners, not professors.&rdquo;
          </p>

          {/* CTA button */}
          <a
            href="#contact"
            className={cn(
              'group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm',
              'border-2 border-bb-teal text-bb-teal',
              'hover:bg-[rgba(42,140,122,0.1)] hover:shadow-[0_0_24px_rgba(42,140,122,0.22)]',
              'transition-all duration-300',
            )}
          >
            Register Interest
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
