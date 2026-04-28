'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [state, setState] = useState<'idle' | 'submitting' | 'done'>('idle')
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.phone.trim()) e.phone = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setState('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setState('done')
    } catch {
      setState('idle')
      setErrors({ message: 'Something went wrong. Please try WhatsApp instead.' })
    }
  }

  const inputBase = "w-full px-4 py-3 rounded-xl text-sm font-body text-[var(--fg)] placeholder:text-[var(--fg-subtle)] bg-[var(--bg-card)] border border-[var(--border)] focus:outline-none focus:border-bb-teal transition-colors duration-200"

  return (
    <section
      id="contact"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
      aria-label="Contact"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px 0px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">
                07 / CONTACT
              </span>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display font-black leading-[0.9] tracking-[-0.03em] text-[var(--fg)]"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
            >
              Let&apos;s talk<br />
              <span className="text-bb-teal">business.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[var(--fg-muted)] leading-relaxed max-w-sm">
              Drop a message and the team will reply within 24 hours. Or skip the form entirely.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="https://wa.me/918099066799"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 w-fit"
            >
              <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(42,140,122,0.15)', border: '1px solid rgba(42,140,122,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-bb-teal" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-[var(--fg-muted)] group-hover:text-bb-teal transition-colors duration-200">
                WhatsApp the team directly
              </span>
              <ArrowRight size={14} className="text-[var(--fg-subtle)] group-hover:text-bb-teal group-hover:translate-x-1 transition-all duration-200" />
            </motion.a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {state === 'done' ? (
              <div className="flex flex-col items-center text-center gap-5 py-16">
                <CheckCircle2 size={48} className="text-bb-teal" strokeWidth={1.5} />
                <h3 className="font-display font-black text-2xl text-[var(--fg)]">We&apos;ll be in touch.</h3>
                <p className="text-[var(--fg-muted)] text-sm max-w-xs leading-relaxed">
                  The team will reach out within 24 hours. Keep an eye on your WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-subtle)]">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Rahul Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputBase}
                    style={errors.name ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                  />
                  {errors.name && <span className="text-xs text-red-400 font-mono">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-phone" className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-subtle)]">
                    WhatsApp Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputBase}
                    style={errors.phone ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                  />
                  {errors.phone && <span className="text-xs text-red-400 font-mono">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--fg-subtle)]">
                    What are you building?
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="We need a booking platform for our gym chain across 8 cities..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputBase + ' resize-none'}
                    style={errors.message ? { borderColor: 'rgba(239,68,68,0.6)' } : {}}
                  />
                  {errors.message && <span className="text-xs text-red-400 font-mono">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-bb-teal text-white hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 mt-2"
                  style={{ boxShadow: 'var(--glow-md)' }}
                >
                  {state === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
