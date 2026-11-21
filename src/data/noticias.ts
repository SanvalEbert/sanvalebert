// Dicas e treinamentos indicados na página inicial (seção "Dicas e treinamentos").
// Cada item leva a um link externo. Os títulos e resumos são escritos aqui, com
// suas palavras, e não copiados da fonte.
// Com `rascunho: true`, o item aparece apenas no servidor local (npm run dev).
// Se não houver itens publicados, a seção não aparece no site.

import type { Idioma } from './site';

type Texto = Record<Idioma, string>;

export type Categoria = 'tecnologia' | 'educacao' | 'treinamento';

export const categorias: Record<Categoria, Texto> = {
  tecnologia: { pt: 'Tecnologia', en: 'Technology', es: 'Tecnología' },
  educacao: { pt: 'Educação', en: 'Education', es: 'Educación' },
  treinamento: { pt: 'Treinamento', en: 'Training', es: 'Formación' },
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
    titulo: { pt: 'Microsoft Learn', en: 'Microsoft Learn', es: 'Microsoft Learn' },
    resumo: {
      pt: 'Trilhas gratuitas da Microsoft sobre nuvem, dados e IA, com preparação para certificações.',
      en: 'Free Microsoft learning paths on cloud, data and AI, with certification preparation.',
      es: 'Rutas gratuitas de Microsoft sobre nube, datos e IA, con preparación para certificaciones.',
    },
    fonte: 'Microsoft',
    etiquetas: [{ pt: 'Gratuito', en: 'Free', es: 'Gratis' }, { pt: 'Certificações', en: 'Certifications', es: 'Certificaciones' }],
    url: 'https://www.microsoft.com/pt-br/microsoft-learn',
  },
  {
    categoria: 'treinamento',
    titulo: { pt: 'AWS Skill Builder', en: 'AWS Skill Builder', es: 'AWS Skill Builder' },
    resumo: {
      pt: 'Centro de aprendizagem da AWS, com cursos gratuitos de computação em nuvem e IA para todos os níveis.',
      en: 'AWS learning center with free cloud computing and AI courses for every level.',
      es: 'Centro de aprendizaje de AWS, con cursos gratuitos de computación en la nube e IA para todos los niveles.',
    },
    fonte: 'Amazon Web Services',
    etiquetas: [{ pt: 'Cursos gratuitos', en: 'Free courses', es: 'Cursos gratuitos' }, { pt: 'Nuvem e IA', en: 'Cloud and AI', es: 'Nube e IA' }],
    url: 'https://skillbuilder.aws/',
  },
  {
    categoria: 'treinamento',
    titulo: { pt: 'Fortinet Training Institute', en: 'Fortinet Training Institute', es: 'Fortinet Training Institute' },
    resumo: {
      pt: 'Cursos gratuitos de cibersegurança, no seu ritmo: redes seguras, segurança em nuvem, operações com IA e zero trust, com trilha para as certificações NSE.',
      en: 'Free self-paced cybersecurity courses: secure networking, cloud security, AI-driven security operations and zero trust, with a path to NSE certifications.',
      es: 'Cursos gratuitos de ciberseguridad, a su ritmo: redes seguras, seguridad en la nube, operaciones con IA y zero trust, con ruta hacia las certificaciones NSE.',
    },
    fonte: 'Fortinet',
    etiquetas: [{ pt: 'Gratuito', en: 'Free', es: 'Gratis' }, { pt: 'Cibersegurança', en: 'Cybersecurity', es: 'Ciberseguridad' }, { pt: 'Certificações NSE', en: 'NSE certifications', es: 'Certificaciones NSE' }],
    url: 'https://training.fortinet.com/',
  },
  {
    categoria: 'tecnologia',
    titulo: { pt: 'AWS para Startups', en: 'AWS for Startups', es: 'AWS para Startups' },
    resumo: {
      pt: 'Conteúdos, programas e benefícios da AWS para quem está criando uma startup de tecnologia.',
      en: 'AWS content, programs and benefits for people building a technology startup.',
      es: 'Contenidos, programas y beneficios de AWS para quienes están creando una startup de tecnología.',
    },
    fonte: 'Amazon Web Services',
    etiquetas: [{ pt: 'Empreendedorismo', en: 'Entrepreneurship', es: 'Emprendimiento' }],
    url: 'https://aws.amazon.com/pt/startups/',
  },
];

export const noticias = todas.filter((n) => !n.rascunho || import.meta.env.DEV);
