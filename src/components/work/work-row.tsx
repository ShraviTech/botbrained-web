'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { BrowserFrame } from '@/components/work/browser-frame'
import type { WorkItem } from '@/lib/work-data'

export function WorkRow({ item, index }: { item: WorkItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const isImageLeft = index % 2 === 0

  return (
    <div ref={ref} className="border-b border-[var(--border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Screenshot */}
          <motion.div
            className={isImageLeft ? 'lg:order-1' : 'lg:order-2'}
            initial={{ scale: 1.12, opacity: 0, filter: 'blur(10px)' }}
            animate={inView ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrowserFrame
              url={item.url}
              title={item.name}
              tags={item.tags}
              description={item.description}
              className="h-[50vh]"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            className={`flex flex-col gap-5 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: isImageLeft ? 48 : -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge row */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--fg-subtle)] uppercase">
                {item.type === 'client' ? 'Client Work' : 'Product'}
              </span>
              {item.status && (
                <span
                  className="font-mono text-[10px] tracking-[0.15em] uppercase flex items-center gap-1.5"
                  style={{ color: item.status === 'live' ? 'var(--bb-teal)' : 'var(--fg-muted)' }}
                >
                  <span>{item.status === 'live' ? '●' : '○'}</span>
                  {item.status}
                </span>
              )}
            </div>

            {/* Headline */}
            <h2
              className="font-display font-black leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--fg)' }}
            >
              {item.headline}
            </h2>

            {/* Tagline */}
            <span
              className="font-mono text-xs tracking-[0.15em] uppercase"
              style={{ color: 'var(--bb-teal)' }}
            >
              {item.name} · {item.tags.join(', ')}
            </span>

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {item.description}
            </p>

            {/* Highlights */}
            <ul className="flex flex-col gap-2 mt-1">
              {item.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--fg-muted)' }}>
                  <span className="shrink-0 mt-0.5 font-mono" style={{ color: 'var(--bb-teal)' }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.18em] uppercase border"
                  style={{
                    borderColor: 'rgba(42,140,122,0.3)',
                    color: 'var(--bb-teal)',
                    background: 'rgba(42,140,122,0.08)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group self-start inline-flex items-center gap-2 mt-2 text-sm font-semibold transition-colors duration-200"
              style={{ color: 'var(--bb-teal)' }}
            >
              {item.url.replace('https://', '')}
              <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
