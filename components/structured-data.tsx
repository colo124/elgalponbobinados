import { site, faqs } from '@/lib/site'

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function StructuredData() {
  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    image: `${site.url}/images/og-home.jpg`,
    logo: `${site.url}/images/logo-official.png`,
    url: site.url,
    telephone: `+${site.phoneIntl}`,
    email: site.email,
    priceRange: '$$',
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.province,
      addressCountry: 'AR',
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${site.address}, ${site.city}, ${site.province}, ${site.country}`,
    )}`,
    openingHoursSpecification: site.openingHours.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    areaServed: site.areasServed.map((name) => ({ '@type': 'City', name })),
    sameAs: [
      `https://www.instagram.com/${site.instagram}/`,
      `https://www.facebook.com/${site.facebook}/`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${site.phoneIntl}`,
      contactType: 'customer service',
      availableLanguage: ['Spanish'],
      areaServed: 'AR',
    },
    knowsAbout: [
      'Bobinado de motores eléctricos',
      'Reparación de motores trifásicos',
      'Reparación de motores monofásicos',
      'Reparación de bombas de agua',
      'Reparación de bombas de pileta',
      'Mantenimiento de motores eléctricos',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Galpón Bobinados',
      itemListElement: [
        'Bobinado y rebobinado de motores eléctricos monofásicos y trifásicos',
        'Reparación de motores eléctricos',
        'Reparación de bombas de agua y presurizadoras',
        'Reparación de bombas de pileta',
        'Diagnóstico técnico de motores',
        'Mantenimiento preventivo',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(businessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }} />
    </>
  )
}
