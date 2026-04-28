import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Space_Grotesk, Bebas_Neue } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NoiseOverlay } from '@/components/noise-overlay'
import { Cursor } from '@/components/cursor'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'BotBrained — Web, App & AI Development',
    template: '%s — BotBrained',
  },
  description:
    'We build Shopify storefronts, custom SaaS platforms, mobile apps, and AI-powered products. Fast, opinionated, and built to last. A ShraviTech brand.',
  keywords: [
    'web development',
    'app development',
    'Shopify development',
    'SaaS development',
    'AI development',
    'Flutter apps',
    'voice agents',
    'AI education',
    'enterprise AI',
    'BotBrained',
    'ShraviTech',
  ],
  authors: [{ name: 'Smaran Challapalli' }],
  creator: 'BotBrained',
  metadataBase: new URL('https://botbrained.com'),
  openGraph: {
    title: 'BotBrained — Web, App & AI Development',
    description:
      'We build Shopify storefronts, custom SaaS platforms, mobile apps, and AI-powered products. Fast, opinionated, and built to last.',
    type: 'website',
    url: 'https://botbrained.com',
    siteName: 'BotBrained',
    images: [
      {
        url: '/og.png',
        width: 1456,
        height: 816,
        alt: 'BotBrained — Web, App & AI Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BotBrained — Web, App & AI Development',
    description: 'We build Shopify storefronts, custom SaaS, mobile apps, and AI products.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.webp',
    shortcut: '/favicon.webp',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'BotBrained',
  url: 'https://botbrained.com',
  logo: 'https://botbrained.com/assets/BotBrained_Logo.png',
  description:
    'We build Shopify storefronts, custom SaaS platforms, mobile apps, and AI-powered products. Fast, opinionated, and built to last.',
  founder: { '@type': 'Person', name: 'Smaran Challapalli' },
  sameAs: ['https://www.linkedin.com/company/botbrained'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <NoiseOverlay />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
