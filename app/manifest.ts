import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Galpón Bobinados',
    short_name: 'Galpón Bobinados',
    description: 'Bobinado y reparación de motores eléctricos en Tandil.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f2eee4',
    theme_color: '#211f1a',
    lang: 'es-AR',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
