import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { MissionSection } from '@/components/mission-section'
import { ServicesSection } from '@/components/services-section'
import { WhyUsSection } from '@/components/why-us-section'
import { FaqSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import { StructuredData } from '@/components/structured-data'

export default function Page() {
  return (
    <>
      <StructuredData />
      <SiteHeader />
      <main id="contenido-principal">
        <Hero />
        <MissionSection />
        <ServicesSection />
        <WhyUsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
