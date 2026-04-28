import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using BotBrained services.',
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--fg-subtle)] mb-12">
          Last updated: April 2026
        </p>

        <div className="space-y-10 text-[var(--fg-muted)] leading-relaxed">

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">1. Acceptance of terms</h2>
            <p>By accessing botbrained.com or engaging BotBrained for services, you agree to these terms. If you do not agree, please do not use this site or our services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">2. Services</h2>
            <p>BotBrained provides custom software development, consulting, and related technical services. Specific deliverables, timelines, and payment terms for any engagement are governed by a separate written agreement (SOW or contract) between BotBrained and the client.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">3. Intellectual property</h2>
            <p>Unless otherwise agreed in writing, all code, designs, and deliverables produced by BotBrained for a client become the client&apos;s property upon receipt of full payment. BotBrained retains the right to display completed work in its portfolio unless explicitly requested otherwise.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">4. Payment</h2>
            <p>Payment terms are as specified in individual project agreements. BotBrained reserves the right to pause or withhold delivery in the event of non-payment. Deposits are non-refundable unless BotBrained is unable to deliver the agreed scope.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">5. Limitation of liability</h2>
            <p>BotBrained&apos;s total liability for any claim arising from its services shall not exceed the total fees paid by the client in the three months preceding the claim. We are not liable for indirect, incidental, or consequential damages.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">6. Confidentiality</h2>
            <p>Both parties agree to keep confidential any non-public information shared during an engagement. This obligation survives termination of the engagement for a period of two years.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">7. Website use</h2>
            <p>This website is provided for informational purposes. You may not use it to transmit unlawful, harmful, or misleading content. We reserve the right to block access at our discretion.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">8. Governing law</h2>
            <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">9. Changes</h2>
            <p>We may revise these terms at any time. The updated date at the top of this page reflects the latest version. Continued use of our services constitutes acceptance of the revised terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-[var(--fg)]">10. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:info@botbrained.com" className="text-bb-teal hover:underline">info@botbrained.com</a>.</p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
