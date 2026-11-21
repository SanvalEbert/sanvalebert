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
  rotulo: { pt: 'Graduação em computação', en: 'Computing degrees' } as Texto,
  titulo: {
    pt: 'Estude computação na Universidade SENAI CIMATEC',
    en: 'Study computing at SENAI CIMATEC University',
  } as Texto,
  resumo: {
    pt: 'Formação dentro de um dos maiores centros de tecnologia e inovação do país, com laboratórios que simulam o mercado, projetos reais, estágios com a indústria e apoio ao empreendedorismo.',
    en: 'Study inside one of Brazil’s largest technology and innovation centers, with labs that simulate the market, real projects, industry internships and support for entrepreneurship.',
  } as Texto,
  nota: { pt: 'Cursos que coordeno', en: 'Programs I coordinate' } as Texto,
  cursos: [
    {
      nome: { pt: 'Engenharia de Computação', en: 'Computer Engineering' },
      formato: { pt: 'Presencial', en: 'On-site' },
      duracao: { pt: '5 anos', en: '5 years' },
      url: 'https://www.universidadesenaicimatec.edu.br/en/curso/computer-engineering/',
    },
    {
      nome: { pt: 'Ciência de Dados e Inteligência Artificial', en: 'Data Science and Artificial Intelligence' },
      formato: { pt: 'EAD', en: 'Online' },
      duracao: { pt: '4 anos', en: '4 years' },
      url: 'https://www.universidadesenaicimatec.edu.br/en/curso/data-science-and-artificial-intelligence-ead/',
    },
  ] as Curso[],
  outrosTitulo: {
    pt: 'Conheça também outras formações: engenharias, arquitetura, administração e economia, além de pós-graduação e extensão.',
    en: 'Explore other programs too: engineering, architecture, business and economics, plus graduate and continuing education.',
  } as Texto,
  outros: [
    { rotulo: { pt: 'Todos os cursos', en: 'All programs' } as Texto, url: 'https://universidadesenaicimatec.edu.br/' },
    { rotulo: { pt: 'Pós-graduação', en: 'Graduate programs' } as Texto, url: 'https://universidadesenaicimatec.edu.br/pos-graduacao/' },
    { rotulo: { pt: 'Extensão', en: 'Continuing education' } as Texto, url: 'https://universidadesenaicimatec.edu.br/extensao/' },
  ],
  botaoCurso: { pt: 'Conhecer o curso', en: 'See the program' } as Texto,
};
