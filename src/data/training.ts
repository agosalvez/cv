/**
 * Contenido y metadatos de la landing de formación.
 *
 * Rutas: `/es/formacion` y `/en/training`. A diferencia de `/setup`, el slug
 * está traducido, así que las URL equivalentes se declaran aquí una sola vez
 * (`trainingRoutes`) y de ahí salen el canonical, los hreflang, el conmutador
 * de idioma y el sitemap.
 *
 * Todo el texto editorial vive en este archivo: los componentes de
 * `src/components/training/` solo reciben datos. Cambiar una cifra, un ejemplo
 * o el correo de contacto no debe requerir tocar el marcado.
 */

export type TrainingLang = 'es' | 'en';

/** Texto disponible en los dos idiomas de la web. */
export interface Localized {
  es: string;
  en: string;
}

export const localize = (text: Localized, lang: TrainingLang): string => text[lang];

/** URL de la landing en cada idioma. El slug se traduce; la página es la misma. */
export const trainingRoutes: Record<TrainingLang, string> = {
  es: '/es/formacion',
  en: '/en/training',
};

export const trainingUrls: Record<TrainingLang, string> = {
  es: `https://gosalvez.es${trainingRoutes.es}`,
  en: `https://gosalvez.es${trainingRoutes.en}`,
};

/**
 * Destino del formulario.
 *
 * El correo lo envía el servidor (`admin/contact.js`), que lee la dirección de
 * la variable de entorno `CONTACT_TO`. Aquí solo consta la ruta: la dirección
 * no llega nunca al navegador.
 */
export const contactEndpoint = '/api/contacto';

/* ─────────────────────────── SEO ─────────────────────────── */

export const trainingSeo = {
  title: {
    es: 'Formación en Inteligencia Artificial para Empresas | Adrián Gosálvez',
    en: 'Artificial Intelligence Training for Companies | Adrián Gosálvez',
  },
  description: {
    es:
      'Formación práctica en inteligencia artificial para pymes y empresas no tecnológicas. ' +
      'Sesión ejecutiva para dirección y workshop práctico para equipos, aplicados a tareas reales de trabajo.',
    en:
      'Practical artificial intelligence training for SMEs and non-technical companies. ' +
      'An executive session for management and a hands-on workshop for teams, applied to real day-to-day work.',
  },
} satisfies Record<string, Localized>;

/* ─────────────────────── Fotografías ──────────────────────── */

/**
 * Fotografías de la landing.
 *
 * `temporary: true` marca los marcadores que todavía no son fotos reales. La
 * marca es interna —para el inventario del repositorio y para
 * `docs/formacion-photo-guide.md`— y nunca se muestra al visitante.
 *
 * Para sustituir una foto: dejar el archivo en `public/images/formacion/`,
 * actualizar `src`, `width`, `height` y `alt`, y poner `temporary: false`.
 */
export interface TrainingImage {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  temporary: boolean;
}

export const trainingImages = {
  /** Retrato principal, en la cabecera. Es la que más pesa en la credibilidad. */
  portrait: {
    src: '/images/formacion/retrato-hero.jpg',
    width: 1000,
    height: 1250,
    alt: {
      es: 'Adrián Gosálvez, ingeniero de software especializado en inteligencia artificial',
      en: 'Adrián Gosálvez, software engineer specialised in artificial intelligence',
    },
    temporary: false,
  },
  /** Impartiendo: demuestra que la formación es una actividad real, no una idea. */
  teaching: {
    src: '/images/formacion/impartiendo.jpg',
    width: 1448,
    height: 965,
    alt: {
      es: 'Adrián Gosálvez explicando ante una pantalla a un equipo de trabajo',
      en: 'Adrián Gosálvez explaining to a work team in front of a screen',
    },
    temporary: false,
  },
  /** Trabajando: respalda el perfil técnico en la sección de quién imparte. */
  working: {
    src: '/images/formacion/trabajando.jpg',
    width: 1448,
    height: 965,
    alt: {
      es: 'Adrián Gosálvez trabajando con el portátil en la oficina',
      en: 'Adrián Gosálvez working on his laptop at the office',
    },
    temporary: false,
  },
} satisfies Record<string, TrainingImage>;

/* ─────────────────────────── Hero ─────────────────────────── */

export const trainingHero = {
  eyebrow: { es: 'Formación in-company', en: 'In-company training' },
  title: {
    es: 'Formación práctica en IA para empresas',
    en: 'Practical AI training for companies',
  },
  intro: {
    es:
      'Ayudo a empresas y equipos a descubrir cómo aplicar la inteligencia artificial en las tareas ' +
      'que ya hacen cada día: ahorrar tiempo, reducir trabajo repetitivo y manejar mejor documentación, ' +
      'textos y datos. Sin teoría innecesaria y sin programar.',
    en:
      'I help companies and teams find out how to apply artificial intelligence to the work they already ' +
      'do every day: saving time, cutting repetitive work and handling documents, text and data better. ' +
      'No unnecessary theory and no programming.',
  },
  ctaPrimary: { es: 'Solicitar información', en: 'Request information' },
  ctaSecondary: { es: 'Ver modalidades', en: 'See the two formats' },
  /** Datos de encuadre, no promesas: qué es y para quién. */
  facts: [
    {
      value: { es: '2 modalidades', en: '2 formats' },
      label: { es: 'Dirección y equipos', en: 'Management and teams' },
    },
    {
      value: { es: '1,5 – 3 h', en: '1.5 – 3 h' },
      label: { es: 'Según la modalidad', en: 'Depending on the format' },
    },
    {
      value: { es: 'A medida', en: 'Tailored' },
      label: {
        es: 'Ejemplos según la actividad',
        en: 'Examples based on your activity',
      },
    },
  ],
} as const;

