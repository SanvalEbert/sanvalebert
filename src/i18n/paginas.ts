// Textos das páginas Palestras e Estudantes, em português e inglês.

import type { Idioma } from '../data/site';

const pt = {
  palestras: {
    titulo: 'Palestras e eventos · Sanval Ebert',
    descricao:
      'Palestras, mesas e workshops de Sanval Ebert sobre Inteligência Artificial na educação, uso seguro de IA e profissões do futuro.',
    rotulo: 'Palestras e eventos',
    chamada: ['Leve a conversa sobre IA para o', 'seu evento.'],
    resumoRotulo: 'Resumo.',
    resumo:
      'Palestras, mesas e workshops para escolas, universidades, empresas e eventos de tecnologia, com base em pesquisa e em resultados reais de sala de aula.',
    botao: 'Solicitar uma proposta',
    temasRotulo: 'Temas',
    temasTitulo: 'Quatro conversas, quatro públicos',
    temas: [
      {
        publico: 'Professores, coordenadores e gestores',
        titulo: 'IA para quem ensina',
        texto:
          'Como usar Inteligência Artificial no planejamento, na avaliação e no acompanhamento dos estudantes.',
      },
      {
        publico: 'Empresas e indústria',
        titulo: 'Uso seguro de IA: dados, ética e cibersegurança',
        texto:
          'O que uma organização precisa resolver antes de adotar IA: proteção de dados, responsabilidade e confiança.',
      },
      {
        publico: 'Universidades e eventos de inovação',
        titulo: 'Agentes de IA na educação: do laboratório ao pódio mundial',
        texto: 'A história do Engage-Agent e o que ela ensina sobre formar times de IA.',
      },
      {
        publico: 'Estudantes e eventos de carreira',
        titulo: 'IA, inovação e as profissões do presente e do futuro',
        texto: 'Como a IA muda o trabalho e o que estudar para acompanhar.',
      },
    ],
    temaElo: 'Quero esta palestra',
    videoRotulo: 'Veja uma palestra',
    videoTitulo: 'Inteligência Artificial, Inovação e Modelagem das Profissões do Presente e do Futuro',
    videoElo: 'Assistir no YouTube',
    historicoRotulo: 'Histórico',
    historicoTitulo: 'Eventos de que participei',
    historico: [
      {
        quando: '2026 · Mesa',
        nome: 'Cognoscere em Foco, 2ª edição',
        detalhe: 'Agentes Generativos no Contexto da Pesquisa Científica em Educação',
      },
      {
        quando: '2026 · Evento',
        nome: 'Security Day do Sistema FIEB, 5ª edição',
        detalhe: 'Cibersegurança, Inteligência Artificial e formação de talentos',
      },
      {
        quando: '2026 · Mentor',
        nome: 'HackaStone 2026 e Dutch Conference on AI for Education',
        detalhe: 'Vrije Universiteit Amsterdam, Países Baixos',
      },
      {
        quando: '2026 · Entrevista',
        nome: 'TV Bahia',
        detalhe: 'Estamos preparados para utilizar a Inteligência Artificial com segurança?',
      },
      {
        quando: '2026 · Evento',
        nome: 'Semana da Computação CIMATEC, 5ª edição',
        detalhe: 'Evento do curso, com 507 participantes',
      },
    ],
    finalTitulo: ['Tem um evento', 'em vista?'],
    finalTexto: 'Conte a data, o público e o tema.',
  },
  estudantes: {
    titulo: 'Resultados dos estudantes · Sanval Ebert',
    descricao:
      'Competições, prêmios e projetos de estudantes e egressos de Engenharia de Computação e de Ciência de Dados e IA da Universidade SENAI CIMATEC.',
    rotulo: 'Resultados dos estudantes',
    chamada: ['Conquistas dos estudantes e egressos', 'dos cursos que coordeno.'],
    resumoRotulo: 'Resumo.',
    resumo:
      'Competições, prêmios e projetos de estudantes e egressos de Engenharia de Computação e de Ciência de Dados e IA da Universidade SENAI CIMATEC.',
    destaqueRotulo: 'HackaStone 2026 · Amsterdã · Agentes de IA para a educação',
    destaqueTitulo: ['Engage-Agent:', '2º lugar mundial'],
    destaqueTexto:
      'Agente de IA que acompanha o que o estudante faz no material do curso, estima o domínio de cada competência e, ao perceber dificuldade, monta um caminho de reforço e avisa o professor. Foram 51 universidades e 27 finalistas de 11 países.',
    timeRotulo: 'Time',
    time: 'Victor Barreto Andrade Gonçalves, Amanda Lins, Átila Mascarenhas, Lucca Torres Badaro Silvani e Rafael Cezimbra.',
    papelRotulo: 'Meu papel',
    papel: 'Orientador do time.',
    fig1: 'Premiação do Engage-Agent pelo 2º lugar mundial, em Amsterdã.',
    outrosRotulo: 'Também no HackaStone 2026',
    outrosTitulo: 'Três equipes da universidade na final',
    outros: [
      {
        rotulo: 'Finalista mundial',
        titulo: 'QuantumVR',
        texto: 'Equipe da Universidade SENAI CIMATEC entre os 27 finalistas, com artigo aceito.',
      },
      {
        rotulo: 'Copa de Colaboração Internacional',
        titulo: 'SafeHeight',
        texto: 'Time da Profa. Ingrid Winkler, em parceria com a University of Florida.',
      },
    ],
    indicadoresRotulo: 'Indicadores',
    indicadoresTitulo: 'O curso em números',
    indicadores: [
      {
        valor: 'CPC 5',
        texto: 'Engenharia de Computação, no ciclo de indicadores divulgado em 2025.',
      },
      { valor: 'IGC 5', texto: 'Universidade SENAI CIMATEC.' },
      {
        valor: '507',
        texto:
          'participantes na 5ª Semana da Computação, com 47 voluntários e mais de 40 atividades.',
      },
    ],
    finalTitulo: ['Quer levar essa experiência para a', 'sua instituição?'],
    finalTexto: 'Palestras e formação sobre como preparar times para competições e projetos de IA.',
    finalBotao: 'Falar comigo',
  },
};

