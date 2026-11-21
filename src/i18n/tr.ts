// Escolhe o texto do idioma atual: tr(idioma, { pt: '…', en: '…', es: '…' }).
import type { Idioma } from '../data/site';

export function tr<T>(idioma: Idioma, textos: Record<Idioma, T>): T {
  return textos[idioma];
}
