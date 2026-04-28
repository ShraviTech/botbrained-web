'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { clientProjects, productProjects } from '@/lib/work-data'

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function Work() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  const featured = clientProjects[0]
  const rest = clientProjects.slice(1)

  return (
    <section
      id="work"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-label="Our Work"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* Eyebrow */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">
              02 / WORK
            </span>
            <span className="flex-1 h-px bg-[var(--border)]" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display font-black leading-[0.9] tracking-[-0.03em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            What We&apos;ve <span className="text-bb-teal">Built.</span>
          </motion.h2>
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px 0px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-[var(--border-strong)] mb-4"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          {/* Subtle inner grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(var(--bb-teal) 1px, transparent 1px), linear-gradient(90deg, var(--bb-teal) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative p-8 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

              {/* Left */}
              <div className="flex flex-col gap-6 lg:max-w-xl">
                <div className="flex items-center gap-3 flex-wrap">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.22em] uppercase px-3 py-1 rounded-full border"
                      style={{ color: 'var(--bb-teal)', borderColor: 'rgba(42,140,122,0.3)', background: 'rgba(42,140,122,0.08)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  className="font-display font-black leading-[0.9] tracking-[-0.03em] text-[var(--fg)]"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                >
                  {featured.name}
                </h3>

                <p className="text-base sm:text-lg text-[var(--fg-muted)] leading-relaxed">
                  {featured.description}
                </p>
              </div>

              {/* Right: highlights + link */}
              <div className="flex flex-col gap-6 lg:items-end">
                <ul className="flex flex-col gap-2 lg:items-end">
                  {featured.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                      <span className="w-1 h-1 rounded-full bg-bb-teal shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-bb-teal hover:text-[var(--fg)] transition-colors duration-200"
                >
                  {featured.url.replace('https://', '')}
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Remaining client chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {rest.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px 0px' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="group flex flex-col gap-2 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-200"
              style={{ background: 'transparent' }}
              whileHover={{ background: 'rgba(42,140,122,0.04)' }}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg-subtle)]">
                  {project.tags[0]}
                </span>
                <ArrowUpRight size={13} className="text-[var(--fg-subtle)] group-hover:text-bb-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </div>
              <span className="font-display font-black text-sm text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-200">
                {project.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-[var(--border)]">
          <Link
            href="/clients"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200"
          >
            All client work
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* Products pill row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-subtle)]">Products</span>
            {productProjects.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-wide px-3 py-1 rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:border-bb-teal hover:text-bb-teal transition-all duration-200"
              >
                {p.name}
              </a>
            ))}
            <Link
              href="/products"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-[var(--fg-muted)] hover:text-bb-teal transition-colors duration-200"
            >
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
