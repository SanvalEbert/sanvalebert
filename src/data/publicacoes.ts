// Metadados e sínteses consultados em 15/11/2026.
export interface Publicacao {
 id: string; title: string; year: number; type: string; area: string; venue: string; authors: string;
 doi?: string; rg: string; summary: {pt:string;en:string;es:string}; note?: {pt:string;en:string;es:string};
}
export const fontesPesquisa = {
 researchgate: 'https://www.researchgate.net/profile/Sanval-Ebert-De-Santos',
 scholar: 'https://scholar.google.com.br/citations?user=QT7zAOIAAAAJ',
 consulta: '2026-11-15', citacoesDestaque: 34,
};
export const publicacoes: Publicacao[] = [
  {
    "id": "paa",
    "title": "Modelagem conceitual de um sistema inteligente para subsidiar a elaboração de planejamento de aulas e avaliações no ensino superior",
    "year": 2026,
    "type": "artigo",
    "area": "ia",
    "venue": "Derecho y Cambio Social · 23(88), e4749",
    "authors": "Ryan Luigy Paixão da Luz; Leonardo Cardia da Cruz; Sanval Ebert de Freitas Santos; Marcelle Rose da Silva Minho; Regiani Coser Cravo; Rodolfo Bello Exler",
    "doi": "10.54899/dcs.v23i88.4749",
    "rg": "401795723",
    "summary": {
      "pt": "Propõe uma arquitetura multiagente para apoiar o planejamento de aulas e avaliações, preservando a curadoria docente. O estudo é conceitual, com resultados simulados.",
      "en": "Proposes a multi-agent architecture for lesson and assessment planning while preserving teacher oversight. This is a conceptual study with simulated results.",
      "es": "Propone una arquitectura multiagente para apoyar la planificación de clases y evaluaciones, preservando la curaduría docente. Es un estudio conceptual, con resultados simulados."
    }
  },
  {
    "id": "arquitetura",
    "title": "Arquitetura da Aprendizagem Inteligente: construindo um modelo conceitual para ambientes virtuais de ensino e aprendizagem com inteligência artificial",
    "year": 2026,
    "type": "capitulo",
    "area": "ia",
    "venue": "Competências do Amanhã · Pimenta Cultural, pp. 102–113",
    "authors": "Sanval Ebert de Freitas Santos; Ingrid Winkler",
    "doi": "10.31560/pimentacultural/978-85-7221-627-2.8",
    "rg": "404670914",
    "summary": {
      "pt": "Capítulo dedicado à modelagem conceitual de ambientes de aprendizagem com inteligência artificial.",
      "en": "A chapter on conceptual modelling of learning environments enhanced by artificial intelligence.",
      "es": "Capítulo sobre el modelado conceptual de entornos de aprendizaje potenciados por inteligencia artificial."
    }
  },
  {
    "id": "xr",
    "title": "A Practical Protocol and Governance Framework for Immersive In-vehicle HCI Usability Evaluation Using Commercial XR Analytics",
    "year": 2026,
    "type": "artigo",
    "area": "imersao",
    "venue": "Journal of Advances in Information Technology · 17(7), 1331–1344",
    "authors": "Felipe Dias et al.",
    "doi": "10.12720/jait.17.7.1331-1344",
    "rg": "410788637",
    "summary": {
      "pt": "Investiga a avaliação de usabilidade em simulações imersivas de veículos e a governança de métricas de plataformas comerciais de realidade estendida.",
      "en": "Investigates usability evaluation in immersive vehicle simulations and governance of metrics from commercial extended reality platforms.",
      "es": "Investiga la evaluación de usabilidad en simulaciones vehiculares inmersivas y la gobernanza de métricas de plataformas comerciales de realidad extendida."
    }
  },
  {
    "id": "dsa",
    "title": "Immersive Virtual Environment as an Educational Resource: A Learning Tool for Data Structures and Algorithms",
    "year": 2025,
    "type": "congresso",
    "area": "imersao",
    "venue": "Anais Estendidos do Simpósio de Realidade Virtual e Aumentada · SVR 2025",
    "authors": "Márcio Soussa et al.",
    "doi": "10.5753/svr_estendido.2025.15696",
    "rg": "401895371",
    "summary": {
      "pt": "Explora ambientes de realidade virtual e metaverso como recursos para ensinar estruturas de dados e algoritmos.",
      "en": "Explores virtual reality and metaverse environments for teaching data structures and algorithms.",
      "es": "Explora entornos de realidad virtual y metaverso para la enseñanza de estructuras de datos y algoritmos."
    }
  },
  {
    "id": "modelo2025",
    "title": "Conceptual Model for Virtual Learning Environments Enhanced by Artificial Intelligence (2025)",
    "year": 2025,
    "type": "preprint",
    "area": "ia",
    "venue": "Preprint · ResearchGate",
    "authors": "Sanval Ebert de Freitas Santos et al.",
    "rg": "392339837",
    "summary": {
      "pt": "Apresenta um modelo conceitual de integração de IA a ambientes virtuais, com foco em personalização e engajamento. Registro identificado como preprint.",
      "en": "Presents a conceptual model for integrating AI into virtual learning environments, focusing on personalisation and engagement. Listed as a preprint.",
      "es": "Presenta un modelo conceptual para integrar la IA en entornos virtuales de aprendizaje, con foco en la personalización y la participación. Registrado como preprint."
    }
  },
  {
    "id": "parkinson",
    "title": "Study of autocorrelations and uncertainties applied to patients with Parkinson’s disease",
    "year": 2025,
    "type": "artigo",
    "area": "dados",
    "venue": "Scientific Reports · 15",
    "authors": "Florêncio Mendes Oliveira Filho et al.",
    "doi": "10.1038/s41598-025-94252-2",
    "rg": "390144327",
    "summary": {
      "pt": "Aplica análise de flutuações e entropia ao estudo de sinais de tremor em pacientes com doença de Parkinson.",
      "en": "Applies fluctuation analysis and entropy to tremor signals in patients with Parkinson’s disease.",
      "es": "Aplica análisis de fluctuación y entropía a señales de temblor en pacientes con enfermedad de Parkinson."
    }
  },
  {
    "id": "agentes",
    "title": "Agentes inteligentes para ambientes virtuais de ensino e aprendizagem: uma revisão sistemática",
    "year": 2024,
    "type": "artigo",
    "area": "ia",
    "venue": "HOLOS · 5(40), e15584",
    "authors": "Sanval Ebert de Freitas Santos; Ingrid Winkler; Marcio Luís Valença Araújo; Eduardo Manuel de Freitas Jorge; Aloisio Santos Nascimento Filho; Hugo Saba",
    "doi": "10.15628/holos.2024.15584",
    "rg": "392525622",
    "summary": {
      "pt": "Mapeia usos de agentes inteligentes no processo educacional e discute integração pedagógica, ética e privacidade de dados.",
      "en": "Maps uses of intelligent agents in education and discusses pedagogical integration, ethics and data privacy.",
      "es": "Mapea usos de agentes inteligentes en la educación y discute la integración pedagógica, la ética y la privacidad de los datos."
    },
    "note": {
      "pt": "Ano da edição do periódico: 2024. O ResearchGate indica junho de 2025.",
      "en": "Journal issue year: 2024. ResearchGate indicates June 2025.",
      "es": "Año del número de la revista: 2024. ResearchGate indica junio de 2025."
    }
  },
  {
    "id": "campus",
    "title": "Developing an University Immersive Campus: Guidelines for Beginner Developers",
    "year": 2024,
    "type": "congresso",
    "area": "imersao",
    "venue": "Symposium on Virtual and Augmented Reality · SVR 2024",
    "authors": "Gabriel Santos et al.",
    "doi": "10.1145/3691573.3691612",
    "rg": "384462771",
    "summary": {
      "pt": "Reúne orientações para desenvolvedores iniciantes na construção de um campus universitário imersivo.",
      "en": "Offers guidance for beginner developers building an immersive university campus.",
      "es": "Ofrece orientaciones para desarrolladores principiantes que construyen un campus universitario inmersivo."
    }
  },
  {
    "id": "eeg",
    "title": "Analysis of Electroencephalographic Signals Using the Root Mean Square (RMS) Fluctuation Function: Applicable Sample Test",
    "year": 2024,
    "type": "artigo",
    "area": "dados",
    "venue": "Mathematical Modelling and Applications · 9(3), 70–75",
    "authors": "Florêncio Mendes Oliveira Filho et al.",
    "doi": "10.11648/j.mma.20240903.13",
    "rg": "384476618",
    "summary": {
      "pt": "Investiga a análise de sinais eletroencefalográficos por meio da função de flutuação RMS.",
      "en": "Investigates electroencephalographic signal analysis using the RMS fluctuation function.",
      "es": "Investiga el análisis de señales electroencefalográficas mediante la función de fluctuación RMS."
    }
  },
  {
    "id": "proposta2021",
    "title": "Inteligência artificial em ambientes virtuais de ensino e aprendizagem: uma proposta de modelo",
    "year": 2021,
    "type": "artigo",
    "area": "ia",
    "venue": "Research, Society and Development · 10(4), e9210413855",
    "authors": "Sanval Ebert de Freitas Santos et al.",
    "doi": "10.33448/rsd-v10i4.13855",
    "rg": "350587126",
    "summary": {
      "pt": "Discute a incorporação de técnicas de IA à arquitetura de ambientes virtuais e propõe um modelo para apoiar o ensino e a aprendizagem.",
      "en": "Discusses incorporating AI into virtual learning environment architecture and proposes a model to support teaching and learning.",
      "es": "Discute la incorporación de la IA a la arquitectura de entornos virtuales de aprendizaje y propone un modelo de apoyo a la enseñanza y el aprendizaje."
    }
  },
  {
    "id": "etd",
    "title": "Inteligência artificial e virtualização em ambientes virtuais de ensino e aprendizagem: desafios e perspectivas tecnológicas",
    "year": 2021,
    "type": "artigo",
    "area": "ia",
    "venue": "ETD — Educação Temática Digital · 23(1), 2–19",
    "authors": "Sanval Ebert de Freitas Santos; Eduardo Manuel de Freitas Jorge; Ingrid Winkler",
    "doi": "10.20396/etd.v23i1.8656150",
    "rg": "349794176",
    "summary": {
      "pt": "Discute a evolução dos ambientes virtuais e como IA e virtualização abrem possibilidades didáticas e novos desafios para professores e estudantes.",
      "en": "Discusses the evolution of virtual learning environments and how AI and virtualisation create teaching opportunities and challenges for teachers and students.",
      "es": "Discute la evolución de los entornos virtuales de aprendizaje y cómo la IA y la virtualización abren posibilidades didácticas y nuevos desafíos para docentes y estudiantes."
    }
  },
  {
    "id": "capitulo2021",
    "title": "Inteligência artificial em ambientes virtuais de ensino e aprendizagem: aspectos didáticos, tecnológicos e possibilidades de aplicação",
    "year": 2021,
    "type": "capitulo",
    "area": "ia",
    "venue": "Construção do conhecimento em organizações na perspectiva da modelagem de sistemas cognitivos · pp. 110–133",
    "authors": "Sanval Ebert de Freitas Santos et al.",
    "doi": "10.31560/pimentacultural/2021.738.110-133",
    "rg": "354230567",
    "summary": {
      "pt": "Articula aspectos pedagógicos e tecnológicos da aplicação de IA em ambientes virtuais de aprendizagem.",
      "en": "Connects pedagogical and technological aspects of applying AI in virtual learning environments.",
      "es": "Conecta los aspectos pedagógicos y tecnológicos de la aplicación de la IA en entornos virtuales de aprendizaje."
    }
  },
  {
    "id": "cisco",
    "title": "Certificações Cisco: uma rota para o reconhecimento profissional",
    "year": 2020,
    "type": "congresso",
    "area": "formacao",
    "venue": "VI Simpósio Internacional de Inovação e Tecnologia · SIINTEC 2020",
    "authors": "Rafael Queiroz Santos; Vinicius Marques Rocha; Adriana de Carvalho Rosendo Ribeiro; Sanval Ebert de Freitas Santos",
    "doi": "10.5151/siintec2020-03",
    "rg": "348089214",
    "summary": {
      "pt": "Aborda certificações Cisco e sua relação com a formação e o reconhecimento profissional em tecnologia.",
      "en": "Examines Cisco certifications and their relationship with training and professional recognition in technology.",
      "es": "Examina las certificaciones Cisco y su relación con la formación y el reconocimiento profesional en tecnología."
    }
  }
];
