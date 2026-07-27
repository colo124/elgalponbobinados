import Image from 'next/image'
import { reasons } from '@/lib/site'

const icons = [
  '/images/why-experiencia.png',
  '/images/why-honestidad.png',
  '/images/why-calidad.png',
  '/images/why-compromiso.png',
]

export function WhyUsSection() {
  return (
    <section
      aria-labelledby="porque-heading"
      className="why-old py-16 text-dark-section-foreground md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2
          id="porque-heading"
          className="text-center font-heading text-3xl font-bold uppercase tracking-tight md:text-4xl"
        >
          ¿Por qué elegirnos?
        </h2>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <li key={reason.title} className="why-item text-center">
              <span className="mx-auto flex h-14 items-center justify-center">
                <Image
                  src={icons[i]}
                  alt=""
                  width={78}
                  height={62}
                  className="why-icon h-auto w-auto max-h-14 max-w-[78px] object-contain"
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-4 font-heading text-base font-bold uppercase tracking-wide text-[#f3efe6]">
                {reason.title}
              </h3>
              <p className="mx-auto mt-2 max-w-[14rem] text-sm leading-relaxed text-[#f3efe6]/80">
                {reason.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
