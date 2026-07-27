import { faqs } from '@/lib/site'

export function FaqSection() {
  return (
    <section
      id="preguntas-frecuentes"
      aria-labelledby="faq-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2
          id="faq-heading"
          className="text-center font-heading text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl"
        >
          Preguntas frecuentes
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg bg-card p-5 ring-1 ring-border"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                {faq.question}
                <span
                  className="shrink-0 text-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
