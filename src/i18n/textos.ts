// Textos do site em português e inglês.
// Para corrigir uma frase, altere aqui. As duas versões devem ter as mesmas chaves.

import type { Idioma, Pagina } from '../data/site';

const pt = {
  site: {
    nome: 'Sanval Ebert',
    selo: 'IA para quem ensina',
    assinatura: 'Educação e tecnologia',
    edicao: 'Edição 2026',
    local: 'Salvador, Bahia',
    pular: 'Pular para o conteúdo',
    contratar: 'Contratar',
    outroIdioma: 'English',
    outroIdiomaAviso: 'Read this page in English',
    emBreve: 'em breve',
    referencias: 'Referências',
    menuPrincipal: 'Menu principal',
    fotoEmBreve: 'Foto em breve',
    voltarAoTopo: 'Voltar ao topo',
    tabela: 'Tabela',
  },
  menu: {
    inicio: 'Início',
    sobre: 'Sobre',
    pesquisa: 'Pesquisa',
    estudantes: 'Estudantes',
    palestras: 'Palestras',
    cursos: 'Cursos',
    radar: 'Radar',
    contratar: 'Contratar',
  } satisfies Record<Pagina, string>,
  inicio: {
    titulo: 'Sanval Ebert · Inteligência Artificial para quem ensina',
    descricao:
      'Pesquisador, coordenador e formador. Sanval Ebert conecta educação e tecnologia em pesquisa, cursos e palestras sobre Inteligência Artificial.',
    chamada: ['Inteligência Artificial para', 'quem ensina.'],
    resumoRotulo: 'Resumo.',
    resumo:
      'Pesquisador, coordenador e formador. Conecto educação e tecnologia em pesquisa, cursos e palestras.',
    palavrasChave:
      'Palavras-chave: IA na educação; agentes inteligentes; ambientes virtuais de aprendizagem; tecnologias imersivas.',
    botaoPalestra: 'Quero uma palestra',
    verTrajetoria: 'Ver trajetória',
    fig1: 'Sanval Ebert, PhD. Coordenador na Universidade SENAI CIMATEC.',
    marcosRotulo: 'Marcos',
    marcos: [
      {
        valor: ['2º lugar', 'mundial'],
        texto: 'HackaStone 2026, Amsterdã. Time Engage-Agent, que orientei.',
        elo: 'Ver o resultado',
        pagina: 'estudantes',
      },
      {
        valor: ['Mentor Award', ''],
        texto: 'Um dos 19 concedidos no mundo. HackaStone 2026.',
        elo: 'Ver o resultado',
        pagina: 'estudantes',
      },
      {
        valor: ['Doutor', ''],
        texto: 'Difusão do Conhecimento. IFBA, 2025.',
        elo: 'Ver a pesquisa',
        pagina: 'pesquisa',
      },
      {
        valor: ['Coordenador', ''],
        texto: 'Eng. de Computação e Ciência de Dados e IA. Universidade SENAI CIMATEC.',
        elo: 'Ver o que faço',
        pagina: 'sobre',
      },
    ],
    sumarioRotulo: '1. Sumário',
    sumarioTitulo: 'Três caminhos por este site',
    sumario: [
      { nome: 'Conhecer', destino: 'trajetória e pesquisa', pagina: 'sobre' },
      { nome: 'Aprender', destino: 'cursos e formações', pagina: 'cursos' },
      { nome: 'Contratar', destino: 'palestras e consultoria', pagina: 'palestras' },
    ],
    destaqueRotulo: '2. Destaque recente',
    destaqueTitulo: ['Da Bahia para Amsterdã: Engage-Agent é', '2º lugar mundial'],
    destaqueTexto:
      'Estudantes da Universidade SENAI CIMATEC levaram ao pódio do HackaStone 2026 um agente de IA que acompanha o percurso de cada estudante e avisa o professor a tempo de agir. Foram 51 universidades e 27 finalistas de 11 países.',
    destaqueElo: 'Ver resultados dos estudantes',
    fig2: 'Premiação do Engage-Agent: 2º lugar mundial no HackaStone 2026, em Amsterdã.',
    palestrasRotulo: '3. Palestras',
    palestrasTitulo: 'Leve a conversa sobre IA para o seu evento',
    palestras: [
      {
        publico: 'Professores e gestores',
        titulo: 'IA para quem ensina',
        texto: 'Planejamento, avaliação e acompanhamento dos estudantes com IA.',
      },
      {
        publico: 'Empresas e indústria',
        titulo: 'Uso seguro de IA',
        texto: 'Dados, ética e cibersegurança antes de adotar IA.',
      },
      {
        publico: 'Estudantes e carreira',
        titulo: 'Profissões do presente e do futuro',
        texto: 'Como a IA muda o trabalho e o que estudar.',
      },
    ],
    palestrasBotao: 'Convidar para um evento',
    palestrasElo: 'Ver todos os temas e eventos',
    cursoRotulo: 'Em preparação · Curso',
    cursoTitulo: ['Inteligência Artificial para', 'Professores'],
    cursoTexto:
      'Um curso para quem ensina e quer usar IA no planejamento, na avaliação e no acompanhamento dos estudantes. Fale comigo para ser avisado quando a primeira turma abrir.',
    cursoBotao: 'Quero ser avisado',
  },
  rodape: {
    direitos: '© 2026 Sanval Ebert',
  },
};

