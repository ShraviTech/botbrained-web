'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Data ──────────────────────────────────────────────────────────────────

const team = [
  {
    name: 'Smaran Challapalli',
    role: 'Founder & Lead Engineer',
    bio: 'Ex Product @ Paytm | Shaadi.com | Reliance | Bestbuy. UT Dallas Alumni.',
    initials: 'SC',
    photo: 'https://qjznfydjmknwcmjscpgp.supabase.co/storage/v1/object/public/event-assets/team/d531ab3b-c7ce-4a72-ab7a-e80c93f51e7e.webp',
  },
  {
    name: 'Shravan Sriram',
    role: 'Advisor',
    bio: 'AI Strategist @ Google. Ex Tata | L&T. IIM Ahmedabad Alumni.',
    initials: 'SS',
    photo: 'https://qjznfydjmknwcmjscpgp.supabase.co/storage/v1/object/public/event-assets/team/da984f4d-54be-4d81-8e18-a1275e3122c0.webp',
  },
]

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
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

// ─── TeamCard ─────────────────────────────────────────────────────────────

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={cn(
        'group relative flex flex-col rounded-2xl overflow-hidden cursor-default select-none',
        'border border-[var(--border)] hover:border-bb-teal/60',
        'hover:shadow-[0_8px_40px_rgba(42,140,122,0.2)]',
        'transition-all duration-300',
        'glass',
      )}
    >
      {/* Top half — photo */}
      <div className="relative w-full h-56 bg-[var(--bg-secondary)] overflow-hidden">
        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bb-teal/20 to-transparent">
            <span className="font-display font-bold text-5xl text-bb-teal/40">{member.initials}</span>
          </div>
        )}
        {/* Subtle gradient fade into bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-card,var(--bg))] to-transparent" />
      </div>

      {/* Bottom half — text */}
      <div className="flex flex-col gap-3 px-6 pb-6 pt-4">
        <h3 className="font-display font-bold text-xl text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-300">
          {member.name}
        </h3>

        {/* Role pill */}
        <span className="self-start inline-flex items-center px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ background: 'rgba(42,140,122,0.12)', color: 'var(--bb-teal)', border: '1px solid rgba(42,140,122,0.25)' }}
        >
          {member.role}
        </span>

        <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
          {member.bio}
        </p>
      </div>

      {/* Top accent line on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-10 right-10 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-bb-teal to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-400"
      />
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────

export function Team() {
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const headingInView = useInView(headingRef, { once: true, margin: '-80px 0px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px 0px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-40px 0px' })

  return (
    <section
      id="team"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="The Team"
    >
      {/* ── Background orbs ── */}
      <span
        aria-hidden="true"
        className="orb"
        style={{
          width: 500,
          height: 500,
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(42,140,122,0.15) 0%, transparent 65%)',
          filter: 'blur(90px)',
          opacity: 0.6,
        }}
      />
      <span
        aria-hidden="true"
        className="orb"
        style={{
          width: 280,
          height: 280,
          bottom: '5%',
          right: '3%',
          background:
            'radial-gradient(circle, rgba(61,189,168,0.14) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* Heading */}
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
            <span>06 / TEAM</span>
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--fg)] leading-[0.9] tracking-[-0.03em] mb-4"
          >
            Built by{' '}
            <span className="text-bb-teal">builders.</span>
          </motion.h2>

          {/* Divider */}
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

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed"
          >
            A small, tight team — every person ships. No bloated hierarchies, no
            account managers between you and the people doing the work.
          </motion.p>
        </motion.div>

        {/* Team cards */}
        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-14"
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>

        {/* Hiring CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 18 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <a
            href="mailto:hello@botbrained.com"
            className={cn(
              'group inline-flex items-center gap-2',
              'text-sm text-[var(--fg-muted)] hover:text-bb-teal',
              'transition-colors duration-300',
              'border-b border-transparent hover:border-bb-teal/60',
              'pb-px',
            )}
          >
            We&apos;re always looking for exceptional people. Say hello
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-300 shrink-0"
            />
          </a>
        </motion.div>

      </div>
    </section>
  )
}
