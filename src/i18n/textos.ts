// Textos do site em português, inglês e espanhol.
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
    estudantes: 'Resultados',
    palestras: 'Palestras',
    servicos: 'Tech Services',
    privacidade: 'Privacidade e Segurança',
    cursos: 'Cursos',
    radar: 'Radar',
    contratar: 'Contratar',
  } satisfies Record<Pagina, string>,
  inicio: {
    titulo: 'Sanval Ebert · Inteligência Artificial para quem ensina',
    descricao:
      'Professor, pesquisador e coordenador na Universidade SENAI CIMATEC. Pesquisa, resultados dos estudantes e recomendações sobre tecnologia e educação.',
    chamada: ['Inteligência Artificial para', 'quem ensina.'],
    resumo:
      'Pesquisador, coordenador e professor. Conecto educação e tecnologia com pesquisa, empreendedorismo e negócios.',
    credenciais: [
      'PhD',
      'Universidade SENAI CIMATEC',
      'Coordenador de Engenharia de Computação e IA',
      'IA, Cloud Computing e Cibersegurança',
      'Pesquisador em IA na Educação',
      'Cisco Academy',
      'AWS Academy',
      'Fortinet Academy',
    ],
    verTrajetoria: 'Ver trajetória',
    destaquesRotulo: 'Destaques',
    destaquesTitulo: 'Conquistas e participações recentes',
    noticiasRotulo: 'Para aprender',
    noticiasTitulo: 'Dicas e treinamentos',
    noticiasTexto: 'Plataformas que recomendo para profissionais e estudantes ampliarem suas habilidades em tecnologias emergentes, do primeiro curso à certificação.',
    noticiasElo: 'Acessar',
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
    estudantes: 'Results',
    palestras: 'Talks',
    servicos: 'Tech Services',
    privacidade: 'Privacy and Security',
    cursos: 'Courses',
    radar: 'Radar',
    contratar: 'Hire me',
  },
  inicio: {
    titulo: 'Sanval Ebert · Artificial Intelligence for those who teach',
    descricao:
      'Professor, researcher and program coordinator at SENAI CIMATEC University. Research, student achievements and recommendations on technology and education.',
    chamada: ['Artificial Intelligence for', 'those who teach.'],
    resumo:
      'Researcher, program coordinator and professor. I connect education and technology with research, entrepreneurship and business.',
    credenciais: [
      'PhD',
      'SENAI CIMATEC University',
      'Computer Engineering and AI Program Coordinator',
      'AI, Cloud Computing and Cybersecurity',
      'Researcher in AI in Education',
      'Cisco Academy',
      'AWS Academy',
      'Fortinet Academy',
    ],
    verTrajetoria: 'See my path',
    destaquesRotulo: 'Highlights',
    destaquesTitulo: 'Recent achievements and appearances',
    noticiasRotulo: 'To learn',
    noticiasTitulo: 'Tips and training',
    noticiasTexto: 'Platforms I recommend for professionals and students to build skills in emerging technologies, from a first course to certification.',
    noticiasElo: 'Visit',
  },
  rodape: {
    direitos: '© 2026 Sanval Ebert',
  },
};

const es: Textos = {
  site: {
    nome: 'Sanval Ebert',
    selo: 'IA para quienes enseñan',
    assinatura: 'Educación y tecnología',
    edicao: 'Edición 2026',
    local: 'Salvador, Bahía, Brasil',
    pular: 'Saltar al contenido',
    contratar: 'Contratar',
    outroIdioma: 'Português',
    outroIdiomaAviso: 'Leia esta página em português',
    emBreve: 'próximamente',
    referencias: 'Referencias',
    menuPrincipal: 'Menú principal',
    fotoEmBreve: 'Foto próximamente',
    voltarAoTopo: 'Volver arriba',
    tabela: 'Tabla',
  },
  menu: {
    inicio: 'Inicio',
    sobre: 'Sobre mí',
    pesquisa: 'Investigación',
    estudantes: 'Resultados',
    palestras: 'Charlas',
    servicos: 'Tech Services',
    privacidade: 'Privacidad y Seguridad',
    cursos: 'Cursos',
    radar: 'Radar',
    contratar: 'Contratar',
  },
  inicio: {
    titulo: 'Sanval Ebert · Inteligencia Artificial para quienes enseñan',
    descricao:
      'Profesor, investigador y coordinador de carreras en la Universidad SENAI CIMATEC. Investigación, logros de los estudiantes y recomendaciones sobre tecnología y educación.',
    chamada: ['Inteligencia Artificial para', 'quienes enseñan.'],
    resumo:
      'Investigador, coordinador y profesor. Conecto educación y tecnología con investigación, emprendimiento y negocios.',
    credenciais: [
      'PhD',
      'Universidad SENAI CIMATEC',
      'Coordinador de Ingeniería de Computación e IA',
      'IA, Cloud Computing y Ciberseguridad',
      'Investigador en IA en la Educación',
      'Cisco Academy',
      'AWS Academy',
      'Fortinet Academy',
    ],
    verTrajetoria: 'Ver trayectoria',
    destaquesRotulo: 'Destacados',
    destaquesTitulo: 'Logros y participaciones recientes',
    noticiasRotulo: 'Para aprender',
    noticiasTitulo: 'Consejos y formación',
    noticiasTexto: 'Plataformas que recomiendo para que profesionales y estudiantes amplíen sus habilidades en tecnologías emergentes, desde el primer curso hasta la certificación.',
    noticiasElo: 'Acceder',
  },
  rodape: {
    direitos: '© 2026 Sanval Ebert',
  },
};

const textos: Record<Idioma, Textos> = { pt, en, es };

export function t(idioma: Idioma): Textos {
  return textos[idioma];
}