type Textos = typeof pt;

const en: Textos = {
  site: {
    nome: 'Sanval Ebert',
    selo: 'AI for those who teach',
    assinatura: 'Education and technology',
    edicao: '2026 Edition',
    local: 'Salvador, Bahia, Brazil',
    pular: 'Skip to content',
    contratar: 'Hire me',
    outroIdioma: 'Português',
    outroIdiomaAviso: 'Leia esta página em português',
    emBreve: 'coming soon',
    referencias: 'References',
    menuPrincipal: 'Main menu',
    fotoEmBreve: 'Photo coming soon',
    voltarAoTopo: 'Back to top',
    tabela: 'Table',
  },
  menu: {
    inicio: 'Home',
    sobre: 'About',
    pesquisa: 'Research',
    estudantes: 'Students',
    palestras: 'Talks',
    cursos: 'Courses',
    radar: 'Radar',
    contratar: 'Hire me',
  },
  inicio: {
    titulo: 'Sanval Ebert · Artificial Intelligence for those who teach',
    descricao:
      'Researcher, program coordinator and educator. Sanval Ebert connects education and technology through research, courses and talks on Artificial Intelligence.',
    chamada: ['Artificial Intelligence for', 'those who teach.'],
    resumoRotulo: 'Abstract.',
    resumo:
      'Researcher, program coordinator and educator. I connect education and technology through research, courses and talks.',
    palavrasChave:
      'Keywords: AI in education; intelligent agents; virtual learning environments; immersive technologies.',
    botaoPalestra: 'Book a talk',
    verTrajetoria: 'See my path',
    fig1: 'Sanval Ebert, PhD. Program coordinator at SENAI CIMATEC University.',
    marcosRotulo: 'Milestones',
    marcos: [
      {
        valor: ['2nd place', 'worldwide'],
        texto: 'HackaStone 2026, Amsterdam. Team Engage-Agent, which I mentored.',
        elo: 'See the result',
        pagina: 'estudantes',
      },
      {
        valor: ['Mentor Award', ''],
        texto: 'One of 19 awarded worldwide. HackaStone 2026.',
        elo: 'See the result',
        pagina: 'estudantes',
      },
      {
        valor: ['PhD', ''],
        texto: 'Knowledge Diffusion. IFBA, 2025.',
        elo: 'See the research',
        pagina: 'pesquisa',
      },
      {
        valor: ['Coordinator', ''],
        texto: 'Computer Engineering, and Data Science and AI. SENAI CIMATEC University.',
        elo: 'See what I do',
        pagina: 'sobre',
      },
    ],
    sumarioRotulo: '1. Contents',
    sumarioTitulo: 'Three ways through this site',
    sumario: [
      { nome: 'Discover', destino: 'path and research', pagina: 'sobre' },
      { nome: 'Learn', destino: 'courses and training', pagina: 'cursos' },
      { nome: 'Hire', destino: 'talks and consulting', pagina: 'palestras' },
    ],
    destaqueRotulo: '2. Latest highlight',
    destaqueTitulo: ['From Bahia to Amsterdam: Engage-Agent takes', '2nd place worldwide'],
    destaqueTexto:
      'Students from SENAI CIMATEC University reached the HackaStone 2026 podium with an AI agent that follows each student’s progress and alerts the teacher in time to act. There were 51 universities and 27 finalists from 11 countries.',
    destaqueElo: 'See student results',
    fig2: 'Engage-Agent award ceremony: 2nd place worldwide at HackaStone 2026, Amsterdam.',
    palestrasRotulo: '3. Talks',
    palestrasTitulo: 'Bring the AI conversation to your event',
    palestras: [
      {
        publico: 'Teachers and school leaders',
        titulo: 'AI for those who teach',
        texto: 'Planning, assessment and student follow-up with AI.',
      },
      {
        publico: 'Companies and industry',
        titulo: 'Using AI safely',
        texto: 'Data, ethics and cybersecurity before adopting AI.',
      },
      {
        publico: 'Students and careers',
        titulo: 'Jobs of the present and the future',
        texto: 'How AI changes work and what to study.',
      },
    ],
    palestrasBotao: 'Invite me to an event',
    palestrasElo: 'See all topics and events',
    cursoRotulo: 'In preparation · Course',
    cursoTitulo: ['Artificial Intelligence for', 'Teachers'],
    cursoTexto:
      'A course for educators who want to use AI in planning, assessment and student follow-up. Get in touch to be notified when the first class opens.',
    cursoBotao: 'Notify me',
  },
  rodape: {
    direitos: '© 2026 Sanval Ebert',
  },
};

const textos: Record<Idioma, Textos> = { pt, en };

export function t(idioma: Idioma): Textos {
  return textos[idioma];
}
