const SUPABASE_URL = 'https://qjznfydjmknwcmjscpgp.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqem5meWRqbWtud2NtanNjcGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODI4NzIsImV4cCI6MjA4MTM1ODg3Mn0.SPggWVfW1BJ7ZtmToWp6mdT-fp6TZwkTyeo9T1vj-u8'

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string | null
  author_id: string
  category_id: string | null
  status: string
  published_at: string
  reading_time_minutes: number
  created_at: string
  updated_at: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,excerpt,featured_image,published_at,reading_time_minutes&status=eq.published&order=published_at.desc`,
    { headers, next: { revalidate: 3600 } },
  )
  if (!res.ok) return []
  return res.json()
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`,
    { headers, next: { revalidate: 3600 } },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data[0] ?? null
}

export async function getAllSlugs(): Promise<string[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?select=slug&status=eq.published`,
    { headers, next: { revalidate: 3600 } },
  )
  if (!res.ok) return []
  const data: { slug: string }[] = await res.json()
  return data.map(d => d.slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
