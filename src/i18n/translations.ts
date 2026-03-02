export type Lang = 'es' | 'en';

export const ui = {
  es: {
    'nav.experience': 'Experiencia',
    'nav.education': 'Educación',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',

    'section.about': 'Sobre mí',
    'section.experience': 'Experiencia',
    'section.education': 'Educación',
    'section.certifications': 'Certificaciones',
    'section.publications': 'Publicaciones',
    'section.languages': 'Idiomas',

    'about.text':
      'Ingeniero en Inteligencia Artificial con más de 12 años de experiencia en desarrollo de software, ' +
      'arquitectura IT y gestión de proyectos tecnológicos. ' +
      'Ha liderado equipos en procesos de transformación digital para empresas de sectores públicos y privados, ' +
      'especializándose en JavaScript, Node.js, DevOps y automatización de procesos. ' +
      'Su enfoque combina la eficiencia operativa con la innovación tecnológica para diseñar e implementar ' +
      'soluciones escalables, fiables y alineadas con los objetivos de negocio.',

    'contact.location': 'Valencia, España',

    'section.preferences':   'Qué busco',
    'section.portfolio':     'Portfolio',
    'section.references':    'Referencias',

    'badge.current': 'Actual',
    'badge.award': 'Premio Meninas 2017',
  },
  en: {
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    'section.about': 'About',
    'section.experience': 'Experience',
    'section.education': 'Education',
    'section.certifications': 'Certifications',
    'section.publications': 'Publications',
    'section.languages': 'Languages',

    'about.text':
      'AI Engineer with 12+ years of experience in software development, IT architecture, and technology project management. ' +
      'Has led teams through digital transformation processes in both public and private sectors, ' +
      'specializing in JavaScript, Node.js, DevOps, and process automation. ' +
      'His approach combines operational efficiency with technological innovation to design and implement ' +
      'scalable, reliable solutions aligned with business objectives.',

    'contact.location': 'Valencia, Spain',

    'section.preferences':   'What I look for',
    'section.portfolio':     'Portfolio',
    'section.references':    'References',

    'badge.current': 'Current',
    'badge.award': 'Premio Meninas 2017',
  },
} as const;

export function t(lang: Lang, key: keyof typeof ui['es']): string {
  return ui[lang][key];
}
