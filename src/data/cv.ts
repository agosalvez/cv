import data from './cv.json';

export type Lang = 'es' | 'en';

// Re-exportamos la data tipada para uso en las páginas Astro
export const cvData = data;

export const { personal, about, experiences, education, skillGroups, certifications, publications, languages } = data;
