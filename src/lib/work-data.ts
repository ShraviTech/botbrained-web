export interface WorkItem {
  name: string
  url: string
  tags: string[]
  type: 'client' | 'product'
  status?: 'live' | 'stealth'
  featured?: boolean
  headline: string
  description: string
  highlights: string[]
}

export const clientProjects: WorkItem[] = [
  {
    name: 'Fisique.Fitness',
    url: 'https://fisique.fitness',
    tags: ['Full-Stack', 'SaaS'],
    type: 'client',
    featured: true,
    headline: 'Fitness SaaS, built from the ground up.',
    description:
      'End-to-end gym management platform — member portal, lead pipeline, biometric attendance via fingerprint reader, and a desktop bridge agent. Multi-tenant, real-time, and built to scale across franchise locations.',
    highlights: [
      'Member & lead management portal',
      'Biometric fingerprint attendance',
      'Desktop bridge for ESSL hardware',
      'Multi-gym, multi-role architecture',
    ],
  },
  {
    name: 'Merme.in',
    url: 'https://merme.in',
    tags: ['Web'],
    type: 'client',
    featured: true,
    headline: 'A web presence that converts.',
    description:
      "Custom web experience designed and built for conversion. Clean, fast, and built around the brand's identity — not a template.",
    highlights: [
      'Custom design system',
      'Performance-first build',
      'Mobile-first responsive',
      'SEO optimised',
    ],
  },
  {
    name: 'ShraviTech',
    url: 'https://shravitech.pages.dev',
    tags: ['Full-Stack', 'Tech Partner'],
    type: 'client',
    headline: 'Their full tech team. Us.',
    description:
      'End-to-end technology partnership — from product strategy and architecture reviews to deployment and ongoing engineering. We own the stack so they can focus on the business.',
    highlights: [
      'Product strategy & roadmapping',
      'Full-stack web & mobile',
      'Cloudflare + Supabase infra',
      'Ongoing engineering partnership',
    ],
  },
  {
    name: 'Bhaat.in',
    url: 'https://bhaat.in',
    tags: ['Web'],
    type: 'client',
    headline: 'Brand meets digital.',
    description:
      'Brand identity translated into a polished digital presence. Every pixel intentional.',
    highlights: [
      'Brand identity integration',
      'Custom UI components',
      'Fast load times',
      'Responsive across all devices',
    ],
  },
  {
    name: 'Laasena.com',
    url: 'https://laasena.com',
    tags: ['Web'],
    type: 'client',
    headline: 'Scale-ready from day one.',
    description:
      'Custom web experience built to handle growth. Clean architecture, fast delivery.',
    highlights: [
      'Custom web experience',
      'Growth-ready architecture',
      'Performance optimised',
      'Brand-aligned design',
    ],
  },
]

export const productProjects: WorkItem[] = [
  {
    name: 'TapVerifi',
    url: 'https://tapverifi.com',
    tags: ['SaaS'],
    type: 'product',
    status: 'live',
    headline: 'Phone verification via WhatsApp.',
    description:
      'WhatsApp-based phone verification at ₹0.25 per verification — a fraction of the cost of OTP SMS. Drop-in for any product that needs to verify users without the telco markup.',
    highlights: [
      'WhatsApp OTP delivery',
      '₹0.25 per verification',
      'Simple API integration',
      'Cheaper than SMS OTP',
    ],
  },
  {
    name: 'LeadVoice',
    url: 'https://leadvoice.botbrained.com',
    tags: ['AI'],
    type: 'product',
    status: 'live',
    headline: 'Your AI closer, 24/7.',
    description:
      'Voice AI agent that qualifies inbound leads, handles objections, books discovery calls, and runs outbound campaigns — all without a sales team on call. Built on custom LLMs and real-time voice synthesis.',
    highlights: [
      'Inbound & outbound voice calling',
      'Custom LLM qualification logic',
      'CRM integration & call logging',
      'Real-time voice synthesis',
    ],
  },
  {
    name: 'WhaBuzz',
    url: 'https://whabuzz.com',
    tags: ['Platform'],
    type: 'product',
    status: 'live',
    headline: 'WhatsApp, supercharged.',
    description:
      'Broadcast, automate, and convert at scale on WhatsApp. Built for growth teams running high-volume campaigns, drip sequences, and conversational flows without touching code.',
    highlights: [
      'Bulk broadcast campaigns',
      'Automated drip sequences',
      'Conversational flow builder',
      'Analytics & delivery tracking',
    ],
  },
]
