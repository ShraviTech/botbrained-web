'use client'

import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  url: string
  title: string
  description?: string
  tags?: string[]
  className?: string
}

function gradientAngle(url: string): number {
  let hash = 0
  for (let i = 0; i < url.length; i++) hash = (hash * 31 + url.charCodeAt(i)) >>> 0
  return (hash % 120) + 210
}

export function BrowserFrame({ url, title, description, tags, className }: BrowserFrameProps) {
  const domain = new URL(url).hostname.replace('www.', '')
  const angle = gradientAngle(url)
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        if (!cancelled && data.status === 'success' && data.data?.screenshot?.url) {
          setScreenshotUrl(data.data.screenshot.url)
        }
      })
      .catch(() => {})
      .finally(() => {
        clearTimeout(timeout)
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
      controller.abort()
      clearTimeout(timeout)
    }
  }, [url])

  return (
    <div className={cn('flex flex-col rounded-xl overflow-hidden border border-[var(--border)] group', className)}>
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[var(--bg-card)] border-b border-[var(--border)] shrink-0">
        <div className="flex gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-70" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-70" />
          <span className="w-3 h-3 rounded-full bg-[#28C840] opacity-70" />
        </div>
        <div className="flex-1 mx-2 px-3 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center gap-2 min-w-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 text-[var(--fg-subtle)]">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <span className="font-mono text-[10px] text-[var(--fg-muted)] truncate tracking-wide">{domain}</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[var(--fg-subtle)] hover:text-bb-teal transition-colors"
          onClick={e => e.stopPropagation()}
          aria-label={`Open ${title}`}
        >
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Content */}
      <div className="relative flex-1 overflow-hidden">
        {loading ? (
          /* Skeleton shimmer */
          <div className="absolute inset-0 animate-pulse" style={{ background: 'var(--bg-secondary)' }}>
            <div className="absolute inset-0 opacity-30"
              style={{ background: `linear-gradient(${angle}deg, rgba(42,140,122,0.3) 0%, transparent 60%)` }} />
          </div>
        ) : screenshotUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshotUrl}
            alt={`Screenshot of ${title}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback designed card */
          <div className="absolute inset-0" style={{ background: 'var(--bg-secondary)' }}>
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{ background: `linear-gradient(${angle}deg, rgba(42,140,122,0.25) 0%, transparent 60%)` }} />
            <div className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(rgba(42,140,122,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10 flex flex-col justify-between h-full p-5">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase border"
                      style={{ borderColor: 'rgba(42,140,122,0.35)', color: 'var(--bb-teal)', background: 'rgba(42,140,122,0.1)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <h3 className="font-display font-black leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--fg)' }}>
                  {title}
                </h3>
                {description && (
                  <p className="text-xs text-[var(--fg-muted)] leading-relaxed line-clamp-2">{description}</p>
                )}
              </div>
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide hover:brightness-110 transition-all duration-300"
                style={{ background: 'var(--bb-teal)', color: 'white', boxShadow: '0 0 16px rgba(42,140,122,0.35)' }}
                onClick={e => e.stopPropagation()}>
                Visit Site <ExternalLink size={10} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