/* ───────────────────────── Problema ───────────────────────── */

export const trainingProblem = {
  eyebrow: { es: 'El punto de partida', en: 'The starting point' },
  title: {
    es: 'Casi todas las empresas quieren usar IA. Muy pocas saben por dónde empezar.',
    en: 'Almost every company wants to use AI. Very few know where to start.',
  },
  intro: {
    es:
      'La conversación suele quedarse en titulares y demostraciones vistosas. Cuando llega el momento ' +
      'de aplicarlo al trabajo real aparecen siempre las mismas dudas:',
    en:
      'The conversation usually stops at headlines and flashy demos. When the time comes to apply it to ' +
      'real work, the same questions always show up:',
  },
  items: [
    {
      title: { es: 'Qué herramienta usar', en: 'Which tool to use' },
      text: {
        es: 'Aparecen decenas cada mes y no está claro cuáles sirven para el trabajo de la empresa.',
        en: 'Dozens appear every month and it is not clear which ones are useful for the company’s work.',
      },
    },
    {
      title: { es: 'Dónde aporta valor de verdad', en: 'Where it actually adds value' },
      text: {
        es: 'No todo mejora con IA. Distinguir dónde sí y dónde no evita perder tiempo y dinero.',
        en: 'Not everything improves with AI. Telling one from the other saves time and money.',
      },
    },
    {
      title: { es: 'Qué tareas se pueden mejorar', en: 'Which tasks can be improved' },
      text: {
        es: 'Las oportunidades suelen estar en tareas cotidianas que nadie se para a revisar.',
        en: 'The opportunities are usually in everyday tasks nobody stops to review.',
      },
    },
    {
      title: { es: 'Qué riesgos hay', en: 'What the risks are' },
      text: {
        es: 'Privacidad, confidencialidad y respuestas incorrectas: conviene saber dónde está el límite.',
        en: 'Privacy, confidentiality and wrong answers: it pays to know where the limits are.',
      },
    },
    {
      title: { es: 'Cómo conseguir que el equipo la use', en: 'How to get the team to use it' },
      text: {
        es: 'Sin ejemplos aplicados a su propio trabajo, la herramienta se abre una vez y se abandona.',
        en: 'Without examples applied to their own work, the tool gets opened once and then dropped.',
      },
    },
  ],
} as const;

/* ──────────────────────── Modalidades ─────────────────────── */

export interface TrainingProgram {
  id: string;
  eyebrow: Localized;
  title: Localized;
  summary: Localized;
  duration: Localized;
  audienceLabel: Localized;
  audience: Localized[];
  focusLabel: Localized;
  focus: Localized[];
  outcomesLabel: Localized;
  outcomes: Localized[];
  cta: Localized;
  note?: Localized;
  /**
   * Importe de entrada, en euros.
   *
   * `null` mientras no esté decidido: el bloque de precio no se renderiza,
   * así que la página nunca muestra un importe provisional.
   */
  priceFrom: number | null;
  /** Aforo orientativo que cubre ese importe de entrada. */
  priceIncludes?: Localized;
  /** Tramos y suplementos por encima del aforo incluido. */
  priceNotes?: Localized[];
  /** Se marca una sola opción, y con discreción: es una sugerencia, no un reclamo. */
  recommended?: boolean;
}

