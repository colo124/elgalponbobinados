import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Zilla_Slab } from 'next/font/google'
import './globals.css'
import { FloatingWhatsapp } from '@/components/floating-whatsapp'
import { site } from '@/lib/site'

const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const zilla = Zilla_Slab({
  variable: '--font-zilla',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#211f1a',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Galpón Bobinados | Motores eléctricos en Tandil',
    template: '%s | Galpón Bobinados',
  },
  description:
    'Bobinado y reparación de motores eléctricos, bombas de agua y bombas de pileta en Tandil. Diagnóstico técnico, presupuesto claro y atención personalizada.',
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'Servicio técnico industrial',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: '/',
    siteName: site.name,
    title: 'Galpón Bobinados | Motores eléctricos en Tandil',
    description:
      'Bobinado y reparación de motores eléctricos, bombas de agua y bombas de pileta en Tandil.',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Técnico trabajando en el bobinado de un motor eléctrico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galpón Bobinados | Motores eléctricos en Tandil',
    description:
      'Bobinado y reparación de motores eléctricos, bombas de agua y bombas de pileta en Tandil.',
    images: ['/images/og-home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'u50YRgVruYHyMnTMW-QjkCT5JERJnV2vcdlv_fk93ak',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${hanken.variable} ${zilla.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#contenido-principal">
          Saltar al contenido principal
        </a>
        {children}
        <FloatingWhatsapp />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
