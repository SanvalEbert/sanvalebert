// Dados gerais do site: idiomas, menu, redes e contato.

export const idiomas = ['pt', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

export const idiomaPadrao: Idioma = 'pt';

/** Código usado no atributo lang do HTML. */
export const codigoHtml: Record<Idioma, string> = { pt: 'pt-BR', en: 'en' };

/**
 * Páginas do site. `pronta: false` mantém o item no menu, mas sem link,
 * até a página ser implementada.
 */
export const paginas = {
  inicio: { rota: { pt: '', en: 'en/' }, pronta: true },
  sobre: { rota: { pt: 'sobre/', en: 'en/about/' }, pronta: false },
  pesquisa: { rota: { pt: 'pesquisa/', en: 'en/research/' }, pronta: true },
  estudantes: { rota: { pt: 'estudantes/', en: 'en/students/' }, pronta: true },
  palestras: { rota: { pt: 'palestras/', en: 'en/talks/' }, pronta: true },
  cursos: { rota: { pt: 'cursos/', en: 'en/courses/' }, pronta: false },
  radar: { rota: { pt: 'radar/', en: 'en/radar/' }, pronta: false },
  contratar: { rota: { pt: 'contratar/', en: 'en/hire/' }, pronta: true },
} as const;

export type Pagina = keyof typeof paginas;

/** Ordem e numeração do menu, iguais em todos os canais. */
export const menu: Pagina[] = ['sobre', 'pesquisa', 'estudantes', 'palestras', 'cursos', 'radar'];

/** Canal de conversa usado na página Contratar enquanto não há formulário. */
export const contatoProvisorio = 'https://www.linkedin.com/in/sanval-ebert/';

export const registrosAmsterdam = {
  instagram: 'https://www.instagram.com/p/DfsskpaiBcC/?img_index=1',
  linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7526970043797037056/',
} as const;

export const referencias = [
  { nome: 'LinkedIn', url: 'https://www.linkedin.com/in/sanval-ebert/' },
  { nome: 'Instagram', url: 'https://www.instagram.com/sanvalebert/' },
  { nome: 'YouTube', url: 'https://www.youtube.com/@SanvalEbert' },
  { nome: 'Lattes', url: 'https://lattes.cnpq.br/6700242085425421' },
  { nome: 'ORCID', url: 'https://orcid.org/0000-0003-3196-6468' },
  { nome: 'Google Scholar', url: 'https://scholar.google.com.br/citations?user=QT7zAOIAAAAJ' },
  { nome: 'ResearchGate', url: 'https://www.researchgate.net/profile/Sanval-Ebert-De-Santos' },
];

/** Monta o endereço de uma rota respeitando o caminho base da hospedagem. */
export function endereco(rota: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${rota}`;
}

/** Endereço de uma página em um idioma, ou o contato provisório se ela ainda não existe. */
export function link(pagina: Pagina, idioma: Idioma): string {
  const p = paginas[pagina];
  if (pagina === 'sobre' && !p.pronta) return endereco(paginas.inicio.rota[idioma]) + '#sobre';
  if (!p.pronta && pagina === 'contratar') return contatoProvisorio;
  return endereco(p.rota[idioma]);
}
