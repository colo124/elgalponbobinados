import Image from 'next/image'

export function MissionSection() {
  return (
    <section
      id="mision"
      aria-labelledby="mision-heading"
      className="mission-old py-20 md:py-24"
    >
      <div className="mx-auto max-w-[760px] px-4 text-center md:px-6">
        <div className="flex justify-center">
          <Image
            src="/images/logo-mission-gray.png"
            alt="Galpón Bobinados"
            width={324}
            height={254}
            className="mission-logo h-auto w-[210px] md:w-[250px]"
            priority={false}
          />
        </div>
        <h2 id="mision-heading" className="sr-only">
          Nuestra misión
        </h2>
        <div className="mt-9 space-y-6 text-pretty text-[1.02rem] leading-[1.8] text-foreground/82">
          <p>
            Brindamos un servicio técnico confiable y profesional en
            diagnóstico, reparación y bobinado de motores eléctricos y bombas de
            agua. Combinamos experiencia, honestidad y compromiso para ofrecer
            soluciones eficientes y duraderas.
          </p>
          <p>
            En Galpón Bobinados creemos en el valor del trabajo bien hecho,
            brindando atención personalizada y acompañando a particulares,
            comercios e industrias de Tandil y la zona.
          </p>
        </div>
      </div>
    </section>
  )
}