export const trainingPrograms: TrainingProgram[] = [
  {
    id: 'direccion',
    eyebrow: { es: 'Modalidad 1', en: 'Format 1' },
    title: { es: 'IA para empresarios y dirección', en: 'AI for owners and management' },
    summary: {
      es:
        'Una sesión ejecutiva, directa y orientada a negocio para entender qué puede aportar hoy la IA ' +
        'a la empresa y dónde tiene sentido aplicarla.',
      en:
        'An executive session, direct and business-focused, to understand what AI can bring to the ' +
        'company today and where it makes sense to apply it.',
    },
    duration: { es: '1,5 – 2 horas', en: '1.5 – 2 hours' },
    audienceLabel: { es: 'Para quién', en: 'Who it is for' },
    audience: [
      { es: 'Empresarios y propietarios de pymes', en: 'Business owners and SME founders' },
      { es: 'Gerencia y dirección', en: 'General management and directors' },
      { es: 'Responsables de área', en: 'Department heads' },
    ],
    focusLabel: { es: 'Qué se trata', en: 'What it covers' },
    focus: [
      { es: 'Qué puede hacer hoy la IA y qué no', en: 'What AI can and cannot do today' },
      { es: 'Oportunidades reales de aplicación en la empresa', en: 'Real opportunities to apply it in the company' },
      { es: 'Cómo identificar procesos susceptibles de mejora', en: 'How to spot processes worth improving' },
      { es: 'Productividad y automatización', en: 'Productivity and automation' },
      { es: 'Panorama de herramientas disponibles', en: 'An overview of the available tools' },
      { es: 'Privacidad, seguridad y riesgos', en: 'Privacy, security and risk' },
      { es: 'Criterios para decidir cuándo usar IA', en: 'Criteria for deciding when to use AI' },
      { es: 'Ejemplos reales aplicados a empresas', en: 'Real examples applied to companies' },
    ],
    outcomesLabel: { es: 'Con qué se sale', en: 'What you leave with' },
    outcomes: [
      {
        es: 'Un criterio propio para valorar dónde aplicar IA y dónde no',
        en: 'Your own criteria for judging where to apply AI and where not to',
      },
      {
        es: 'Una lista de procesos de la empresa candidatos a mejora',
        en: 'A list of company processes worth looking at first',
      },
      {
        es: 'Claridad sobre riesgos, límites y uso responsable',
        en: 'Clarity on risks, limits and responsible use',
      },
    ],
    cta: { es: 'Quiero esta formación', en: 'I want this session' },
    priceFrom: 450,
    priceIncludes: { es: 'adaptación básica incluida', en: 'basic tailoring included' },
  },
  {
    id: 'equipos',
    eyebrow: { es: 'Modalidad 2', en: 'Format 2' },
    title: { es: 'Workshop práctico de IA para equipos', en: 'Hands-on AI workshop for teams' },
    summary: {
      es:
        'Formación práctica en la que cada asistente trabaja con IA sobre tareas parecidas a las que ' +
        'hace durante su jornada. Se sale habiendo resuelto trabajo real, no habiendo visto una demo.',
      en:
        'Hands-on training where each attendee works with AI on tasks similar to the ones they do ' +
        'during their day. People leave having solved real work, not having watched a demo.',
    },
    duration: { es: '3 horas', en: '3 hours' },
    audienceLabel: { es: 'Para quién', en: 'Who it is for' },
    audience: [
      { es: 'Administración y gestión', en: 'Administration and back office' },
      { es: 'Comercial y marketing', en: 'Sales and marketing' },
      { es: 'Recursos humanos', en: 'Human resources' },
      { es: 'Operaciones y atención al cliente', en: 'Operations and customer service' },
    ],
    focusLabel: { es: 'Qué se practica', en: 'What you practise' },
    focus: [
      { es: 'Redactar y mejorar correos y textos', en: 'Writing and improving emails and copy' },
      { es: 'Resumir, analizar y extraer información de documentos y PDF', en: 'Summarising, analysing and extracting information from documents and PDFs' },
      { es: 'Preparar informes y propuestas', en: 'Preparing reports and proposals' },
      { es: 'Trabajar con hojas de cálculo y datos', en: 'Working with spreadsheets and data' },
      { es: 'Investigar y contrastar información', en: 'Researching and cross-checking information' },
      { es: 'Organizar conocimiento y preparar presentaciones', en: 'Organising knowledge and preparing presentations' },
      { es: 'Automatizar pequeñas tareas repetitivas', en: 'Automating small repetitive tasks' },
      { es: 'Usar bien ChatGPT, Claude o Gemini', en: 'Using ChatGPT, Claude or Gemini properly' },
    ],
    outcomesLabel: { es: 'Con qué se sale', en: 'What you leave with' },
    outcomes: [
      {
        es: 'Tareas del día a día resueltas en una fracción del tiempo habitual',
        en: 'Day-to-day tasks solved in a fraction of the usual time',
      },
      {
        es: 'Un método para pedir bien las cosas y revisar lo que devuelve',
        en: 'A method for asking well and reviewing what comes back',
      },
      {
        es: 'Criterio sobre qué información no debe salir de la empresa',
        en: 'Judgement about what information must not leave the company',
      },
    ],
    cta: { es: 'Quiero este workshop', en: 'I want this workshop' },
    priceFrom: 750,
    priceIncludes: {
      es: 'Grupos de distintos tamaños · formato adaptable',
      en: 'Groups of any size · adaptable format',
    },
    note: {
      es:
        'El workshop se puede hacer con grupos de distintos tamaños. En grupos reducidos da tiempo a ' +
        'dedicar más rato a preguntas, casos concretos y atención individual; para grupos numerosos ' +
        'adaptamos la dinámica y el formato de la sesión.',
      en:
        'The workshop runs with groups of any size. Smaller groups leave more room for questions, ' +
        'specific cases and individual attention; for larger groups we adapt the format and the ' +
        'way the session runs.',
    },
  },
  {
    id: 'pack',
    eyebrow: { es: 'Pack completo', en: 'Full package' },
    title: { es: 'Dirección + workshop', en: 'Management + workshop' },
    summary: {
      es:
        'Las dos sesiones, normalmente en la misma semana. La opción más completa para alinear ' +
        'primero a dirección y después llevar la IA al trabajo diario del equipo.',
      en:
        'Both sessions, usually in the same week. The most complete option: align management ' +
        'first, then take AI into the team’s daily work.',
    },
    duration: { es: '1,5 – 2 h + 3 h', en: '1.5 – 2 h + 3 h' },
    audienceLabel: { es: 'Para quién', en: 'Who it is for' },
    audience: [
      { es: 'Dirección y responsables', en: 'Management and team leads' },
      { es: 'Todo el equipo', en: 'The whole team' },
    ],
    focusLabel: { es: 'Qué incluye', en: 'What it includes' },
    focus: [
      { es: 'La sesión ejecutiva completa', en: 'The full executive session' },
      { es: 'El workshop práctico completo', en: 'The full hands-on workshop' },
      { es: 'Los casos del workshop alineados con lo decidido en la sesión de dirección', en: 'Workshop cases aligned with what was decided in the management session' },
      { es: 'Material de apoyo para los dos grupos', en: 'Support material for both groups' },
    ],
    outcomesLabel: { es: 'Con qué se sale', en: 'What you leave with' },
    outcomes: [
      {
        es: 'Una decisión tomada arriba y la capacidad de ejecutarla abajo',
        en: 'A decision made at the top and the ability to carry it out below',
      },
      {
        es: 'Todo el mundo con el mismo criterio sobre qué usar y qué no',
        en: 'Everyone with the same judgement about what to use and what not to',
      },
    ],
    cta: { es: 'Quiero el pack completo', en: 'I want the full package' },
    priceFrom: 1050,
    priceIncludes: { es: 'las dos sesiones', en: 'both sessions' },
    recommended: true,
  },
];

