import Image from 'next/image'

export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/images/logo-official.png"
      alt="Galpón Bobinados"
      width={210}
      height={81}
      className="h-auto w-auto max-w-[210px] object-contain"
      priority={priority}
    />
  )
}
