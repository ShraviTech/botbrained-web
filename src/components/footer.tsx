'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, ExternalLink, ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Consulting', href: '#consulting' },
  { label: 'Contact', href: '#contact' },
]

const products = [
  { label: 'TapVerifi', href: 'https://tapverifi.com', external: true },
  { label: 'LeadVoice', href: 'https://leadvoice.botbrained.com', external: true },
  { label: 'WhaBuzz', href: 'https://whabuzz.com', external: true },
]

const socials = [
  {
    label: 'X / Twitter',
    href: 'https://x.com/botbrained',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/botbrained',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/botbrained',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

// Animated link with teal underline slide-in
function FooterLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'group inline-flex items-center gap-1 text-sm font-body text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200 relative',
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-px left-0 w-0 h-px bg-bb-teal group-hover:w-full transition-all duration-300 ease-out" />
      </span>
      {external && (
        <ArrowUpRight
          size={13}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-bb-teal flex-shrink-0"
        />
      )}
    </a>
  )
}

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <footer
      ref={ref}
      className="relative border-t border-[var(--border)] bg-[var(--bg)] overflow-hidden"
    >
      {/* Subtle background orb */}
      <div
        className="orb w-96 h-96 bg-bb-teal absolute -bottom-32 -left-24 pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12 border-b border-[var(--border)]">
          {/* Column 1: Logo + tagline + socials */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {/* Logo with subtle glow */}
            <div className="relative w-fit">
              <div
                className="absolute inset-0 blur-2xl opacity-30 bg-bb-teal rounded-full scale-150"
                aria-hidden="true"
              />
              <Logo size="lg" className="relative" />
            </div>

            <p className="text-sm font-body text-[var(--fg-muted)] leading-relaxed max-w-[260px]">
              The build arm of ShraviTech. We ship world-class web apps, AI pipelines,
              and SaaS products.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-[var(--fg-subtle)] hover:text-bb-teal hover:bg-[var(--border)] transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* ShraviTech badge */}
            <a
              href="https://shravitech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] glow-border w-fit group transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bb-teal animate-pulse" aria-hidden="true" />
              <span className="text-xs font-body font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors duration-200">
                A ShraviTech Brand
              </span>
              <ExternalLink
                size={11}
                className="text-[var(--fg-subtle)] group-hover:text-bb-teal transition-colors duration-200"
              />
            </a>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h3 className="text-xs font-display font-semibold tracking-widest uppercase text-[var(--fg-subtle)]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Products */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h3 className="text-xs font-display font-semibold tracking-widest uppercase text-[var(--fg-subtle)]">
              Products
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {products.map((product) => (
                <li key={product.label}>
                  <FooterLink href={product.href} external={product.external}>
                    {product.label}
                  </FooterLink>
                </li>
              ))}
            </ul>

            {/* Mini CTA */}
            <div className="mt-4 p-4 rounded-xl glass glow-border">
              <p className="text-xs font-body text-[var(--fg-muted)] mb-3 leading-relaxed">
                Ready to build something exceptional?
              </p>
              <a
                href="#consulting"
                className="inline-flex items-center gap-1.5 text-xs font-semibold font-body text-bb-teal hover:text-bb-teal-light transition-colors duration-200 group"
              >
                Start a project
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
        >
          <p className="text-xs font-body text-[var(--fg-subtle)] order-2 sm:order-1">
            &copy; {new Date().getFullYear()} BotBrained. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 sm:order-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-xs font-body text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {resolvedTheme === 'dark' ? (
                  <><Sun size={13} /><span>Light</span></>
                ) : (
                  <><Moon size={13} /><span>Dark</span></>
                )}
              </button>
            )}

            <a
              href="/privacy"
              className="text-xs font-body text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-xs font-body text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors duration-200"
            >
              Terms
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