/** Objetivo declarado del workshop, en palabras del programa. */
export const trainingGoalQuote = {
  text: {
    es: 'Una tarea que antes requería 30 minutos puede resolverse en 5.',
    en: 'A task that used to take 30 minutes can be done in 5.',
  },
  caption: {
    es: 'El objetivo de la sesión, medido en tiempo de trabajo real.',
    en: 'The goal of the session, measured in real working time.',
  },
} as const;

/* ─────────────────── Ejemplos de aplicación ──────────────── */

export interface TrainingUseCase {
  /** Identificador del icono en `UseCaseGrid.astro`. */
  icon: string;
  title: Localized;
  text: Localized;
  /** Ejemplo concreto de tarea, en tipografía monoespaciada. */
  example: Localized;
}

export const trainingUseCases = {
  eyebrow: { es: 'Aplicaciones', en: 'Applications' },
  title: {
    es: 'Dónde se aplica dentro de una empresa',
    en: 'Where it applies inside a company',
  },
  intro: {
    es:
      'Estos son los frentes que aparecen en casi todas las empresas, sean del sector que sean. ' +
      'En el workshop se trabaja sobre los que más peso tienen en el día a día del equipo.',
    en:
      'These are the areas that show up in almost every company, whatever the sector. The workshop ' +
      'focuses on the ones that weigh most in the team’s daily work.',
  },
  items: [
    {
      icon: 'document',
      title: { es: 'Documentos y PDF', en: 'Documents and PDFs' },
      text: {
        es: 'Resumir, comparar y extraer los puntos que importan de documentos largos.',
        en: 'Summarising, comparing and pulling the points that matter out of long documents.',
      },
      example: {
        es: 'Resumir un pliego de 60 páginas y sacar los plazos',
        en: 'Summarise a 60-page tender and pull out the deadlines',
      },
    },
    {
      icon: 'mail',
      title: { es: 'Correo', en: 'Email' },
      text: {
        es: 'Redactar, responder y ajustar el tono sin perder la voz de la empresa.',
        en: 'Drafting, replying and adjusting tone without losing the company’s voice.',
      },
      example: {
        es: 'Responder a una reclamación con el tono adecuado',
        en: 'Reply to a complaint with the right tone',
      },
    },
    {
      icon: 'report',
      title: { es: 'Informes', en: 'Reports' },
      text: {
        es: 'Pasar de notas sueltas y datos dispersos a un documento presentable.',
        en: 'Going from loose notes and scattered data to a presentable document.',
      },
      example: {
        es: 'Convertir las notas de una visita en un informe',
        en: 'Turn visit notes into a written report',
      },
    },
    {
      icon: 'table',
      title: { es: 'Hojas de cálculo y datos', en: 'Spreadsheets and data' },
      text: {
        es: 'Limpiar, cruzar y entender datos sin necesidad de saber programar.',
        en: 'Cleaning, cross-checking and understanding data without knowing how to code.',
      },
      example: {
        es: 'Explicar qué cambió en las ventas del trimestre',
        en: 'Explain what changed in this quarter’s sales',
      },
    },
    {
      icon: 'sales',
      title: { es: 'Comercial', en: 'Sales' },
      text: {
        es: 'Preparar propuestas, seguimientos y material adaptado a cada cliente.',
        en: 'Preparing proposals, follow-ups and material adapted to each client.',
      },
      example: {
        es: 'Adaptar una propuesta base a un cliente concreto',
        en: 'Adapt a base proposal to a specific client',
      },
    },
    {
      icon: 'automation',
      title: { es: 'Automatización', en: 'Automation' },
      text: {
        es: 'Detectar la tarea repetitiva que se hace cada semana y quitarla de en medio.',
        en: 'Spotting the repetitive task done every week and getting it out of the way.',
      },
      example: {
        es: 'Clasificar y preparar los pedidos que entran por correo',
        en: 'Sort and prepare the orders that arrive by email',
      },
    },
  ] satisfies TrainingUseCase[],
} as const;

