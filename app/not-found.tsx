import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenido-principal" className="flex min-h-[70vh] items-center bg-background px-4 pb-20 pt-36">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-[.2em] text-primary">Error 404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold uppercase text-foreground md:text-5xl">
            Página no encontrada
          </h1>
          <p className="mt-5 text-muted-foreground">
            La dirección que ingresaste no existe o fue modificada.
          </p>
          <Link href="/" className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            Volver al inicio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