type Textos = typeof pt;

const en: Textos = {
  palestras: {
    titulo: 'Talks and events · Sanval Ebert',
    descricao:
      'Talks, panels and workshops by Sanval Ebert on Artificial Intelligence in education, safe use of AI and the future of work.',
    rotulo: 'Talks and events',
    chamada: ['Bring the AI conversation to', 'your event.'],
    resumoRotulo: 'Abstract.',
    resumo:
      'Talks, panels and workshops for schools, universities, companies and technology events, grounded in research and in real classroom results.',
    botao: 'Request a proposal',
    temasRotulo: 'Topics',
    temasTitulo: 'Four conversations, four audiences',
    temas: [
      {
        publico: 'Teachers, coordinators and school leaders',
        titulo: 'AI for those who teach',
        texto: 'How to use Artificial Intelligence in planning, assessment and student follow-up.',
      },
      {
        publico: 'Companies and industry',
        titulo: 'Using AI safely: data, ethics and cybersecurity',
        texto:
          'What an organization needs to settle before adopting AI: data protection, accountability and trust.',
      },
      {
        publico: 'Universities and innovation events',
        titulo: 'AI agents in education: from the lab to the world podium',
        texto: 'The story of Engage-Agent and what it teaches about building AI teams.',
      },
      {
        publico: 'Students and career events',
        titulo: 'AI, innovation and the jobs of the present and the future',
        texto: 'How AI changes work and what to study to keep up.',
      },
    ],
    temaElo: 'I want this talk',
    videoRotulo: 'Watch a talk',
    videoTitulo:
      'Artificial Intelligence, Innovation and the Shaping of Present and Future Professions (in Portuguese)',
    videoElo: 'Watch on YouTube',
    historicoRotulo: 'History',
    historicoTitulo: 'Events I took part in',
    historico: [
      {
        quando: '2026 · Panel',
        nome: 'Cognoscere em Foco, 2nd edition',
        detalhe: 'Generative Agents in Scientific Research in Education',
      },
      {
        quando: '2026 · Event',
        nome: 'FIEB System Security Day, 5th edition',
        detalhe: 'Cybersecurity, Artificial Intelligence and talent development',
      },
      {
        quando: '2026 · Mentor',
        nome: 'HackaStone 2026 and Dutch Conference on AI for Education',
        detalhe: 'Vrije Universiteit Amsterdam, the Netherlands',
      },
      {
        quando: '2026 · Interview',
        nome: 'TV Bahia',
        detalhe: 'Are we ready to use Artificial Intelligence safely?',
      },
      {
        quando: '2026 · Event',
        nome: 'CIMATEC Computing Week, 5th edition',
        detalhe: 'Program event with 507 participants',
      },
    ],
    finalTitulo: ['Have an event', 'coming up?'],
    finalTexto: 'Tell me the date, the audience and the topic.',
  },
  estudantes: {
    titulo: 'Student results · Sanval Ebert',
    descricao:
      'Competitions, awards and projects by Computer Engineering and Data Science and AI students and graduates at SENAI CIMATEC University.',
    rotulo: 'Student results',
    chamada: ['Achievements of students and graduates', 'from the programs I coordinate.'],
    resumoRotulo: 'Abstract.',
    resumo:
      'Competitions, awards and projects by Computer Engineering and Data Science and AI students and graduates at SENAI CIMATEC University.',
    destaqueRotulo: 'HackaStone 2026 · Amsterdam · AI agents for education',
    destaqueTitulo: ['Engage-Agent:', '2nd place worldwide'],
    destaqueTexto:
      'An AI agent that follows what students do in the course material, estimates their mastery of each competency and, when it notices someone struggling, builds a reinforcement path and alerts the teacher. There were 51 universities and 27 finalists from 11 countries.',
    timeRotulo: 'Team',
    time: 'Victor Barreto Andrade Gonçalves, Amanda Lins, Átila Mascarenhas, Lucca Torres Badaro Silvani and Rafael Cezimbra.',
    papelRotulo: 'My role',
    papel: 'Team mentor.',
    fig1: 'Engage-Agent receiving the worldwide second-place award in Amsterdam.',
    outrosRotulo: 'Also at HackaStone 2026',
    outrosTitulo: 'Three university teams in the final',
    outros: [
      {
        rotulo: 'World finalist',
        titulo: 'QuantumVR',
        texto: 'SENAI CIMATEC University team among the 27 finalists, with an accepted paper.',
      },
      {
        rotulo: 'International Collaboration Cup',
        titulo: 'SafeHeight',
        texto: "Prof. Ingrid Winkler's team, in partnership with the University of Florida.",
      },
    ],
    indicadoresRotulo: 'Indicators',
    indicadoresTitulo: 'The program in numbers',
    indicadores: [
      {
        valor: 'CPC 5',
        texto:
          'Computer Engineering, top score in Brazil’s national program quality index, released in 2025.',
      },
      {
        valor: 'IGC 5',
        texto: 'SENAI CIMATEC University, top score in the national institutional index.',
      },
      {
        valor: '507',
        texto: 'participants at the 5th Computing Week, with 47 volunteers and more than 40 activities.',
      },
    ],
    finalTitulo: ['Want to bring this experience to', 'your institution?'],
    finalTexto: 'Talks and training on preparing teams for AI competitions and projects.',
    finalBotao: 'Talk to me',
  },
};

const textos: Record<Idioma, Textos> = { pt, en };

export function tp(idioma: Idioma): Textos {
  return textos[idioma];
}