/* ────────────────── Contacto directo ─────────────────── */

/**
 * Vías de contacto inmediato.
 *
 * La página se visita casi siempre después de haber hablado conmigo (referido,
 * tarjeta con QR), y en ese contexto casi nadie rellena un formulario: escribe
 * o llama. `whatsapp` va en formato internacional sin signos, por ejemplo
 * '34600112233'. Con `null` el botón no se renderiza.
 */
export const trainingContact = {
  whatsapp: '34651042877' as string | null,
  whatsappLabel: { es: 'Escríbeme por WhatsApp', en: 'Message me on WhatsApp' },
  whatsappMessage: {
    es: 'Hola Adrián, te escribo por la formación en IA para empresas.',
    en: 'Hi Adrián, I am writing about the AI training for companies.',
  },
  formLabel: { es: 'Prefiero escribir los detalles', en: 'I would rather write the details' },
  /** Rótulo del botón cuando todavía no hay WhatsApp configurado. */
  requestLabel: { es: 'Solicitar información', en: 'Request information' },
} as const;

/* ──────────────── Precio de referencia ──────────────── */

export const trainingPricing = {
  eyebrow: { es: 'Presupuesto', en: 'Pricing' },
  title: { es: 'Qué cuesta', en: 'What it costs' },
  intro: {
    es:
      'Presupuesto cerrado por sesión, no por hora. Se adapta a la modalidad, el formato, el ' +
      'tamaño del grupo y el nivel de personalización.',
    en:
      'A closed price per session, not per hour. It adapts to the format, how the session runs, ' +
      'the size of the group and the level of tailoring.',
  },
  from: { es: 'desde', en: 'from' },
  vat: { es: '+ IVA', en: '+ VAT' },
  recommended: { es: 'Recomendado', en: 'Recommended' },
  contentsLabel: { es: 'Ver contenidos', en: 'See contents' },

  /** Formatos menos habituales. Se listan aparte y con menos peso visual. */
  otherLabel: { es: 'Otras modalidades', en: 'Other formats' },
  other: [
    {
      title: { es: 'Media jornada', en: 'Half day' },
      duration: { es: '4 h', en: '4 h' },
      priceFrom: 950,
    },
    {
      title: { es: 'Jornada completa', en: 'Full day' },
      duration: { es: '6 – 7 h', en: '6 – 7 h' },
      priceFrom: 1500,
    },
    {
      title: { es: 'Sesión de seguimiento', en: 'Follow-up session' },
      duration: { es: '60 min', en: '60 min' },
      priceFrom: 150,
      exact: true,
    },
  ],

  conditionsLabel: { es: 'Condiciones', en: 'Terms' },
  conditions: [
    { es: 'Personalización básica de los ejemplos incluida.', en: 'Basic tailoring of the examples included.' },
    {
      es: 'Personalización avanzada o análisis previo específico: desde +200 €.',
      en: 'Advanced tailoring or a specific prior analysis: from +200 € extra.',
    },
    {
      es: 'Los desplazamientos largos, dietas y alojamiento se presupuestan aparte.',
      en: 'Long journeys, meals and accommodation are quoted separately.',
    },
    {
      es: 'Grupos grandes o necesidades especiales: presupuesto personalizado.',
      en: 'Large groups or special requirements: custom quote.',
    },
    {
      es: 'Los precios son orientativos y pueden variar según la personalización.',
      en: 'Prices are indicative and may vary depending on tailoring.',
    },
  ],

  note: {
    es: 'Incluye preparar los casos con documentos de vuestra actividad y el material de apoyo.',
    en: 'Includes preparing the cases with documents from your own activity, and the support material.',
  },
} as const;

/* ───────────── El argumento: horas de trabajo ───────────── */

/**
 * El bloque que el interlocutor necesita para defender la propuesta
 * internamente, cuando yo ya no estoy delante.
 *
 * Los tiempos no son una promesa comercial: son tareas que se resuelven
 * durante la propia sesión, con documentos de la empresa. Se comprueban ahí
 * mismo.
 */
