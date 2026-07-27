import { whatsappHref } from '@/lib/site'

export function FloatingWhatsapp() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      title="Consultar por WhatsApp"
      className="group fixed bottom-5 right-5 z-[70] inline-flex size-14 items-center justify-center rounded-full border border-primary/70 bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(0,0,0,.28)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background md:bottom-7 md:right-7 md:size-16"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="size-7 fill-current md:size-8"
      >
        <path d="M19.11 17.43c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.61-.66 1.84-1.29.23-.63.23-1.18.16-1.29-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16.03 3.2C8.97 3.2 3.23 8.94 3.23 16c0 2.26.59 4.47 1.71 6.41L3.12 29l6.74-1.77A12.76 12.76 0 0 0 16.03 28.8c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8Zm0 23.44c-2 0-3.96-.54-5.67-1.56l-.41-.24-4 1.05 1.07-3.9-.27-.42A10.59 10.59 0 0 1 5.39 16c0-5.87 4.77-10.64 10.64-10.64S26.67 10.13 26.67 16s-4.77 10.64-10.64 10.64Z" />
      </svg>
      <span className="sr-only">Consultar por WhatsApp</span>
    </a>
  )
}
