export const site = {
  name: 'Galpón Bobinados',
  legalName: 'Galpón Bobinados',
  description:
    'Servicio técnico especializado en bobinado y reparación de motores eléctricos trifásicos y monofásicos, bombas de agua y bombas de pileta en Tandil.',
  url: 'https://www.galponbobinados.com.ar',
  phoneDisplay: '+54 9 2494 466 5990',
  phoneIntl: '5492494665990',
  whatsapp: '5492494665990',
  whatsappMessage:
    'Hola, ¿cómo están? Quería consultarles por la reparación de un motor.',
  email: 'galponbobinados@gmail.com',
  address: 'Santamarina 261',
  city: 'Tandil',
  province: 'Buenos Aires',
  country: 'Argentina',
  instagram: 'galponbobinados',
  facebook: 'galponbobinados',
  hoursNote: 'Atención con consulta previa',
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '13:00',
    },
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '15:00',
      closes: '19:00',
    },
  ],
  areasServed: [
    'Tandil',
    'Rauch',
    'Azul',
    'Olavarría',
    'Ayacucho',
    'Benito Juárez',
  ],
}

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`

export const faqs = [
  {
    question: '¿Hacen bobinado de motores en Tandil?',
    answer:
      'Sí. En Galpón Bobinados realizamos bobinado y rebobinado de motores eléctricos monofásicos y trifásicos en Tandil y la zona.',
  },
  {
    question: '¿Reparan motores eléctricos trifásicos y monofásicos?',
    answer:
      'Sí, reparamos motores eléctricos trifásicos y monofásicos: diagnóstico, cambio de rulemanes, retenes, ejes, capacitores y reconstrucción de bobinados.',
  },
  {
    question: '¿Arreglan bombas de agua y bombas de pileta?',
    answer:
      'Sí. Reparamos bombas de agua, presurizadoras y bombas de pileta, tanto la parte mecánica como la eléctrica.',
  },
  {
    question: '¿Dónde están ubicados?',
    answer: `Estamos en ${site.address}, ${site.city}, ${site.province}. Atendemos con consulta previa por WhatsApp al ${site.phoneDisplay}.`,
  },
  {
    question: '¿Cuánto tarda una reparación o un bobinado?',
    answer:
      'Depende del equipo y la falla. Tras el diagnóstico te damos un presupuesto y un tiempo estimado claro, sin sorpresas.',
  },
]


export const reasons = [
  {
    title: 'Experiencia',
    description:
      'Años de trabajo y conocimiento en reparación y bobinado de motores eléctricos.',
  },
  {
    title: 'Honestidad',
    description: 'Diagnósticos claros y presupuestos justos, sin sorpresas.',
  },
  {
    title: 'Calidad',
    description:
      'Trabajamos con repuestos de calidad y garantizamos cada reparación.',
  },
  {
    title: 'Compromiso',
    description:
      'Cumplimos con los tiempos acordados y acompañamos a cada cliente.',
  },
]
