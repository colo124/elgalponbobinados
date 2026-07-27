import Link from 'next/link'
import { Logo } from './logo'
import { site } from '@/lib/site'
import { servicesPages } from '@/lib/services-data'

export function SiteFooter() {
  return (
    <footer className="bg-dark-section py-14 md:py-16 text-dark-section-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center md:px-6">
        <Logo />

        <nav aria-label="Servicios" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {servicesPages.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="text-xs text-background/70 transition-colors hover:text-primary"
            >
              {s.h1}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-background/60">
          © {new Date().getFullYear()} {site.name}. Bobinado y reparación de
          motores eléctricos en {site.city}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