export const trainingImpact = {
  eyebrow: { es: 'El argumento', en: 'The case for it' },
  title: {
    es: 'Lo que se ahorra, medido en horas de trabajo',
    en: 'What it saves, measured in working hours',
  },
  intro: {
    es:
      'Durante la sesión veremos cómo aplicar la IA a este tipo de tareas para reducir de forma ' +
      'notable el tiempo necesario, trabajando con documentos reales de la empresa.',
    en:
      'During the session we look at how to apply AI to this kind of task to cut the time it takes ' +
      'substantially, working with the company’s own documents.',
  },
  tasks: [
    {
      task: {
        es: 'Resumir un pliego de 60 páginas y extraer plazos y requisitos',
        en: 'Summarise a 60-page tender and pull out deadlines and requirements',
      },
      before: { es: '45 min', en: '45 min' },
      after: { es: '6 min', en: '6 min' },
    },
    {
      task: {
        es: 'Convertir las notas de una visita en un informe presentable',
        en: 'Turn visit notes into a presentable report',
      },
      before: { es: '30 min', en: '30 min' },
      after: { es: '5 min', en: '5 min' },
    },
    {
      task: {
        es: 'Adaptar una propuesta base a un cliente concreto',
        en: 'Adapt a base proposal to a specific client',
      },
      before: { es: '40 min', en: '40 min' },
      after: { es: '8 min', en: '8 min' },
    },
    {
      task: {
        es: 'Redactar la respuesta a una reclamación con el tono adecuado',
        en: 'Draft the reply to a complaint with the right tone',
      },
      before: { es: '20 min', en: '20 min' },
      after: { es: '4 min', en: '4 min' },
    },
  ],
  beforeLabel: { es: 'Antes', en: 'Before' },
  afterLabel: { es: 'Después', en: 'After' },
  /**
   * Los tiempos salen de tareas que se resuelven en la propia sesión, pero
   * varían mucho según quién y con qué. Decirlo aquí evita que la tabla se lea
   * como una promesa de resultado.
   */
  disclaimer: {
    es:
      'Tiempos orientativos utilizados como ejemplo. El ahorro real puede variar según la tarea, la ' +
      'experiencia del usuario, la información disponible y el nivel de revisión necesario.',
    en:
      'Indicative timings, used as an example. The real saving can vary with the task, the user’s ' +
      'experience, the information available and the level of review needed.',
  },
  /** La aritmética queda a la vista para que cada cual ponga sus números. */
  math: {
    title: { es: 'Haced el cálculo con vuestros números', en: 'Run the numbers for your team' },
    text: {
      es:
        'Si diez personas dedican dos horas a la semana a tareas de este tipo y pasan a ' +
        'resolverlas en una fracción del tiempo, la cuenta sale sola. Ese es el criterio para ' +
        'decidir si la formación se paga o no.',
      en:
        'If ten people spend two hours a week on tasks like these and start solving them in a ' +
        'fraction of the time, the maths speaks for itself. That is the yardstick for deciding ' +
        'whether the training pays for itself.',
    },
  },
} as const;

/* ───────────── Qué hace falta el día de la sesión ────────── */

export const trainingSessionDay = {
  eyebrow: { es: 'El día de la sesión', en: 'On the day' },
  title: { es: 'Qué hace falta', en: 'What you need' },
  intro: {
    es: 'Nada especial, pero conviene tenerlo previsto para no perder tiempo.',
    en: 'Nothing unusual, but worth arranging in advance so no time is lost.',
  },
  items: [
    {
      title: { es: 'Una sala con pantalla o proyector', en: 'A room with a screen or projector' },
      text: {
        es: 'También se puede hacer online, por videollamada.',
        en: 'It can also run online, over a video call.',
      },
    },
    {
      title: { es: 'Un portátil por asistente', en: 'One laptop per attendee' },
      text: {
        es: 'En el workshop cada persona trabaja con sus manos; nadie mira.',
        en: 'In the workshop everyone works hands-on; nobody just watches.',
      },
    },
    {
      title: { es: 'Conexión a internet', en: 'An internet connection' },
      text: {
        es: 'Las herramientas funcionan en el navegador. No hay que instalar nada.',
        en: 'The tools run in the browser. Nothing to install.',
      },
    },
    {
      title: { es: 'Documentos reales, si es posible', en: 'Real documents, if possible' },
      text: {
        es: 'Trabajar con vuestros propios documentos es lo que hace que la sesión sirva al día siguiente.',
        en: 'Working with your own documents is what makes the session useful the next day.',
      },
    },
  ],
} as const;

/* ────────────────── Para quién no es ──────────────────── */

export const trainingNotFor = {
  eyebrow: { es: 'Con franqueza', en: 'Plainly' },
  title: { es: 'Para quién no es esta formación', en: 'Who this training is not for' },
  intro: {
    es: 'Prefiero decirlo antes que después. Si estáis en alguno de estos casos, no os hago perder el tiempo.',
    en: 'Better said now than later. If you are in any of these cases, I will not waste your time.',
  },
  items: [
    {
      es: 'Equipos técnicos que ya usan estas herramientas a diario. Se aburrirían.',
      en: 'Technical teams already using these tools daily. They would be bored.',
    },
    {
      es: 'Quien busca una charla de tendencias o una sesión motivacional. Esto es trabajo con las manos.',
      en: 'Anyone after a trends talk or a motivational session. This is hands-on work.',
    },
    {
      es: 'Quien necesita desarrollar un producto de IA a medida. Eso es otro servicio: también lo hago, pero no es esto.',
      en: 'Anyone who needs a custom AI product built. That is a different service — I do it too, but this is not it.',
    },
    {
      es: 'Quien espera que la IA arregle un proceso que ya está roto sin cambiar nada más.',
      en: 'Anyone expecting AI to fix an already broken process without changing anything else.',
    },
  ],
} as const;

/* ──────────────── Preguntas frecuentes ──────────────── */

