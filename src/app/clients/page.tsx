'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BrowserFrame } from '@/components/work/browser-frame'
import { clientProjects, type WorkItem } from '@/lib/work-data'

const featured = clientProjects.filter(p => p.featured)
const rest = clientProjects.filter(p => !p.featured)
const allTags = ['All', ...Array.from(new Set(clientProjects.flatMap(p => p.tags)))]

function ClientCard({ item, index }: { item: WorkItem; index: number }) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="group flex flex-col gap-4 p-6 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-200"
      whileHover={{ background: 'rgba(42,140,122,0.03)' } as never}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--fg-subtle)]">
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight
          size={15}
          className="text-[var(--fg-subtle)] group-hover:text-bb-teal shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
        />
      </div>
      <h3
        className="font-display font-black leading-[1.0] tracking-[-0.02em] text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-200"
        style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
      >
        {item.name}
      </h3>
      <p className="text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-2">
        {item.description}
      </p>
    </motion.a>
  )
}

export default function ClientWorkPage() {
  const [activeTag, setActiveTag] = useState('All')
  const filtered = activeTag === 'All' ? rest : rest.filter(p => p.tags.includes(activeTag))

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
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">Client Work</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-bb-teal">{clientProjects.length} projects</span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
              className="font-display font-black leading-[0.88] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Built for<br />
              <span className="text-bb-teal">Clients.</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
              className="text-base sm:text-xl text-[var(--fg-muted)] max-w-xl leading-relaxed"
            >
              Not a freelancer. Not an agency. A real tech team that owns the outcome — from architecture to deployment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured — side-by-side split */}
      {featured.length > 0 && (
        <section className="py-20 border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">

            {/* Browser frames side by side */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
            >
              {featured.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px 0px' }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                >
                  <BrowserFrame
                    url={item.url}
                    title={item.name}
                    tags={item.tags}
                    description={item.description}
                    className="h-[42vh] min-h-[280px]"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Details below each browser */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px 0px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.1 }}
                  className="group flex flex-col gap-4 p-6 rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-200"
                  whileHover={{ background: 'rgba(42,140,122,0.04)' } as never}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full border"
                            style={{ color: 'var(--bb-teal)', borderColor: 'rgba(42,140,122,0.3)', background: 'rgba(42,140,122,0.08)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3
                        className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-200"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
                      >
                        {item.name}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-[var(--fg-subtle)] group-hover:text-bb-teal shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 mt-1"
                    />
                  </div>

                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="flex flex-col gap-1.5 mt-1">
                    {item.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
                        <span className="w-1 h-1 rounded-full bg-bb-teal shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </motion.a>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Rest — compact filterable grid */}
      {rest.length > 0 && (
        <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">More Work</span>
              <div className="flex items-center gap-2 flex-wrap">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border transition-all duration-200"
                    style={
                      activeTag === tag
                        ? { color: 'var(--bb-teal)', borderColor: 'rgba(42,140,122,0.5)', background: 'rgba(42,140,122,0.1)' }
                        : { color: 'var(--fg-subtle)', borderColor: 'var(--border)', background: 'transparent' }
                    }
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item, i) => (
                <ClientCard key={item.name} item={item} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-[var(--fg-subtle)] font-mono text-sm py-12">No projects with that tag yet.</p>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 sm:py-36 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <h2
                className="font-display font-black leading-[0.9] tracking-[-0.03em] text-[var(--fg)]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                Your project<br />
                <span className="text-bb-teal">could be next.</span>
              </h2>
              <p className="text-base sm:text-lg text-[var(--fg-muted)] max-w-sm leading-relaxed">
                SaaS, websites, mobile apps, Shopify — whatever you&apos;re building, we&apos;ve probably built something harder.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base tracking-wide bg-bb-teal text-white hover:brightness-110 transition-all duration-300"
                style={{ boxShadow: '0 0 28px rgba(42,140,122,0.35)' }}
              >
                Start a Project
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base tracking-wide glass glow-border text-[var(--fg)] hover:text-bb-teal transition-all duration-300"
              >
                See Our Products
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
