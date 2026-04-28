import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How BotBrained collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }} className="min-h-screen">
      <Navbar />
      <main className="max-w-3xl mx-auto px-5 sm:px-8 pt-32 pb-24">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-mono tracking-wide text-[var(--fg-subtle)] hover:text-bb-teal transition-colors duration-200 mb-10"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to home
        </Link>

        <h1 className="font-display font-black text-4xl sm:text-5xl tracking-[-0.03em] text-[var(--fg)] mb-2">
          Privacy Policy
        </h1>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-subtle)] mb-12">
          Last updated: April 2026
        </p>

        <div className="prose-section space-y-10 text-[var(--fg-muted)] leading-relaxed">

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">1. Who we are</h2>
            <p>BotBrained is a software development studio and a brand of ShraviTech. We build web apps, SaaS products, mobile apps, and AI-powered tools for clients worldwide. Our registered contact email is <a href="mailto:info@botbrained.com" className="text-bb-teal hover:underline">info@botbrained.com</a>.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">2. Information we collect</h2>
            <p>When you use our contact form we collect your name, WhatsApp number, and the message you submit. We do not collect any other personal data automatically through this website. We do not use cookies beyond what is strictly necessary.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">3. How we use your information</h2>
            <p>Contact form submissions are used solely to respond to your enquiry. We will not add you to any mailing list, sell your data, or share it with third parties except where required by law.</p>

          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">4. Third-party services</h2>
            <p>This site uses <strong>Resend</strong> to deliver contact form emails. Submitted data passes through Resend&apos;s infrastructure solely for email delivery. We use <strong>Cloudflare</strong> for hosting and DDoS protection — Cloudflare may log request metadata per their own privacy policy.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">5. Data retention</h2>
            <p>Contact form data is retained only as long as needed to respond to your enquiry, typically no longer than 90 days unless an ongoing engagement requires it.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">6. Your rights</h2>
            <p>You may request access to, correction of, or deletion of any personal data we hold about you by emailing <a href="mailto:info@botbrained.com" className="text-bb-teal hover:underline">info@botbrained.com</a>. We will respond within 30 days.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">7. Changes to this policy</h2>
            <p>We may update this policy from time to time. The date at the top of this page will reflect the latest revision. Continued use of the site after changes constitutes acceptance.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">8. Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:info@botbrained.com" className="text-bb-teal hover:underline">info@botbrained.com</a>.</p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
