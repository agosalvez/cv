/**
 * Años de experiencia profesional, calculados a partir de las fechas del CV.
 *
 * Es la única fuente de la cifra: el CV, la portada y la formación la toman
 * de aquí, así que no se contradicen y suben solas con el tiempo. Se cuentan
 * los periodos trabajados sin sumar dos veces los que se solapan.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

interface Experience {
  startDate?: string;
  endDate?: string;
}

export function totalExpYears(exps: Experience[], now = Date.now()): number {
  const intervals = exps
    .filter((e): e is Experience & { startDate: string } => Boolean(e.startDate))
    .map((e) => ({
      start: new Date(e.startDate + '-01').getTime(),
      end: e.endDate ? new Date(e.endDate + '-01').getTime() : now,
    }))
    .sort((a, b) => a.start - b.start);

  const merged: { start: number; end: number }[] = [];
  for (const iv of intervals) {
    const last = merged[merged.length - 1];
    if (!last || iv.start > last.end) merged.push({ ...iv });
    else last.end = Math.max(last.end, iv.end);
  }

  const totalMs = merged.reduce((acc, iv) => acc + (iv.end - iv.start), 0);
  return Math.floor(totalMs / (1000 * 60 * 60 * 24 * 365.25));
}

const { experiences } = JSON.parse(readFileSync(join(process.cwd(), 'src/data/cv.json'), 'utf8'));

export const experienceYears = totalExpYears(experiences);
