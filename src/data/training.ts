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
    note: {
      es: 'Los casos y ejemplos se adaptan parcialmente a la actividad de la empresa.',
      en: 'Cases and examples are partly adapted to the company’s activity.',
    },
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
      icon: 'search',
      title: { es: 'Investigación', en: 'Research' },
      text: {
        es: 'Reunir información sobre un mercado, un proveedor o una normativa, y contrastarla.',
        en: 'Gathering information on a market, a supplier or a regulation, and cross-checking it.',
      },
      example: {
        es: 'Preparar una ficha de un cliente antes de una reunión',
        en: 'Prepare a client briefing before a meeting',
      },
    },
    {
      icon: 'support',
      title: { es: 'Atención al cliente', en: 'Customer service' },
      text: {
        es: 'Respuestas consistentes a las preguntas que se repiten cada semana.',
        en: 'Consistent answers to the questions that repeat every week.',
      },
      example: {
        es: 'Unificar las respuestas a las 20 dudas más frecuentes',
        en: 'Unify the answers to the 20 most frequent questions',
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
      icon: 'slides',
      title: { es: 'Presentaciones', en: 'Presentations' },
      text: {
        es: 'Estructurar el guion y los contenidos antes de abrir la herramienta de diapositivas.',
        en: 'Structuring the script and content before opening the slide tool.',
      },
      example: {
        es: 'Montar el guion de una presentación a partir de un informe',
        en: 'Build a talk outline from an existing report',
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
    {
      icon: 'knowledge',
      title: { es: 'Gestión del conocimiento', en: 'Knowledge management' },
      text: {
        es: 'Que lo que sabe la empresa deje de estar solo en la cabeza de dos personas.',
        en: 'So what the company knows stops living only in two people’s heads.',
      },
      example: {
        es: 'Documentar un procedimiento interno a partir de una grabación',
        en: 'Document an internal procedure from a recording',
      },
    },
  ] satisfies TrainingUseCase[],
} as const;

/* ────────────────────── Cómo funciona ─────────────────────── */

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
