# QA, SEO y optimización — Galpón Bobinados

Fecha de revisión: 26/07/2026

## Mejoras aplicadas

- Metadatos generales y específicos para cada servicio: títulos, descripciones, canonical, Open Graph y Twitter.
- Imágenes sociales de 1200 × 630 px para la portada y cada página interna.
- `robots.txt`, `sitemap.xml`, manifest, favicon y página 404 mediante las convenciones de Next.js.
- Datos estructurados de negocio local, catálogo de servicios, preguntas frecuentes, servicios y breadcrumbs.
- Sitemap con fechas estables e imágenes asociadas.
- Imágenes principales convertidas y comprimidas en WebP; se habilitó la optimización automática de `next/image`.
- Eliminación de imágenes, placeholders, componentes, dependencias, datos y archivos de cambios que no se utilizaban.
- Eliminación de recursos externos innecesarios para el icono de WhatsApp.
- Header, footer y landmarks HTML ordenados correctamente.
- Enlace accesible para saltar al contenido, foco visible y soporte para reducción de movimiento.
- Revisión de navegación de escritorio y móvil, dropdown de servicios, enlaces internos, WhatsApp, teléfono, correo y redes.
- Encabezados de seguridad básicos y eliminación de `X-Powered-By`.
- Configuración estricta: se eliminó `ignoreBuildErrors`.

## Resultado de limpieza

- Proyecto reducido de aproximadamente 8,9 MB a cerca de 1,1 MB sin `node_modules` ni `.next`.
- Todas las referencias internas a imágenes fueron verificadas.
- Todos los archivos TS/TSX superaron una validación sintáctica con el compilador de TypeScript.

## Verificación final en tu Mac

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Abrir `http://localhost:3000` y revisar en Chrome:

1. Portada en 320, 375, 768, 1024 y 1440 px.
2. Las cuatro páginas de servicios.
3. Dropdown de Servicios, menú móvil y scroll suave.
4. Formularios/enlaces de teléfono, correo, mapa, redes y WhatsApp.
5. Lighthouse en modo incógnito para Performance, Accessibility, Best Practices y SEO.
6. Rich Results Test y Search Console después del despliegue.

## Nota de compilación del entorno

La instalación de dependencias no pudo completarse en el entorno de generación porque el registro interno de npm respondió con error 503. Por esa razón, además de la revisión de código y assets, conviene ejecutar los cuatro comandos anteriores localmente antes de desplegar.
