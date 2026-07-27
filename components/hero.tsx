import Image from 'next/image'
import { WhatsappButton } from './whatsapp-button'

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-motor.webp"
          alt="Reparación y bobinado de motor eléctrico en Galpón Bobinados, Tandil"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-[70%_center] lg:object-[74%_center]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,9,0.97)_0%,rgba(16,14,12,0.88)_34%,rgba(18,16,13,0.42)_57%,rgba(18,16,13,0.08)_74%,rgba(18,16,13,0)_84%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto flex min-h-[720px] max-w-6xl flex-col justify-center px-4 pb-20 pt-32 md:min-h-[760px] md:px-6 md:pb-24 md:pt-36">
        <div className="max-w-xl text-dark-section-foreground md:max-w-2xl">
          <h1 className="font-heading text-4xl font-bold uppercase leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl">
            Rebobinado y reparación de{' '}
            <span className="text-primary">motores eléctricos</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-background/88 md:text-lg">
            Servicio técnico especializado en Tandil. Motores trifásicos y
            monofásicos, bombas de agua y de pileta.
          </p>
          <div className="mt-8">
            <WhatsappButton />
          </div>
        </div>
      </div>
    </section>
  )
}
