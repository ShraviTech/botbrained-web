import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero/hero'
import { Services } from '@/components/sections/services'
import { Work } from '@/components/sections/work'
import { Education } from '@/components/sections/education'
import { Consulting } from '@/components/sections/consulting'
import { Team } from '@/components/sections/team'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Education />
      <Consulting />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}
