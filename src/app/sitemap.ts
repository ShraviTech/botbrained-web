import type { MetadataRoute } from 'next'
import { getAllSlugs, getBlogPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const BASE = 'https://botbrained.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,         lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/clients/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/products/`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog/`,    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/privacy/`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/terms/`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]

  try {
    const [slugs, posts] = await Promise.all([getAllSlugs(), getBlogPosts()])
    const postDates = Object.fromEntries(posts.map(p => [p.slug, p.published_at]))
    const blogRoutes: MetadataRoute.Sitemap = slugs.map(slug => ({
      url: `${BASE}/blog/${slug}/`,
      lastModified: postDates[slug] ? new Date(postDates[slug]) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
    return [...staticRoutes, ...blogRoutes]
  } catch {
    return staticRoutes
  }
}
