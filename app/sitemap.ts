import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { servicesPages } from '@/lib/services-data'

const LAST_UPDATED = new Date('2026-07-26T00:00:00-03:00')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${site.url}/images/og-home.jpg`],
    },
    ...servicesPages.map((service) => ({
      url: `${site.url}/${service.slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${site.url}/images/og-${service.slug}.jpg`],
    })),
  ]
}
