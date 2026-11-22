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
  /** Nota de curadoria: por que esta indicação vale o tempo de quem lê. */
  porque: Texto;
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
    porque: {
      pt: 'É uma boa porta de entrada: trilhas curtas e bem organizadas sobre nuvem, dados e IA, que levam de forma natural até uma certificação reconhecida pelo mercado.',
      en: 'A great entry point: short, well-organized paths on cloud, data and AI that lead naturally to an industry-recognized certification.',
      es: 'Es una buena puerta de entrada: rutas cortas y bien organizadas sobre nube, datos e IA, que llevan de forma natural a una certificación reconocida por el mercado.',
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
    porque: {
      pt: 'Para quem quer entender computação em nuvem na prática: cursos gratuitos para todos os níveis, direto da plataforma usada por boa parte da indústria.',
      en: 'For anyone who wants to understand cloud computing in practice: free courses for every level, straight from the platform much of the industry runs on.',
      es: 'Para quien quiere entender la computación en la nube en la práctica: cursos gratuitos para todos los niveles, directamente de la plataforma que usa buena parte de la industria.',
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
    porque: {
      pt: 'Segurança deixou de ser assunto só de especialista. Aqui dá para estudar cibersegurança de graça, no próprio ritmo, dos fundamentos às certificações NSE.',
      en: 'Security is no longer a topic for specialists only. Here you can study cybersecurity for free, at your own pace, from the fundamentals to NSE certifications.',
      es: 'La seguridad dejó de ser un tema solo de especialistas. Aquí se puede estudiar ciberseguridad gratis, a su ritmo, desde los fundamentos hasta las certificaciones NSE.',
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
    porque: {
      pt: 'Ideia boa precisa de estrutura para virar negócio. Indico para estudantes e professores que estão transformando projetos de tecnologia em startups.',
      en: 'A good idea needs structure to become a business. I point students and teachers who are turning technology projects into startups here.',
      es: 'Una buena idea necesita estructura para convertirse en negocio. La recomiendo a estudiantes y docentes que están transformando proyectos de tecnología en startups.',
    },
    fonte: 'Amazon Web Services',
    etiquetas: [{ pt: 'Empreendedorismo', en: 'Entrepreneurship', es: 'Emprendimiento' }],
    url: 'https://aws.amazon.com/pt/startups/',
  },
];

export const noticias = todas.filter((n) => !n.rascunho || import.meta.env.DEV);
