// Cartão em destaque da Universidade SENAI CIMATEC na seção "Dicas e treinamentos".
// Os cursos de computação aparecem em primeiro plano; os demais caminhos ficam logo abaixo.
// Fonte dos dados dos cursos: páginas oficiais em universidadesenaicimatec.edu.br.

import type { Idioma } from './site';

type Texto = Record<Idioma, string>;

export interface Curso {
  nome: Texto;
  formato: Texto;
  duracao: Texto;
  url: string;
}

export const universidade = {
  nome: 'Universidade SENAI CIMATEC',
  rotulo: { pt: 'Graduação em computação', en: 'Computing degrees', es: 'Grado en computación' } satisfies Texto,
  titulo: {
    pt: 'Estude computação na Universidade SENAI CIMATEC',
    en: 'Study computing at SENAI CIMATEC University',
    es: 'Estudie computación en la Universidad SENAI CIMATEC',
  } satisfies Texto,
  resumo: {
    pt: 'Formação dentro de um dos maiores centros de tecnologia e inovação do país, com laboratórios que simulam o mercado, projetos reais, estágios com a indústria e apoio ao empreendedorismo.',
    en: 'Study inside one of Brazil’s largest technology and innovation centers, with labs that simulate the market, real projects, industry internships and support for entrepreneurship.',
    es: 'Formación dentro de uno de los mayores centros de tecnología e innovación de Brasil, con laboratorios que simulan el mercado, proyectos reales, prácticas en la industria y apoyo al emprendimiento.',
  } satisfies Texto,
  nota: { pt: 'Cursos que coordeno', en: 'Programs I coordinate', es: 'Carreras que coordino' } satisfies Texto,
  cursos: [
    {
      nome: { pt: 'Engenharia de Computação', en: 'Computer Engineering', es: 'Ingeniería de Computación' },
      formato: { pt: 'Presencial', en: 'On-site', es: 'Presencial' },
      duracao: { pt: '5 anos', en: '5 years', es: '5 años' },
      url: 'https://www.universidadesenaicimatec.edu.br/en/curso/computer-engineering/',
    },
    {
      nome: { pt: 'Ciência de Dados e Inteligência Artificial', en: 'Data Science and Artificial Intelligence', es: 'Ciencia de Datos e Inteligencia Artificial' },
      formato: { pt: 'EAD', en: 'Online', es: 'A distancia' },
      duracao: { pt: '4 anos', en: '4 years', es: '4 años' },
      url: 'https://www.universidadesenaicimatec.edu.br/en/curso/data-science-and-artificial-intelligence-ead/',
    },
  ] as Curso[],
  outrosTitulo: {
    pt: 'Conheça também outras formações: engenharias, arquitetura, administração e economia, além de pós-graduação e extensão.',
    en: 'Explore other programs too: engineering, architecture, business and economics, plus graduate and continuing education.',
    es: 'Conozca también otras carreras: ingenierías, arquitectura, administración y economía, además de posgrado y extensión.',
  } satisfies Texto,
  outros: [
    { rotulo: { pt: 'Todos os cursos', en: 'All programs', es: 'Todas las carreras' } satisfies Texto, url: 'https://universidadesenaicimatec.edu.br/' },
    { rotulo: { pt: 'Pós-graduação', en: 'Graduate programs', es: 'Posgrado' } satisfies Texto, url: 'https://universidadesenaicimatec.edu.br/pos-graduacao/' },
    { rotulo: { pt: 'Extensão', en: 'Continuing education', es: 'Extensión' } satisfies Texto, url: 'https://universidadesenaicimatec.edu.br/extensao/' },
  ],
  botaoCurso: { pt: 'Conhecer o curso', en: 'See the program', es: 'Conocer la carrera' } satisfies Texto,
};
