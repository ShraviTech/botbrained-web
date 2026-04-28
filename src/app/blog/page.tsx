import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getBlogPosts, formatDate, type BlogPost } from '@/lib/blog'

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const isFeatured = index === 0

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col border border-[var(--border)] hover:border-[var(--border-strong)] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[0_0_32px_rgba(42,140,122,0.12)] ${isFeatured ? 'md:col-span-2' : ''}`}
      style={{ background: 'var(--bg-card)' }}
    >
      {/* Image */}
      {post.featured_image && (
        <div className={`relative overflow-hidden shrink-0 ${isFeatured ? 'h-64 sm:h-80' : 'h-44'}`}>
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <div className="flex items-center gap-3 text-[var(--fg-subtle)]">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
            {formatDate(post.published_at)}
          </span>
          {post.reading_time_minutes && (
            <>
              <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
              <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] uppercase">
                <Clock size={10} />
                {post.reading_time_minutes} min read
              </span>
            </>
          )}
        </div>

        <h2
          className={`font-display font-black leading-[1.0] tracking-[-0.02em] text-[var(--fg)] group-hover:text-bb-teal transition-colors duration-200 ${isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-sm text-[var(--fg-muted)] leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-sm font-semibold text-bb-teal group-hover:gap-2.5 transition-all duration-200 mt-auto pt-2">
          Read more
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }} className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--fg-subtle)]">Blog</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-bb-teal">{posts.length} articles</span>
            </div>

            <h1
              className="font-display font-black leading-[0.88] tracking-[-0.04em] text-[var(--fg)]"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
            >
              Thinking<br />
              <span className="text-bb-teal">Out Loud.</span>
            </h1>

            <p className="text-base sm:text-xl text-[var(--fg-muted)] max-w-xl leading-relaxed">
              AI education, practical guides, and honest takes on where the technology is actually going.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--fg-subtle)] font-mono text-sm py-20">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
