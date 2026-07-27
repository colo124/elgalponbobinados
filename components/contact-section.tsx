import { Phone, Mail, Globe, MapPin } from 'lucide-react'
import { site } from '@/lib/site'
import { WhatsappButton } from './whatsapp-button'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const mapSrc =
  'https://www.google.com/maps?q=Santamarina+261,+Tandil,+Buenos+Aires,+Argentina&output=embed'

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="grid md:grid-cols-2"
    >
      {/* Contacto */}
      <div className="bg-[oklch(0.55_0.06_45)] px-4 py-14 text-background md:px-10 md:py-16">
        <div className="mx-auto max-w-md">
          <h2
            id="contacto-heading"
            className="font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl"
          >
            Contacto
          </h2>
          <span className="mt-3 block h-1 w-16 bg-primary" aria-hidden="true" />

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <a
                href={`tel:+${site.phoneIntl}`}
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <Phone className="size-5 shrink-0 text-primary" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <Mail className="size-5 shrink-0 text-primary" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.url}
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <Globe className="size-5 shrink-0 text-primary" aria-hidden="true" />
                www.galponbobinados.com.ar
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <InstagramIcon className="size-5 shrink-0 text-primary" />
                /{site.instagram}
              </a>
            </li>
            <li>
              <a
                href={`https://facebook.com/${site.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-primary"
              >
                <FacebookIcon className="size-5 shrink-0 text-primary" />
                /{site.facebook}
              </a>
            </li>
          </ul>

          <div className="mt-8">
            <WhatsappButton />
          </div>
        </div>
      </div>

      {/* Mapa / ubicación */}
      <div className="bg-secondary px-4 py-14 md:px-10 md:py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
            ¿Dónde estamos?
          </h2>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="size-4 text-primary" aria-hidden="true" />
            {site.address}, {site.city}
          </p>

          <div className="mt-6 overflow-hidden rounded-lg ring-1 ring-border">
            <iframe
              title="Ubicación de Galpón Bobinados en Santamarina 261, Tandil"
              src={mapSrc}
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-foreground">
            {site.hoursNote}
          </p>
        </div>
      </div>
    </section>
  )
}