/** Las objeciones que salen en la conversación interna, cuando yo no estoy. */
export const trainingFaq = {
  eyebrow: { es: 'Preguntas frecuentes', en: 'Frequently asked' },
  title: { es: 'Lo que suelen preguntarme', en: 'What people usually ask' },
  items: [
    {
      question: { es: '¿Y si el equipo no tiene nivel técnico?', en: 'What if the team is not technical?' },
      answer: {
        es:
          'Es justo el público al que va dirigida. No se programa ni se configura nada: se escribe ' +
          'en un cuadro de texto. Quien maneja el correo y el Word puede seguir la sesión.',
        en:
          'That is exactly who it is for. Nothing is programmed or configured: you type into a text ' +
          'box. Anyone who handles email and Word can follow the session.',
      },
    },
    {
      question: {
        es: '¿Esto pone en riesgo los datos de nuestros clientes?',
        en: 'Does this put our client data at risk?',
      },
      answer: {
        es:
          'Es una parte del temario, no una nota al pie. Se explica qué información no debe salir de ' +
          'la empresa, qué diferencia hay entre una cuenta personal y una de empresa, y cómo trabajar ' +
          'con documentos sensibles sin exponerlos.',
        en:
          'It is part of the syllabus, not a footnote. We cover what information must not leave the ' +
          'company, the difference between a personal and a business account, and how to work with ' +
          'sensitive documents without exposing them.',
      },
    },
    {
      question: {
        es: '¿Hay que comprar licencias o herramientas?',
        en: 'Do we need to buy licences or tools?',
      },
      answer: {
        es:
          'Para la sesión no: se trabaja con las versiones gratuitas. Al terminar sabréis qué merece ' +
          'la pena pagar en vuestro caso y qué no, que es una decisión distinta en cada empresa.',
        en:
          'Not for the session: we work with the free versions. By the end you will know what is worth ' +
          'paying for in your case and what is not — a different decision for every company.',
      },
    },
    {
      question: { es: '¿Y si después nadie lo usa?', en: 'What if nobody uses it afterwards?' },
      answer: {
        es:
          'Es el riesgo real de cualquier formación, y por eso la sesión se hace sobre tareas que el ' +
          'equipo tiene encima de la mesa esa misma semana. Salir con trabajo real ya resuelto es lo ' +
          'que hace que al día siguiente se vuelva a abrir la herramienta.',
        en:
          'It is the real risk with any training, which is why the session works on tasks the team has ' +
          'on their desk that same week. Leaving with real work already done is what makes people open ' +
          'the tool again the next day.',
      },
    },
    {
      question: { es: '¿Presencial u online?', en: 'On-site or online?' },
      answer: {
        es:
          'Las dos cosas. Presencial funciona mejor para el workshop, porque puedo pasar por los puestos ' +
          'cuando alguien se atasca. La sesión de dirección va bien en cualquiera de los dos formatos.',
        en:
          'Both. On-site works better for the workshop, since I can step in when someone gets stuck. The ' +
          'management session works well either way.',
      },
    },
    {
      question: { es: '¿Cuántas personas pueden asistir?', en: 'How many people can attend?' },
      answer: {
        es:
          'No hay un límite estricto. El formato se adapta al tamaño del grupo. Con equipos ' +
          'reducidos puedo dedicar más tiempo a preguntas, casos concretos y atención individual; ' +
          'en grupos numerosos adapto la dinámica para que la sesión siga siendo útil para todos.',
        en:
          'There is no strict limit. The format adapts to the size of the group. With smaller teams ' +
          'I can spend more time on questions, specific cases and individual attention; with larger ' +
          'groups I adapt the exercises so the session stays useful for everyone.',
      },
    },
  ],
} as const;

/* ──────────────────── Cómo funciona ───────────────────── */

export const trainingProcess = {
  eyebrow: { es: 'Cómo funciona', en: 'How it works' },
  title: {
    es: 'De la primera conversación a la sesión',
    en: 'From the first conversation to the session',
  },
  intro: {
    es: 'Un proceso corto y sin burocracia. La preparación es mía; el tiempo del equipo se gasta en la sesión.',
    en: 'A short process with no bureaucracy. The preparation is on me; the team’s time goes into the session.',
  },
  steps: [
    {
      title: { es: 'Conversación inicial', en: 'First conversation' },
      text: {
        es: 'Una llamada breve para saber qué necesitáis y si esta formación es lo que os conviene.',
        en: 'A short call to understand what you need and whether this training is the right fit.',
      },
    },
    {
      title: { es: 'Actividad y necesidades', en: 'Activity and needs' },
      text: {
        es: 'Reviso a qué se dedica la empresa, qué perfiles asisten y qué tareas pesan más en su día.',
        en: 'I look at what the company does, who is attending and which tasks weigh most in their day.',
      },
    },
    {
      title: { es: 'Adaptación de ejemplos', en: 'Adapting the examples' },
      text: {
        es: 'Preparo los casos con documentos y situaciones parecidos a los vuestros, no genéricos.',
        en: 'I prepare the cases with documents and situations close to yours, not generic ones.',
      },
    },
    {
      title: { es: 'Sesión', en: 'The session' },
      text: {
        es: 'La formación, presencial u online, con todo el mundo trabajando sobre casos reales.',
        en: 'The training itself, on-site or online, with everyone working on real cases.',
      },
    },
    {
      title: { es: 'Material de apoyo', en: 'Support material' },
      text: {
        es: 'Los asistentes se llevan un resumen y los ejemplos para poder seguir usándolos al día siguiente.',
        en: 'Attendees leave with a summary and the examples so they can keep using them the next day.',
      },
    },
  ],
} as const;

