'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { productProjects, type WorkItem } from '@/lib/work-data'

type StatusFilter = 'all' | 'live' | 'stealth'

const liveCount = productProjects.filter(p => p.status === 'live').length

function ProductRow({ item, index }: { item: WorkItem; index: number }) {
  const isLive = item.status === 'live'

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px 0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="group block border-b border-[var(--border)] px-5 sm:px-8 py-10 sm:py-12 transition-colors duration-200"
      style={{ background: 'transparent' }}
      whileHover={{ background: 'rgba(42,140,122,0.03)' } as never}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-16 items-start">

        {/* Left: identity */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--fg-subtle)]">
              {String(index + 1).padStart(2, '0')}
            </span>
            {item.status && (
              <span
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: isLive ? 'var(--bb-teal)' : 'var(--fg-subtle)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: isLive ? 'var(--bb-teal)' : 'var(--fg-subtle)',
                    boxShadow: isLive ? '0 0 5px rgba(42,140,122,0.9)' : 'none',
                  }}
                />
                {item.status}
              </span>
            )}
          </div>

          <h3
            className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-300"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {item.name}
          </h3>

          <div className="flex flex-wrap gap-3">
            {item.tags.map(tag => (
              <span key={tag} className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg-subtle)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-5">
          <p
            className="font-display font-bold leading-[1.1] tracking-[-0.02em] text-[var(--fg)]"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
          >
            {item.headline}
          </p>

          <p className="text-base text-[var(--fg-muted)] leading-relaxed max-w-2xl">
            {item.description}
          </p>

          <ul className="flex flex-col gap-2">
            {item.highlights.map(h => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-[var(--fg-muted)]">
                <span className="w-1 h-1 rounded-full bg-bb-teal shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 pt-2 text-sm font-semibold group-hover:text-bb-teal transition-colors duration-200" style={{ color: 'var(--fg-subtle)' }}>
            <span className="font-mono">{item.url.replace('https://', '')}</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </div>
        </div>

      </div>
    </motion.a>
  )
}

const FILTERS: { label: string; value: StatusFilter; count: number }[] = [
  { label: 'All', value: 'all', count: productProjects.length },
  { label: 'Live', value: 'live', count: productProjects.filter(p => p.status === 'live').length },
  { label: 'Stealth', value: 'stealth', count: productProjects.filter(p => p.status === 'stealth').length },
]

export default function ProductsPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')

  const filtered = filter === 'all' ? productProjects : productProjects.filter(p => p.status === filter)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }} className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            className="flex flex-col gap-7"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">Our Products</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-bb-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-bb-teal" style={{ boxShadow: '0 0 5px rgba(42,140,122,0.9)' }} />
                {liveCount} live
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
              className="font-display font-black leading-[0.88] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Built &amp;<br />
              <span className="text-bb-teal">Owned.</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
              className="text-base sm:text-xl text-[var(--fg-muted)] max-w-xl leading-relaxed"
            >
              We saw the gaps. We built the tools. TapVerifi, LeadVoice, WhaBuzz — all live, all running in production.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-20 border-b border-[var(--border)]" style={{ background: 'var(--bg)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center gap-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="relative px-4 py-4 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: filter === f.value ? 'var(--bb-teal)' : 'var(--fg-subtle)' }}
            >
              {f.label} ({f.count})
              {filter === f.value && (
                <motion.span
                  layoutId="product-filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-bb-teal"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product rows */}
      <div className="border-t border-[var(--border)]">
        {filtered.map((item, i) => (
          <ProductRow key={item.name} item={item} index={i} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[var(--fg-subtle)] font-mono text-sm py-20">Nothing here yet.</p>
        )}
      </div>

      {/* CTA */}
      <section className="py-24 sm:py-36 border-t border-[var(--border)]" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <h2
                className="font-display font-black leading-[0.9] tracking-[-0.03em] text-[var(--fg)]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                Got a product<br />
                <span className="text-bb-teal">idea?</span>
              </h2>
              <p className="text-base sm:text-lg text-[var(--fg-muted)] max-w-sm leading-relaxed">
                We co-build, consult, or take on equity deals for the right products. If you&apos;ve got the domain, we&apos;ve got the stack.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base tracking-wide bg-bb-teal text-white hover:brightness-110 transition-all duration-300"
                style={{ boxShadow: '0 0 28px rgba(42,140,122,0.35)' }}
              >
                Let&apos;s Talk
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/clients"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base tracking-wide glass glow-border text-[var(--fg)] hover:text-bb-teal transition-all duration-300"
              >
                See Client Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
