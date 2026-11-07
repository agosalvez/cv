/**
 * Contenido de la portada (`/`).
 *
 * La portada es la puerta de entrada para quien llega sin contexto: dice en
 * una pantalla qué ofrezco y cómo contactar. El CV sigue en `/es` y `/en`,
 * y aquí queda como enlace secundario.
 *
 * Solo en español: el público de los servicios está en España. Quien busque
 * el perfil en inglés tiene el enlace al CV en inglés al pie.
 *
 * Todo el texto vive en este archivo; `src/pages/index.astro` solo lo pinta.
 */
import { experienceYears } from './experience';
import { trainingContact, trainingPrograms, trainingRoutes } from './training';

/** Enlace a WhatsApp con el mensaje inicial ya escrito. */
export const whatsappLink = (message: string): string | null =>
  trainingContact.whatsapp
    ? `https://wa.me/${trainingContact.whatsapp}?text=${encodeURIComponent(message)}`
    : null;

/** El precio de entrada sale de las modalidades publicadas: no se duplica a mano. */
const trainingPriceFrom = Math.min(
  ...trainingPrograms.map((program) => program.priceFrom).filter((price): price is number => price !== null),
);

export const homeSeo = {
  title: 'Adrián Gosálvez — IA aplicada para empresas y developers',
  description:
    `AI Engineer y Tech Lead con más de ${experienceYears} años en el sector. Formación en IA para empresas ` +
    'y mentoría para developers.',
};

export const homeHero = {
  eyebrow: 'AI Engineer · Tech Lead · Valencia',
  title: 'Inteligencia artificial aplicada al trabajo real, de la mano de quien la construye',
  intro:
    `Llevo más de ${experienceYears} años desarrollando software y liderando equipos, y hoy construyo sistemas de IA ` +
    'que funcionan en producción. Esa experiencia la pongo al servicio de empresas que quieren usar la ' +
    'IA con criterio y de developers que quieren crecer con ella.',
  whatsappLabel: 'Escríbeme por WhatsApp',
  whatsappMessage: 'Hola Adrián, te escribo desde tu web.',
  cvLabel: 'Ver mi trayectoria',
  linkedinLabel: 'LinkedIn',
};

/** Datos de respaldo. Todos salen del CV; ninguno es una promesa. */
export const homeFacts = [
  { value: `+${experienceYears} años`, label: 'en el sector, de developer a Tech Lead' },
  { value: 'IA en producción', label: 'LLMs y RAG en sistemas reales' },
  { value: 'Máster en IA', label: 'Universidad Alfonso X el Sabio' },
];

export interface HomeService {
  /** Identificador estable: también es el nombre del evento en la analítica. */
  id: 'formacion' | 'mentoria';
  title: string;
  text: string;
  /** Precio orientativo. Solo se muestra cuando está publicado. */
  price?: string;
  cta: string;
  /** Página propia, o `null` si el contacto va directo a WhatsApp. */
  href: string | null;
  whatsappMessage: string;
}

export const homeServices: HomeService[] = [
  {
    id: 'formacion',
    title: 'Formación en IA para empresas',
    text:
      'Sesiones para dirección y workshops prácticos para equipos, trabajando con las tareas y los ' +
      'documentos reales de la empresa.',
    price: `Desde ${trainingPriceFrom.toLocaleString('es-ES')} € + IVA`,
    cta: 'Ver la formación',
    href: trainingRoutes.es,
    whatsappMessage: trainingContact.whatsappMessage.es,
  },
  {
    id: 'mentoria',
    title: 'Mentoría para developers',
    text:
      'Para developers que quieren dar el salto a senior aprendiendo a trabajar con IA de verdad: ' +
      'criterio técnico, arquitectura y un flujo de trabajo que se nota en el día a día.',
    cta: 'Pregúntame',
    href: null,
    whatsappMessage: 'Hola Adrián, te escribo por la mentoría para developers.',
  },
];

export const homeFooter = {
  englishLabel: 'CV in English',
};
