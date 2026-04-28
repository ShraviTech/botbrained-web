'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Code2,
  Layers,
  Lightbulb,
  GraduationCap,
  Mic2,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  index: string
  icon: LucideIcon
  name: string
  tag: string
  description: string
}

const SERVICES: Service[] = [
  {
    index: '01',
    icon: Lightbulb,
    name: 'Tech Consulting',
    tag: 'STRATEGY',
    description: 'Architecture reviews, product direction, strategic roadmaps. We\'ve seen what breaks at scale. Confidential by default.',
  },
  {
    index: '02',
    icon: Mic2,
    name: 'Voice Agents',
    tag: 'AI',
    description: 'Custom voice AI that handles calls, qualifies leads, books appointments, and never takes a day off. Integrated with your stack.',
  },
  {
    index: '03',
    icon: Layers,
    name: 'Custom SaaS',
    tag: 'SYSTEMS',
    description: 'End-to-end systems at any scale — CRMs, fitness platforms, dating apps, enterprise tools. We own the stack.',
  },
  {
    index: '04',
    icon: Code2,
    name: 'Bespoke Websites',
    tag: 'CROSS-PLATFORM',
    description: 'From marketing websites to Flutter apps — cross-platform, pixel-perfect, built to last on every device.',
  },
  {
    index: '05',
    icon: ShoppingBag,
    name: 'Custom Shopify Stores',
    tag: 'E-COMMERCE',
    description: 'Bespoke storefronts that convert. Zero templates, zero compromises. Headless or native — built for your brand.',
  },
  {
    index: '06',
    icon: GraduationCap,
    name: 'AI Education',
    tag: 'LIVE CLASSES',
    description: 'Live only — 90-min intensives or multi-week cohorts. Hands-on, no fluff. You leave with working code.',
  },
]

function ServiceRow({ service, delay }: { service: Service; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group border-b border-[var(--border)] cursor-default overflow-hidden"
      style={{
        transition: 'background 0.2s ease',
        background: hovered ? 'rgba(42,140,122,0.04)' : 'transparent',
      }}
    >
      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 font-display font-black leading-none select-none pointer-events-none"
        style={{ fontSize: 'clamp(5rem, 14vw, 10rem)', color: 'var(--fg)', opacity: hovered ? 0.06 : 0.03, transition: 'opacity 0.2s ease' }}
      >
        {service.index}
      </span>

      {/* Main row */}
      <div className="relative flex items-center gap-4 sm:gap-8 px-4 sm:px-8 py-6 sm:py-8">
        <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--fg-subtle)] shrink-0 w-8">
          {service.index}
        </span>

        <div
          className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? 'rgba(42,140,122,0.18)' : 'rgba(42,140,122,0.08)',
            border: `1px solid ${hovered ? 'rgba(42,140,122,0.4)' : 'rgba(42,140,122,0.15)'}`,
          }}
        >
          <Icon
            size={18}
            strokeWidth={1.75}
            style={{ color: 'var(--bb-teal)', transition: 'transform 0.3s ease', transform: hovered ? 'scale(1.15)' : 'scale(1)' }}
          />
        </div>

        <h3
          className="flex-1 font-display font-black tracking-[-0.02em] transition-colors duration-200"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
            lineHeight: 1,
            color: hovered ? 'var(--bb-teal)' : 'var(--fg)',
          }}
        >
          {service.name}
        </h3>

        <span className="hidden sm:block font-mono text-[10px] tracking-[0.22em] text-[var(--fg-subtle)] shrink-0">
          {service.tag}
        </span>

        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          style={{
            color: hovered ? 'var(--bb-teal)' : 'var(--fg-subtle)',
            transition: 'color 0.2s ease, transform 0.2s ease',
            transform: hovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Expandable description */}
      <motion.div
        initial={false}
        animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p className="relative px-4 sm:px-8 pb-6 pl-[calc(1rem+2rem+2.5rem)] sm:pl-[calc(2rem+2.5rem+3rem)] text-sm sm:text-base text-[var(--fg-muted)] max-w-2xl leading-relaxed">
          {service.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg)' }}
      aria-label="Services"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        {/* Minimal eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">
            01 / SERVICES
          </span>
          <span className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <div className="border-t border-[var(--border)]">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.index} service={service} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
