import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import type { ServicePageData } from '@/lib/services-data'
import { servicesPages } from '@/lib/services-data'
import { site } from '@/lib/site'
import { SiteHeader } from './site-header'
import { WhatsappButton } from './whatsapp-button'
import { SiteFooter } from './site-footer'

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function ServicePageContent({ data }: { data: ServicePageData }) {
  const Icon = data.icon
  const otherServices = servicesPages.filter((s) => s.slug !== data.slug)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: data.serviceSchemaName,
    name: data.serviceSchemaName,
    description: data.serviceSchemaDescription,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${site.url}/#business`,
      name: site.name,
      url: site.url,
      telephone: `+${site.phoneIntl}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address,
        addressLocality: site.city,
        addressRegion: site.province,
        addressCountry: 'AR',
      },
    },
    areaServed: site.areasServed.map((name) => ({ '@type': 'City', name })),
    url: `${site.url}/${data.slug}`,
    image: `${site.url}/images/og-${data.slug}.jpg`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.h1,
        item: `${site.url}/${data.slug}`,
      },
    ],
  }

  return (
    <>
      <SiteHeader />
      <main id="contenido-principal">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }} />


      {/* Hero oscuro: mismo sistema visual para las cuatro páginas */}
      <section className="relative isolate overflow-hidden bg-dark-section">
        <div className="absolute inset-0 -z-10">
          <Image
            src={data.heroImage}
            alt={data.h1}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" aria-hidden="true" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-32 md:px-6 md:pb-20 md:pt-36">
          <div className="mb-6 flex flex-wrap items-center gap-4 md:gap-5">
            <nav aria-label="Breadcrumb" className="min-w-0 text-xs text-background/70 md:text-sm">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link href="/" className="transition-colors hover:text-primary">Inicio</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-background/90">{data.h1}</li>
              </ol>
            </nav>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Icon className="size-6" aria-hidden="true" />
            </span>
          </div>

          <div className="max-w-3xl text-dark-section-foreground">
            <h1 className="max-w-2xl font-heading text-3xl font-bold uppercase leading-[1.08] tracking-tight text-balance sm:text-4xl md:text-5xl">
              {data.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-background/90 md:text-lg">
              {data.heroSubtitle}
            </p>
            <div className="mt-5 max-w-3xl space-y-3 text-sm leading-relaxed text-background/72">
              {data.intro.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Bloque principal en dos columnas, como la maqueta */}
      <section className="bg-[#e9e1cf]">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="px-6 py-14 md:px-12 md:py-16 lg:px-14">
            <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-3xl">
              {data.brandsTitle}
            </h2>
            <p className="mt-6 text-sm font-semibold leading-relaxed text-foreground/80">
              {data.brandsIntro}
            </p>
            <ul className="mt-7 space-y-4">
              {data.brands.map((brand) => (
                <li key={brand} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-[0.58rem] size-1.5 shrink-0 rounded-full bg-foreground/55" aria-hidden="true" />
                  <span>{brand}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#ddd5c7] px-6 py-14 md:px-12 md:py-16 lg:rounded-bl-xl lg:px-14">
            <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-3xl">
              {data.includesTitle}
            </h2>
            <div className="mt-7 divide-y divide-border/90 border-y border-border/90">
              {data.includes.map((item) => (
                <div key={item.title} className="py-4">
                  <h3 className="flex items-start gap-2 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                    <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p className="mt-1.5 pl-6 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fallas / motivos en grilla numerada */}
      <section className="bg-[#f4eee4] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mx-auto max-w-3xl text-center font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-foreground md:text-3xl">
            {data.commonIssuesTitle}
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {data.commonIssues.map((issue, i) => (
              <article key={i} className="text-center">
                <span className="mx-auto flex size-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{issue}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ sobre fondo oliva/gris, igual a la referencia */}
      <section aria-labelledby={`faq-${data.slug}-heading`} className="bg-[#9f9b89] py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 id={`faq-${data.slug}-heading`} className="text-center font-heading text-2xl font-bold uppercase tracking-tight text-[#353328] md:text-3xl">
            Preguntas frecuentes
          </h2>
          <div className="mx-auto mt-10 h-[3px] w-16 rounded-full bg-primary" aria-hidden="true" />
          <div className="mt-8 space-y-3">
            {data.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-md bg-white p-5 shadow-sm ring-1 ring-black/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                  {faq.question}
                  <span className="shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA conservado: no se elimina contenido */}
      <section className="bg-dark-section py-14 text-center text-dark-section-foreground md:py-16">
        <div className="mx-auto max-w-xl px-4 md:px-6">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight md:text-3xl">¿Necesitás este servicio?</h2>
          <p className="mt-3 text-sm text-background/80">Contanos qué problema tenés y te respondemos a la brevedad por WhatsApp.</p>
          <div className="mt-6 flex justify-center"><WhatsappButton /></div>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="bg-[#f4eee4] py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="text-center font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">Otros servicios</h2>
          <div className="mx-auto mt-4 h-[3px] w-14 rounded-full bg-primary" aria-hidden="true" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {otherServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="group flex h-full flex-col justify-between rounded-xl bg-card p-5 ring-1 ring-border transition-all hover:-translate-y-1 hover:ring-primary hover:shadow-lg">
                  <span className="font-heading text-sm font-bold uppercase leading-tight tracking-wide text-foreground">{s.h1}</span>
                  <span className="mt-3 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    Ver más
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      </main>
      <SiteFooter />
    </>
  )
}
