import type { LucideIcon } from 'lucide-react'
import { Cable, Wrench, Droplets, Settings } from 'lucide-react'

export type ServiceFaq = {
  question: string
  answer: string
}

export type ServicePageData = {
  slug: string
  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string[]
  // Hero / contenido
  h1: string
  heroSubtitle: string
  heroImage: string
  icon: LucideIcon
  intro: string[]
  // "Qué incluye"
  includesTitle: string
  includes: { title: string; description: string }[]
  // Fallas comunes
  commonIssuesTitle: string
  commonIssues: string[]
  // Marcas / equipos
  brandsTitle: string
  brandsIntro: string
  brands: string[]
  // FAQ propio del servicio
  faqs: ServiceFaq[]
  // Para el schema Service
  serviceSchemaName: string
  serviceSchemaDescription: string
}

export const servicesPages: ServicePageData[] = [
  {
    slug: 'bobinado-de-motores-electricos-tandil',
    metaTitle: 'Bobinado de Motores en Tandil',
    metaDescription:
      'Bobinado y rebobinado de motores eléctricos en Tandil. Diagnóstico previo, materiales de calidad, garantía y presupuesto claro. Consultá por WhatsApp.',
    keywords: [
      'bobinado de motores Tandil',
      'bobinado en Tandil',
      'rebobinado de motores Tandil',
      'bobinado motor trifásico',
      'bobinado motor monofásico',
      'taller de bobinados Tandil',
    ],
    h1: 'Bobinado de Motores Eléctricos en Tandil',
    heroSubtitle:
      'Rebobinado de motores monofásicos y trifásicos con materiales de calidad y garantía en cada trabajo.',
    heroImage: '/images/serv-bobinado.webp',
    icon: Cable,
    intro: [
      'El bobinado es el corazón eléctrico de un motor: si las bobinas se queman, se humedecen o pierden aislación, el motor deja de funcionar o trabaja con bajo rendimiento. En Galpón Bobinados rebobinamos motores eléctricos monofásicos y trifásicos en Tandil, devolviéndoles las prestaciones originales de fábrica.',
      'Antes de bobinar, siempre hacemos un diagnóstico del estado del motor: medimos aislación, continuidad y el estado del paquete de chapas. Esto nos permite confirmar si el bobinado es la solución correcta o si hace falta intervenir también en otra parte del equipo, para no gastar de más en algo que no resuelve el problema de fondo.',
    ],
    includesTitle: 'Qué incluye el servicio de bobinado',
    includes: [
      {
        title: 'Diagnóstico eléctrico previo',
        description:
          'Medición de aislación a tierra, continuidad de bobinas y revisión del estado general del motor antes de presupuestar.',
      },
      {
        title: 'Extracción del bobinado dañado',
        description:
          'Retiro cuidadoso de las bobinas quemadas o deterioradas sin dañar el paquete de chapas ni la carcasa.',
      },
      {
        title: 'Rebobinado con alambre de cobre esmaltado',
        description:
          'Reconstrucción de las bobinas respetando el número de espiras y el calibre original para mantener el rendimiento del motor.',
      },
      {
        title: 'Impregnación y secado',
        description:
          'Tratamiento del bobinado para protegerlo de la humedad y prolongar su vida útil.',
      },
      {
        title: 'Prueba de funcionamiento',
        description:
          'Verificación eléctrica y mecánica final antes de entregar el motor, confirmando que arranca y trabaja correctamente.',
      },
    ],
    commonIssuesTitle: 'Fallas más comunes que llevan a un bobinado',
    commonIssues: [
      'Motor quemado por sobrecarga, fase faltante o trabajo continuo sin protección térmica.',
      'Bobinado en corto o a tierra por humedad, polvo o desgaste de la aislación con el tiempo.',
      'Motor que arranca pero no toma fuerza, señal de bobinado parcialmente dañado.',
      'Olor a quemado o disparo reiterado de la térmica al poner en marcha el equipo.',
      'Motores guardados mucho tiempo sin uso que absorbieron humedad y perdieron aislación.',
    ],
    brandsTitle: 'Tipos de motores que bobinamos',
    brandsIntro:
      'Trabajamos con motores eléctricos de uso doméstico, comercial e industrial, de distintas potencias y marcas, entre ellos:',
    brands: [
      'Motores monofásicos de bombas de agua y de pileta',
      'Motores trifásicos de uso industrial y agrícola',
      'Motores de heladeras comerciales y equipos de frío',
      'Motores de compresores y maquinaria de taller',
      'Motores de ventiladores y extractores industriales',
    ],
    faqs: [
      {
        question: '¿Cuánto cuesta bobinar un motor en Tandil?',
        answer:
          'El costo depende de la potencia del motor, si es monofásico o trifásico, y el estado del bobinado dañado. Hacemos el diagnóstico primero y te damos un presupuesto exacto antes de empezar el trabajo.',
      },
      {
        question: '¿Vale la pena bobinar o conviene comprar un motor nuevo?',
        answer:
          'En la mayoría de los motores de uso doméstico e industrial, bobinar es más económico que comprar uno nuevo, siempre que la carcasa y el eje estén en buen estado. Te lo confirmamos en el diagnóstico, con honestidad sobre si conviene o no.',
      },
      {
        question: '¿El bobinado tiene garantía?',
        answer:
          'Sí, garantizamos el trabajo de bobinado. Si surge algún problema relacionado directamente con el rebobinado realizado, lo resolvemos.',
      },
      {
        question: '¿Bobinan motores trifásicos de uso industrial?',
        answer:
          'Sí, bobinamos motores trifásicos de distintas potencias para uso industrial, agrícola y comercial, además de motores monofásicos domésticos.',
      },
    ],
    serviceSchemaName: 'Bobinado de motores eléctricos',
    serviceSchemaDescription:
      'Bobinado y rebobinado de motores eléctricos monofásicos y trifásicos en Tandil, con diagnóstico previo y garantía en el trabajo.',
  },
  {
    slug: 'reparacion-de-motores-electricos-tandil',
    metaTitle: 'Reparación de Motores en Tandil',
    metaDescription:
      'Reparación de motores eléctricos en Tandil: rulemanes, retenes, ejes y capacitores. Diagnóstico preciso y presupuesto claro por WhatsApp.',
    keywords: [
      'reparación de motores eléctricos Tandil',
      'reparación motor trifásico Tandil',
      'reparación motor monofásico Tandil',
      'arreglo de motores eléctricos Tandil',
      'service de motores eléctricos Tandil',
    ],
    h1: 'Reparación de Motores Eléctricos en Tandil',
    heroSubtitle:
      'Diagnóstico y reparación de motores trifásicos y monofásicos: rulemanes, retenes, ejes, capacitores y más.',
    heroImage: '/images/serv-reparacion.webp',
    icon: Wrench,
    intro: [
      'No todo motor que deja de funcionar necesita un bobinado nuevo. Muchas veces la falla es mecánica: rulemanes desgastados, un retén vencido, un eje gastado o un capacitor de arranque agotado. En Galpón Bobinados reparamos motores eléctricos trifásicos y monofásicos en Tandil, atendiendo tanto la parte eléctrica como la mecánica.',
      'Nuestro trabajo empieza siempre por entender qué pasó: escuchamos el motor, lo desarmamos si es necesario y medimos los componentes eléctricos. Esto evita reparaciones innecesarias y te permite saber exactamente qué se le hizo al equipo y por qué.',
    ],
    includesTitle: 'Qué incluye la reparación',
    includes: [
      {
        title: 'Diagnóstico mecánico y eléctrico',
        description:
          'Revisión de rulemanes, eje, retenes, bobinado y capacitores para identificar el origen real de la falla.',
      },
      {
        title: 'Cambio de rulemanes y retenes',
        description:
          'Reemplazo de rodamientos desgastados y sellos que generan ruido, vibración o pérdida de lubricante.',
      },
      {
        title: 'Rectificación o cambio de eje',
        description:
          'Solución para ejes gastados, doblados o con juego excesivo que afectan el funcionamiento del motor.',
      },
      {
        title: 'Cambio de capacitores',
        description:
          'Reemplazo de capacitores de arranque o marcha en motores monofásicos que no arrancan o pierden fuerza.',
      },
      {
        title: 'Limpieza y mantenimiento general',
        description:
          'Limpieza de polvo, grasa vieja y suciedad que afecta la refrigeración y vida útil del motor.',
      },
    ],
    commonIssuesTitle: 'Fallas más comunes en motores eléctricos',
    commonIssues: [
      'Ruido o vibración anormal, generalmente por rulemanes desgastados.',
      'El motor no arranca o arranca con esfuerzo, típico de capacitores agotados en monofásicos.',
      'Pérdida de fuerza o recalentamiento durante el funcionamiento.',
      'Fugas de grasa o aceite por retenes vencidos.',
      'Disparo de la térmica al poco tiempo de uso por sobrecarga o falla eléctrica interna.',
    ],
    brandsTitle: 'Equipos que reparamos',
    brandsIntro:
      'Reparamos motores eléctricos de distintos usos y potencias, entre ellos:',
    brands: [
      'Motores monofásicos de uso doméstico y comercial',
      'Motores trifásicos industriales y agrícolas',
      'Motores acoplados a bombas de agua y presurizadoras',
      'Motores de maquinaria de taller y producción',
      'Motores de equipos de ventilación y extracción',
    ],
    faqs: [
      {
        question: '¿Reparan motores trifásicos y monofásicos?',
        answer:
          'Sí, reparamos ambos tipos de motores eléctricos: trifásicos de uso industrial y agrícola, y monofásicos de uso doméstico y comercial.',
      },
      {
        question: 'Mi motor hace ruido pero todavía funciona, ¿lo reviso?',
        answer:
          'Sí, te recomendamos traerlo. Un ruido o vibración suele ser un rulemán empezando a fallar, y resolverlo a tiempo evita que termine dañando el eje o el bobinado.',
      },
      {
        question: '¿Cómo sé si necesito una reparación o un bobinado?',
        answer:
          'No siempre es fácil saberlo sin diagnóstico. Por eso primero revisamos el motor: si la falla es mecánica (rulemanes, eje, capacitores) es reparación; si el bobinado está dañado, te lo decimos y cotizamos esa opción aparte.',
      },
      {
        question: '¿Las reparaciones tienen garantía?',
        answer:
          'Sí, garantizamos los repuestos y el trabajo realizado en cada reparación.',
      },
    ],
    serviceSchemaName: 'Reparación de motores eléctricos',
    serviceSchemaDescription:
      'Reparación de motores eléctricos trifásicos y monofásicos en Tandil: rulemanes, retenes, ejes, capacitores y diagnóstico eléctrico.',
  },
  {
    slug: 'reparacion-de-bombas-de-agua-tandil',
    metaTitle: 'Bombas de Agua: Reparación en Tandil',
    metaDescription:
      'Reparación de bombas de agua, presurizadoras y bombas de pileta en Tandil. Diagnóstico mecánico y eléctrico, repuestos de calidad. Consultá por WhatsApp.',
    keywords: [
      'reparación de bombas de agua Tandil',
      'reparación de bombas de pileta Tandil',
      'reparación de bombas presurizadoras Tandil',
      'arreglo de bombas de agua Tandil',
      'service de presurizadoras Tandil',
    ],
    h1: 'Reparación de Bombas de Agua en Tandil',
    heroSubtitle:
      'Bombas de agua, presurizadoras y bombas de pileta: diagnóstico mecánico y eléctrico completo.',
    heroImage: '/images/serv-mantenimiento.webp',
    icon: Droplets,
    intro: [
      'Una bomba de agua que no arranca, pierde presión o hace ruido suele tener una solución más simple de lo que parece. En Galpón Bobinados reparamos bombas de agua, presurizadoras domiciliarias y bombas de pileta en Tandil, revisando tanto el motor eléctrico como la parte hidráulica del equipo.',
      'Sabemos que quedarse sin agua o sin presión es urgente, por eso priorizamos un diagnóstico rápido para decirte qué tiene la bomba y si conviene repararla o no, según el estado general del equipo.',
    ],
    includesTitle: 'Qué incluye el servicio',
    includes: [
      {
        title: 'Diagnóstico mecánico e hidráulico',
        description:
          'Revisión del motor, el rotor, los sellos mecánicos y el cuerpo de la bomba para detectar pérdidas de presión o fugas.',
      },
      {
        title: 'Reparación de la parte eléctrica',
        description:
          'Revisión de bobinado, capacitor de arranque y conexiones eléctricas cuando la bomba no enciende.',
      },
      {
        title: 'Cambio de sellos y retenes',
        description:
          'Reemplazo de sellos mecánicos que generan pérdidas de agua por el eje de la bomba.',
      },
      {
        title: 'Limpieza de impulsor y filtros',
        description:
          'Eliminación de residuos, arena o sarro que reducen el caudal o tapan el paso de agua.',
      },
      {
        title: 'Ajuste de presostato',
        description:
          'Regulación o cambio del presostato en presurizadoras que arrancan y se detienen de forma irregular.',
      },
    ],
    commonIssuesTitle: 'Fallas más comunes en bombas de agua y presurizadoras',
    commonIssues: [
      'La bomba no arranca o hace fuerza pero no levanta agua.',
      'Pérdida de agua por el sello mecánico o por la zona del eje.',
      'Presurizadora que arranca y se apaga de forma seguida (cortocicleo).',
      'Caudal bajo por impulsor desgastado, tapado o roto.',
      'Ruido excesivo o vibración por rulemanes gastados o cavitación.',
    ],
    brandsTitle: 'Equipos que reparamos',
    brandsIntro: 'Trabajamos sobre distintos tipos de equipos de bombeo, entre ellos:',
    brands: [
      'Bombas centrífugas de uso domiciliario',
      'Presurizadoras de agua para vivienda y comercios',
      'Bombas de pileta y filtrado',
      'Bombas sumergibles de pozo',
      'Equipos de riego de uso particular y rural',
    ],
    faqs: [
      {
        question: '¿Reparan presurizadoras de agua?',
        answer:
          'Sí, reparamos presurizadoras domiciliarias: problemas de presostato, motor, sellos y pérdidas de agua.',
      },
      {
        question: 'Mi bomba de pileta perdió fuerza, ¿qué puede ser?',
        answer:
          'Generalmente es un impulsor desgastado, una obstrucción en el filtro o el cuerpo de la bomba, o un capacitor que ya no entrega la fuerza necesaria. Lo confirmamos en el diagnóstico.',
      },
      {
        question: '¿Reparan bombas sumergibles de pozo?',
        answer:
          'Sí, trabajamos con bombas sumergibles, evaluando tanto el motor como el sistema hidráulico del equipo.',
      },
      {
        question: '¿Qué hago si la bomba pierde agua por abajo?',
        answer:
          'Es probable que el sello mecánico esté vencido. Te recomendamos no seguir usándola así para evitar que el agua dañe el bobinado, y traerla a revisar lo antes posible.',
      },
    ],
    serviceSchemaName: 'Reparación de bombas de agua',
    serviceSchemaDescription:
      'Reparación de bombas de agua, presurizadoras domiciliarias y bombas de pileta en Tandil, con diagnóstico mecánico y eléctrico.',
  },
  {
    slug: 'mantenimiento-preventivo-motores-tandil',
    metaTitle: 'Mantenimiento de Motores en Tandil',
    metaDescription:
      'Mantenimiento preventivo de motores eléctricos en Tandil. Revisión de bobinado, rulemanes y conexiones para evitar paradas y roturas.',
    keywords: [
      'mantenimiento preventivo de motores Tandil',
      'mantenimiento de motores eléctricos Tandil',
      'service de motores eléctricos Tandil',
      'revisión de motores industriales Tandil',
    ],
    h1: 'Mantenimiento Preventivo de Motores Eléctricos en Tandil',
    heroSubtitle:
      'Revisiones periódicas para evitar paradas inesperadas y prolongar la vida útil de tus equipos.',
    heroImage: '/images/serv-diagnostico.webp',
    icon: Settings,
    intro: [
      'La mayoría de las roturas grandes de un motor empiezan como una falla pequeña que no se detectó a tiempo: un rulemán con desgaste leve, una conexión floja, una aislación que empieza a deteriorarse. El mantenimiento preventivo busca justamente eso, anticiparse antes de que el motor se queme o se pare en medio de una jornada de trabajo.',
      'En Galpón Bobinados ofrecemos mantenimiento preventivo de motores eléctricos en Tandil para comercios, talleres e industrias que no pueden permitirse paradas imprevistas. Adaptamos la frecuencia y el alcance de la revisión según el uso y la criticidad de cada equipo.',
    ],
    includesTitle: 'Qué incluye el mantenimiento preventivo',
    includes: [
      {
        title: 'Medición de aislación',
        description:
          'Control del estado de la aislación del bobinado para detectar deterioro antes de que se convierta en una falla.',
      },
      {
        title: 'Revisión de rulemanes',
        description:
          'Inspección de ruido, vibración y juego en los rodamientos para anticipar su reemplazo.',
      },
      {
        title: 'Control de conexiones eléctricas',
        description:
          'Revisión de bornes, cables y ajuste de conexiones para evitar falsos contactos y recalentamiento.',
      },
      {
        title: 'Limpieza general',
        description:
          'Eliminación de polvo y residuos que afectan la refrigeración del motor, sobre todo en ambientes de taller o industria.',
      },
      {
        title: 'Informe de estado',
        description:
          'Te indicamos qué encontramos y qué conviene reparar o reemplazar antes de que se transforme en una falla mayor.',
      },
    ],
    commonIssuesTitle: 'Señales de que un motor necesita mantenimiento',
    commonIssues: [
      'Aumento de temperatura en el cuerpo del motor durante el uso normal.',
      'Ruido o vibración que antes no estaba presente.',
      'Motor que trabaja muchas horas seguidas sin revisión periódica.',
      'Ambiente con polvo, humedad o residuos que se acumulan en el motor.',
      'Equipos críticos donde una parada inesperada genera pérdidas importantes.',
    ],
    brandsTitle: 'Para qué tipo de equipos lo recomendamos',
    brandsIntro:
      'El mantenimiento preventivo es especialmente útil en:',
    brands: [
      'Motores trifásicos de uso industrial continuo',
      'Maquinaria de talleres y líneas de producción',
      'Bombas de agua de uso comercial o agrícola',
      'Equipos que trabajan en ambientes con polvo o humedad',
      'Motores críticos donde una parada genera pérdida de producción',
    ],
    faqs: [
      {
        question: '¿Cada cuánto conviene hacer mantenimiento preventivo a un motor?',
        answer:
          'Depende del uso: en motores industriales que trabajan todos los días, recomendamos una revisión cada 3 a 6 meses. En equipos de uso esporádico, puede espaciarse más. Lo evaluamos según tu caso particular.',
      },
      {
        question: '¿El mantenimiento preventivo sirve para motores domésticos también?',
        answer:
          'Sí, aunque es más habitual en equipos comerciales e industriales por la cantidad de horas de uso, también se puede aplicar a equipos domésticos críticos, como bombas de agua de uso permanente.',
      },
      {
        question: '¿Qué pasa si el mantenimiento detecta una falla?',
        answer:
          'Te informamos qué encontramos y te pasamos un presupuesto aparte para la reparación, antes de hacer cualquier intervención adicional.',
      },
      {
        question: '¿Hacen mantenimiento para varios equipos de una empresa?',
        answer:
          'Sí, trabajamos con comercios e industrias de Tandil y la zona que necesitan mantener varios motores o bombas en buen estado. Coordinamos un plan según la cantidad de equipos y su criticidad.',
      },
    ],
    serviceSchemaName: 'Mantenimiento preventivo de motores eléctricos',
    serviceSchemaDescription:
      'Mantenimiento preventivo de motores eléctricos en Tandil: revisión de bobinado, rulemanes, conexiones eléctricas y limpieza general.',
  },
]

export function getServiceBySlug(slug: string) {
  return servicesPages.find((s) => s.slug === slug)
}
