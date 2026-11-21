// Destaques da página inicial, exibidos em carrossel (o mais recente primeiro).
// Para incluir um destaque: copie um bloco, preencha os textos nos dois idiomas
// e coloque a foto em public/images/. Com `rascunho: true`, o destaque aparece
// apenas no servidor local (npm run dev) e não é publicado.

import type { Idioma } from './site';

type Texto = Record<Idioma, string>;

export interface Destaque {
  id: string;
  quando: Texto;
  titulo: Texto;
  texto: Texto;
  /** Caminho dentro de public/, por exemplo 'images/foto.jpg'. */
  imagem?: { arquivo: string; largura: number; altura: number; alt: Texto };
  legenda?: Texto;
  links: { rotulo: Texto; url: string }[];
  rascunho?: boolean;
}

const todos: Destaque[] = [
  {
    id: 'novo-destaque',
    rascunho: true,
    quando: { pt: '2026', en: '2026' },
    titulo: {
      pt: 'Título do novo destaque (aguardando o texto do post)',
      en: 'New highlight title (waiting for the post text)',
    },
    texto: {
      pt: 'Resumo do novo destaque: o que aconteceu, onde e quem participou.',
      en: 'Summary of the new highlight: what happened, where and who took part.',
    },
    links: [
      { rotulo: { pt: 'Ver no Instagram', en: 'See it on Instagram' }, url: 'https://www.instagram.com/p/Df0mFx_jdid/?img_index=1' },
      { rotulo: { pt: 'Ler no LinkedIn', en: 'Read it on LinkedIn' }, url: 'https://www.linkedin.com/feed/update/urn:li:activity:7528252470699986944/' },
    ],
  },
  {
    id: 'engage-agent-amsterda',
    quando: { pt: 'HackaStone 2026 · Amsterdã', en: 'HackaStone 2026 · Amsterdam' },
    titulo: {
      pt: 'Da Bahia para Amsterdã: Engage-Agent é 2º lugar mundial',
      en: 'From Bahia to Amsterdam: Engage-Agent takes 2nd place worldwide',
    },
    texto: {
      pt: 'Estudantes da Universidade SENAI CIMATEC levaram ao pódio do HackaStone 2026 um agente de IA que acompanha o percurso de cada estudante e avisa o professor a tempo de agir. Foram 51 universidades e 27 finalistas de 11 países.',
      en: 'SENAI CIMATEC University students took to the HackaStone 2026 podium an AI agent that follows each student’s progress and alerts the teacher in time to act. 51 universities and 27 finalists from 11 countries took part.',
    },
    imagem: {
      arquivo: 'images/engage-agent-amsterdam-2026.jpg',
      largura: 1399,
      altura: 933,
      alt: {
        pt: 'Premiação do Engage-Agent com o cheque de segundo lugar e as bandeiras do Brasil e do SENAI CIMATEC',
        en: 'Engage-Agent award ceremony with the second-place cheque and the Brazilian and SENAI CIMATEC flags',
      },
    },
    links: [
      { rotulo: { pt: 'Ver no Instagram', en: 'See it on Instagram' }, url: 'https://www.instagram.com/p/DfsskpaiBcC/?img_index=1' },
      { rotulo: { pt: 'Ler no LinkedIn', en: 'Read it on LinkedIn' }, url: 'https://www.linkedin.com/feed/update/urn:li:activity:7526970043797037056/' },
    ],
  },
];

export const destaques = todos.filter((d) => !d.rascunho || import.meta.env.DEV);
