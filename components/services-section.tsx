import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { servicesPages } from '@/lib/services-data'

export function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2
          id="servicios-heading"
          className="text-center font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl"
        >
          Servicios
        </h2>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {servicesPages.map((service) => {
            const Icon = service.icon
            return (
              <li
                key={service.slug}
                className="service-card flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border"
              >
                <Link href={`/${service.slug}`} className="group flex flex-1 flex-col">
                  <div className="flex justify-center pt-6">
                    <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-foreground">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="relative mx-5 mt-4 aspect-[4/3] overflow-hidden rounded-lg bg-neutral-950">
                    <Image
                      src={service.heroImage}
                      alt={service.h1}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-sm font-bold uppercase leading-tight tracking-wide text-foreground">
                      {service.h1}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.heroSubtitle}
                    </p>
                    <span className="mt-auto pt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      Ver más
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
