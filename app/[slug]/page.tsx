import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { servicesPages, getServiceBySlug } from '@/lib/services-data'
import { site } from '@/lib/site'
import { ServicePageContent } from '@/components/service-page-content'

export const dynamicParams = false

export function generateStaticParams() {
  return servicesPages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = getServiceBySlug(slug)

  if (!data) {
    return {}
  }

  const url = `${site.url}/${data.slug}`

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url,
      siteName: site.name,
      title: data.metaTitle,
      description: data.metaDescription,
      images: [
        {
          url: `/images/og-${data.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: data.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle,
      description: data.metaDescription,
      images: [`/images/og-${data.slug}.jpg`],
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = getServiceBySlug(slug)

  if (!data) {
    notFound()
  }

  return <ServicePageContent data={data} />
}
