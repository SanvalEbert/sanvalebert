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
    id: 'batv-tv-bahia',
    quando: { pt: 'BATV · TV Bahia · Novembro de 2026', en: 'BATV · TV Bahia · November 2026', es: 'BATV · TV Bahia · Noviembre de 2026' },
    titulo: {
      pt: 'No BATV: o que um PDF com texto invisível ensina sobre usar IA',
      en: 'On BATV: what a PDF with invisible text teaches about using AI',
      es: 'En BATV: lo que un PDF con texto invisible enseña sobre el uso de la IA',
    },
    texto: {
      pt: 'Comentei na TV Bahia o caso de um documento com uma camada de texto escondida que tentou induzir a IA do Tribunal de Justiça da Bahia a soltar um acusado de homicídio. A área técnica identificou a manobra, conhecida como prompt injection, e o habeas corpus foi negado. A conversa foi sobre inovar com IA e, ao mesmo tempo, desenvolver pessoas e governança que garantam a segurança.',
      en: 'On TV Bahia, I discussed the case of a document with a hidden text layer that tried to steer the Bahia Court of Justice’s AI into releasing a murder suspect. The court’s technical team caught the trick, known as prompt injection, and the habeas corpus was denied. We talked about innovating with AI while developing people and governance that keep it safe.',
      es: 'En TV Bahia comenté el caso de un documento con una capa de texto oculta que intentó inducir a la IA del Tribunal de Justicia de Bahía a liberar a un acusado de homicidio. El área técnica detectó la maniobra, conocida como prompt injection, y el habeas corpus fue denegado. Hablamos de innovar con IA y, al mismo tiempo, desarrollar personas y gobernanza que garanticen la seguridad.',
    },
    imagem: {
      arquivo: 'images/batv-tv-bahia-2026.jpg',
      largura: 936,
      altura: 542,
      alt: {
        pt: 'Sanval Ebert em entrevista ao BATV, da TV Bahia, em frente ao Centro de Supercomputação do SENAI CIMATEC',
        en: 'Sanval Ebert interviewed on TV Bahia’s BATV in front of the SENAI CIMATEC Supercomputing Center',
        es: 'Sanval Ebert entrevistado en BATV, de TV Bahia, frente al Centro de Supercomputación del SENAI CIMATEC',
      },
    },
    links: [
      { rotulo: { pt: 'Ver no Instagram', en: 'See it on Instagram', es: 'Ver en Instagram' }, url: 'https://www.instagram.com/p/Df0mFx_jdid/' },
      { rotulo: { pt: 'Ler no LinkedIn', en: 'Read it on LinkedIn', es: 'Leer en LinkedIn' }, url: 'https://www.linkedin.com/feed/update/urn:li:activity:7528252470699986944/' },
    ],
  },
  {
    id: 'engage-agent-amsterda',
    quando: { pt: 'HackaStone 2026 · Amsterdã', en: 'HackaStone 2026 · Amsterdam', es: 'HackaStone 2026 · Ámsterdam' },
    titulo: {
      pt: 'Da Bahia para Amsterdã: Engage-Agent é 2º lugar mundial',
      en: 'From Bahia to Amsterdam: Engage-Agent takes 2nd place worldwide',
      es: 'De Bahía a Ámsterdam: Engage-Agent logra el 2.º lugar mundial',
    },
    texto: {
      pt: 'Estudantes da Universidade SENAI CIMATEC levaram ao pódio do HackaStone 2026 um agente de IA que acompanha o percurso de cada estudante e avisa o professor a tempo de agir. Foram 51 universidades e 27 finalistas de 11 países.',
      en: 'SENAI CIMATEC University students took to the HackaStone 2026 podium an AI agent that follows each student’s progress and alerts the teacher in time to act. 51 universities and 27 finalists from 11 countries took part.',
      es: 'Estudiantes de la Universidad SENAI CIMATEC llevaron al podio del HackaStone 2026 un agente de IA que acompaña el recorrido de cada estudiante y avisa al docente a tiempo para actuar. Participaron 51 universidades y 27 finalistas de 11 países.',
    },
    imagem: {
      arquivo: 'images/engage-agent-amsterdam-2026.jpg',
      largura: 1399,
      altura: 933,
      alt: {
        pt: 'Premiação do Engage-Agent com o cheque de segundo lugar e as bandeiras do Brasil e do SENAI CIMATEC',
        en: 'Engage-Agent award ceremony with the second-place cheque and the Brazilian and SENAI CIMATEC flags',
        es: 'Premiación del Engage-Agent con el cheque del segundo lugar y las banderas de Brasil y del SENAI CIMATEC',
      },
    },
    links: [
      { rotulo: { pt: 'Ver no Instagram', en: 'See it on Instagram', es: 'Ver en Instagram' }, url: 'https://www.instagram.com/p/DfsskpaiBcC/?img_index=1' },
      { rotulo: { pt: 'Ler no LinkedIn', en: 'Read it on LinkedIn', es: 'Leer en LinkedIn' }, url: 'https://www.linkedin.com/feed/update/urn:li:activity:7526970043797037056/' },
    ],
  },
];

export const destaques = todos.filter((d) => !d.rascunho || import.meta.env.DEV);