/* ────────────────────────── Sobre mí ──────────────────────── */

export const trainingAbout = {
  eyebrow: { es: 'Quién la imparte', en: 'Who runs it' },
  title: {
    es: 'Formación impartida por alguien que trabaja con esto todos los días',
    en: 'Training run by someone who works with this every day',
  },
  paragraphs: [
    {
      es:
        'Soy ingeniero de software especializado en inteligencia artificial. Llevo más de doce años ' +
        'en el sector, liderando equipos y proyectos de transformación digital para empresas públicas ' +
        'y privadas, y trabajo a diario construyendo sistemas que usan modelos de lenguaje.',
      en:
        'I am a software engineer specialised in artificial intelligence. I have spent more than twelve ' +
        'years in the industry, leading teams and digital transformation projects for public and private ' +
        'companies, and I work daily building systems that use language models.',
    },
    {
      es:
        'Esa es toda la diferencia: lo que se cuenta en la sesión sale de aplicarlo en proyectos reales, ' +
        'no de repetir titulares. Y por eso también se explica con claridad qué no conviene hacer.',
      en:
        'That is the whole difference: what is covered in the session comes from applying it on real ' +
        'projects, not from repeating headlines. Which is also why it is clear about what not to do.',
    },
  ],
  cta: { es: 'Ver mi trayectoria completa', en: 'See my full background' },
} as const;

/* ─────────────────────── Cierre y contacto ────────────────── */

export const trainingClosing = {
  eyebrow: { es: 'Siguiente paso', en: 'Next step' },
  title: {
    es: '¿Quieres descubrir cómo puede utilizar IA tu empresa?',
    en: 'Want to find out how your company could use AI?',
  },
  text: {
    es:
      'Cuéntame a qué se dedica tu empresa y qué te gustaría mejorar. Respondo con una propuesta ' +
      'concreta de modalidad, duración y contenidos.',
    en:
      'Tell me what your company does and what you would like to improve. I will reply with a concrete ' +
      'proposal of format, duration and content.',
  },
} as const;

export const trainingForm = {
  title: { es: 'Solicitar información', en: 'Request information' },
  intro: {
    es: 'Cuéntame lo que necesitáis y te respondo con una propuesta concreta.',
    en: 'Tell me what you need and I will reply with a concrete proposal.',
  },
  fields: {
    name: { label: { es: 'Nombre', en: 'Name' }, placeholder: { es: 'Nombre y apellidos', en: 'Full name' } },
    company: { label: { es: 'Empresa', en: 'Company' }, placeholder: { es: 'Nombre de la empresa', en: 'Company name' } },
    email: { label: { es: 'Email', en: 'Email' }, placeholder: { es: 'nombre@empresa.com', en: 'name@company.com' } },
    attendees: {
      label: { es: 'Asistentes aproximados', en: 'Approximate attendees' },
      placeholder: { es: 'Por ejemplo, 12', en: 'For example, 12' },
    },
    format: { label: { es: 'Modalidad', en: 'Format' } },
    message: {
      label: { es: 'Mensaje', en: 'Message' },
      placeholder: {
        es: 'A qué se dedica la empresa y qué te gustaría mejorar.',
        en: 'What your company does and what you would like to improve.',
      },
    },
  },
  formatOptions: [
    { value: 'direccion', label: { es: 'IA para dirección', en: 'AI for management' } },
    { value: 'equipos', label: { es: 'Workshop para equipos', en: 'Workshop for teams' } },
    { value: 'indeciso', label: { es: 'No estoy seguro', en: 'Not sure yet' } },
  ],
  optional: { es: 'opcional', en: 'optional' },
  submit: { es: 'Solicitar información', en: 'Request information' },
  /** Estados del envío. El formulario no navega: responde en su sitio. */
  status: {
    sending: { es: 'Enviando…', en: 'Sending…' },
    success: {
      es: 'Solicitud enviada. Te respondo en breve.',
      en: 'Request sent. I will get back to you shortly.',
    },
    error: {
      es: 'No se ha podido enviar. Inténtalo de nuevo en unos minutos.',
      en: 'It could not be sent. Please try again in a few minutes.',
    },
    invalid: {
      es: 'Revisa los datos: falta algún campo o el email no es válido.',
      en: 'Check the details: a field is missing or the email is not valid.',
    },
    rateLimit: {
      es: 'Se han enviado demasiadas solicitudes desde esta conexión. Prueba dentro de un rato.',
      en: 'Too many requests were sent from this connection. Try again later.',
    },
  },
  privacy: {
    es: 'Los datos se usan solo para responderte. No se almacenan en esta web ni se ceden a terceros.',
    en: 'Your details are used only to reply. They are not stored on this site or shared with third parties.',
  },
} as const;

/* ────────────────────── Interfaz y navegación ─────────────── */

export const trainingUi = {
  skipToContent: { es: 'Ir al contenido', en: 'Skip to content' },
} as const;
