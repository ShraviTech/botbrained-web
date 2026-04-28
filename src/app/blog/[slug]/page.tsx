import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getBlogPost, getAllSlugs, formatDate } from '@/lib/blog'

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — BotBrained`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }} className="min-h-screen">
      <Navbar />

      <article className="pt-28">
        {/* Back link */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 mb-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-mono tracking-wide text-[var(--fg-subtle)] hover:text-bb-teal transition-colors duration-200"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
            All posts
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-5 sm:px-8 mb-12">
          <div className="flex items-center gap-3 mb-6 text-[var(--fg-subtle)]">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase">
              {formatDate(post.published_at)}
            </span>
            {post.reading_time_minutes && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.25em] uppercase">
                  <Clock size={11} />
                  {post.reading_time_minutes} min read
                </span>
              </>
            )}
          </div>

          <h1
            className="font-display font-black leading-[0.92] tracking-[-0.03em] text-[var(--fg)] mb-6"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg sm:text-xl text-[var(--fg-muted)] leading-relaxed border-l-2 border-bb-teal pl-5">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Featured image */}
        {post.featured_image && (
          <div className="max-w-4xl mx-auto px-5 sm:px-8 mb-14">
            <div className="relative w-full h-[40vh] sm:h-[50vh] rounded-2xl overflow-hidden border border-[var(--border)]">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-24">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <div className="mt-16 pt-10 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-mono tracking-wide text-[var(--fg-subtle)] hover:text-bb-teal transition-colors duration-200"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Back to all posts
            </Link>

            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm tracking-wide bg-bb-teal text-white hover:brightness-110 transition-all duration-300"
              style={{ boxShadow: '0 0 20px rgba(42,140,122,0.3)' }}
            >
              Work with us
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
