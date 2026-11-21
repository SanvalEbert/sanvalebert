// Dicas e treinamentos indicados na página inicial (seção "Dicas e treinamentos").
// Cada item leva a um link externo. Os títulos e resumos são escritos aqui, com
// suas palavras, e não copiados da fonte.
// Com `rascunho: true`, o item aparece apenas no servidor local (npm run dev).
// Se não houver itens publicados, a seção não aparece no site.

import type { Idioma } from './site';

type Texto = Record<Idioma, string>;

export type Categoria = 'tecnologia' | 'educacao' | 'treinamento';

export const categorias: Record<Categoria, Texto> = {
  tecnologia: { pt: 'Tecnologia', en: 'Technology' },
  educacao: { pt: 'Educação', en: 'Education' },
  treinamento: { pt: 'Treinamento', en: 'Training' },
};

export interface Noticia {
  categoria: Categoria;
  titulo: Texto;
  resumo: Texto;
  /** Nome do veículo ou da empresa que oferece o treinamento. */
  fonte: string;
  /** Até três etiquetas curtas, por exemplo 'Gratuito'. */
  etiquetas?: Texto[];
  /** Data no formato AAAA-MM-DD, para notícias. Plataformas permanentes não levam data. */
  data?: string;
  url: string;
  rascunho?: boolean;
}

const todas: Noticia[] = [
  {
    categoria: 'treinamento',
    titulo: { pt: 'Microsoft Learn', en: 'Microsoft Learn' },
    resumo: {
      pt: 'Trilhas gratuitas da Microsoft sobre nuvem, dados e IA, com preparação para certificações.',
      en: 'Free Microsoft learning paths on cloud, data and AI, with certification preparation.',
    },
    fonte: 'Microsoft',
    etiquetas: [{ pt: 'Gratuito', en: 'Free' }, { pt: 'Certificações', en: 'Certifications' }],
    url: 'https://www.microsoft.com/pt-br/microsoft-learn',
  },
  {
    categoria: 'treinamento',
    titulo: { pt: 'AWS Skill Builder', en: 'AWS Skill Builder' },
    resumo: {
      pt: 'Centro de aprendizagem da AWS, com cursos gratuitos de computação em nuvem e IA para todos os níveis.',
      en: 'AWS learning center with free cloud computing and AI courses for every level.',
    },
    fonte: 'Amazon Web Services',
    etiquetas: [{ pt: 'Cursos gratuitos', en: 'Free courses' }, { pt: 'Nuvem e IA', en: 'Cloud and AI' }],
    url: 'https://skillbuilder.aws/',
  },
  {
    categoria: 'treinamento',
    titulo: { pt: 'Fortinet Training Institute', en: 'Fortinet Training Institute' },
    resumo: {
      pt: 'Cursos gratuitos de cibersegurança, no seu ritmo: redes seguras, segurança em nuvem, operações com IA e zero trust, com trilha para as certificações NSE.',
      en: 'Free self-paced cybersecurity courses: secure networking, cloud security, AI-driven security operations and zero trust, with a path to NSE certifications.',
    },
    fonte: 'Fortinet',
    etiquetas: [{ pt: 'Gratuito', en: 'Free' }, { pt: 'Cibersegurança', en: 'Cybersecurity' }, { pt: 'Certificações NSE', en: 'NSE certifications' }],
    url: 'https://training.fortinet.com/',
  },
  {
    categoria: 'tecnologia',
    titulo: { pt: 'AWS para Startups', en: 'AWS for Startups' },
    resumo: {
      pt: 'Conteúdos, programas e benefícios da AWS para quem está criando uma startup de tecnologia.',
      en: 'AWS content, programs and benefits for people building a technology startup.',
    },
    fonte: 'Amazon Web Services',
    etiquetas: [{ pt: 'Empreendedorismo', en: 'Entrepreneurship' }],
    url: 'https://aws.amazon.com/pt/startups/',
  },
];

export const noticias = todas.filter((n) => !n.rascunho || import.meta.env.DEV);
