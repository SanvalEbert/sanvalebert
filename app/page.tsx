import Image from "next/image";

const profiles = [
  ["LinkedIn", "https://www.linkedin.com/in/msc-sanval-ebert/"],
  ["Lattes", "https://lattes.cnpq.br/6700242085425421"],
  ["ResearchGate", "https://www.researchgate.net/profile/Sanval-Ebert-De-Santos"],
  ["Google Scholar", "https://scholar.google.com/citations?hl=pt-BR&user=QT7zAOIAAAAJ"],
  ["ORCID", "https://orcid.org/0000-0003-3196-6468"],
  ["GitHub", "https://github.com/SanvalEbert"]
] as const;

const pillars = [
  {
    number: "01",
    tag: "PESQUISAR",
    title: "Construir conhecimento.",
    text: "IA na educação, personalização, ambientes virtuais, dados educacionais, IA generativa e experimentação científica.",
    href: "#research"
  },
  {
    number: "02",
    tag: "SOLUCIONAR",
    title: "Transformar problemas em sistemas inteligentes.",
    text: "Diagnóstico, dados, modelos, agentes, automação, APIs, integrações e provas de conceito.",
    href: "#solutions"
  },
  {
    number: "03",
    tag: "FORMAR",
    title: "Desenvolver pessoas e organizações.",
    text: "Cursos, workshops, formação docente, programas corporativos e palestras conectadas a desafios reais.",
    href: "#training"
  }
] as const;

const process = [
  ["01", "Compreender", "Contexto, processo e objetivo"],
  ["02", "Estruturar", "Dados, requisitos e riscos"],
  ["03", "Projetar", "Arquitetura, modelos e automações"],
  ["04", "Construir", "Protótipo, integração e agentes"],
  ["05", "Validar", "Testes, qualidade e experiência"],
  ["06", "Evoluir", "Monitoramento, aprendizado e escala"]
] as const;

const projects = [
  {
    eyebrow: "PESQUISA APLICADA",
    title: "InteliEduca",
    text: "Inteligência Artificial aplicada a ambientes virtuais de aprendizagem, com foco em personalização, feedback, engajamento e monitoramento.",
    tags: ["IA + Educação", "Personalização", "AVA"],
    href: "https://github.com/SanvalEbert/InteliEduca"
  },
  {
    eyebrow: "FORMAÇÃO",
    title: "Professor IA",
    text: "Jornada formativa para potencializar a prática docente com Inteligência Artificial de forma aplicada e contextualizada.",
    tags: ["Formação", "IA Generativa", "Educação"],
    href: "https://github.com/SanvalEbert/professor-ia"
  },
  {
    eyebrow: "TECNOLOGIA + IMPACTO",
    title: "Acolher",
    text: "Aplicação web responsiva que reúne informação e orientação sobre violência doméstica, conectando tecnologia, experiência e impacto social.",
    tags: ["Web", "UX", "Impacto Social"],
    href: "https://github.com/SanvalEbert/AppMulher"
  }
] as const;

export default function Home() {
  return (
    <main>
      <a className="skip-link" href="#content">Ir para o conteúdo</a>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Sanval Ebert — início">
          <span>SANVAL</span> EBERT
        </a>
        <nav aria-label="Navegação principal">
          <a href="#research">Pesquisa</a>
          <a href="#solutions">Soluções</a>
          <a href="#training">Formação</a>
          <a href="#projects">Projetos</a>
          <a href="#about">Sobre</a>
        </nav>
        <a className="nav-cta" href="#contact">Vamos conversar</a>
      </header>

      <section className="hero" id="top">
        <div className="mesh" aria-hidden="true" />
        <div className="hero-glow hero-glow-a" aria-hidden="true" />
        <div className="hero-glow hero-glow-b" aria-hidden="true" />

        <div className="container hero-grid" id="content">
          <div className="hero-copy">
            <p className="kicker">INTELIGÊNCIA ARTIFICIAL APLICADA</p>
            <h1>
              Pesquisa, educação e soluções para transformar <em>desafios reais</em> em sistemas inteligentes.
            </h1>
            <p className="hero-lead">
              Da compreensão do problema à construção da solução: dados, IA, automação e integração.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">Explorar meu trabalho</a>
              <a className="button secondary" href="#contact">Construir uma solução <span>→</span></a>
            </div>
            <div className="profile-strip" aria-label="Perfis profissionais e acadêmicos">
              {profiles.map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
              ))}
            </div>
          </div>

          <div className="hero-ecosystem" aria-label="Ecossistema de atuação profissional">
            <div className="orbit orbit-a" aria-hidden="true" />
            <div className="orbit orbit-b" aria-hidden="true" />
            <div className="portrait-shell">
              <span className="portrait-label">SANVAL EBERT</span>
              <Image
                src="https://avatars.githubusercontent.com/u/115511942?v=4"
                alt="Sanval Ebert"
                width={560}
                height={560}
                priority
              />
              <div className="portrait-gradient" aria-hidden="true" />
            </div>
            <article className="node node-research">
              <small>RESEARCH</small><strong>IA + Educação</strong>
            </article>
            <article className="node node-solutions">
              <small>AI SOLUTIONS</small><strong>Dados + Automação</strong>
            </article>
            <article className="node node-education">
              <small>EDUCATION</small><strong>Formação + Docência</strong>
            </article>
            <article className="node node-innovation">
              <small>INNOVATION</small><strong>Projetos + Tecnologia</strong>
            </article>
          </div>
        </div>

        <div className="container pipeline" aria-label="Pipeline de atuação">
          {(["Problema", "Dados", "IA", "Automação", "Integração", "Impacto"] as const).map((item, index) => (
            <div className="pipeline-item" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
          <i className="pipeline-pulse" aria-hidden="true" />
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <p className="kicker">TRÊS FRENTES. UMA MESMA LÓGICA.</p>
          <div className="section-heading">
            <h2>O que pode ser transformado com Inteligência Artificial?</h2>
            <p>A IA ganha valor quando parte de contexto, pessoas, dados e um problema que merece ser compreendido.</p>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar) => (
              <a className="pillar-card" href={pillar.href} key={pillar.tag}>
                <span className="card-number">{pillar.number}</span>
                <small>{pillar.tag}</small>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
                <b>Explorar <span>↗</span></b>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="solutions">
        <div className="container">
          <p className="kicker">DA PERGUNTA À SOLUÇÃO</p>
          <div className="section-heading split-heading">
            <h2>IA não começa no modelo. Começa no problema.</h2>
            <p>Um pipeline orientado a contexto permite ir da descoberta à implementação sem perder qualidade, experiência e responsabilidade.</p>
          </div>
          <div className="process-grid">
            {process.map(([number, title, text]) => (
              <article className="process-card" key={title}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <p className="kicker">PROJETOS E IMPACTO</p>
          <div className="section-heading split-heading">
            <h2>Pesquisa e tecnologia em prática.</h2>
            <p>Projetos funcionam como evidência: mostram como conhecimento, design e engenharia podem convergir em produtos e experiências reais.</p>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <a className="project-card" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <div className="project-topline"><span>{project.eyebrow}</span><i>↗</i></div>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section dual-section" id="research">
        <div className="container dual-grid">
          <article>
            <p className="kicker">PESQUISA</p>
            <h2>Conhecimento que informa novas possibilidades.</h2>
            <p className="body-copy">Minha agenda de pesquisa conecta Inteligência Artificial, educação, personalização, ambientes virtuais, dados educacionais e IA generativa.</p>
            <div className="topic-list">
              <span>IA aplicada à Educação</span><span>Personalização</span><span>Ambientes Virtuais Inteligentes</span><span>Dados Educacionais</span><span>LLMs</span><span>Feedback e Engajamento</span>
            </div>
            <a className="inline-link" href="https://scholar.google.com/citations?hl=pt-BR&user=QT7zAOIAAAAJ" target="_blank" rel="noreferrer">Explorar produção acadêmica <span>↗</span></a>
          </article>
          <aside className="research-visual" aria-label="Conexão entre pesquisa, evidência e aplicação">
            <div className="research-core"><span>IA</span><strong>EDUCAÇÃO</strong></div>
            <div className="research-ring ring-one"><span>Dados</span></div>
            <div className="research-ring ring-two"><span>Contexto</span></div>
            <div className="research-ring ring-three"><span>Intervenção</span></div>
          </aside>
        </div>
      </section>

      <section className="section" id="training">
        <div className="container">
          <p className="kicker">FORMAÇÃO</p>
          <div className="section-heading split-heading">
            <h2>Aprender IA para transformar a prática.</h2>
            <p>Formação desenhada para diferentes públicos, sempre conectando tecnologia, contexto profissional e aplicação.</p>
          </div>
          <div className="audience-grid">
            {[
              ["Professores", "Planejamento, feedback, avaliação, produtividade e personalização."],
              ["Pesquisadores", "Literatura, análise, escrita, dados e workflows científicos."],
              ["Gestores", "Processos, decisões, automação e transformação organizacional."],
              ["Equipes técnicas", "Dados, agentes, integrações, cloud e automação."],
              ["Organizações", "Programas personalizados construídos a partir de problemas reais."]
            ].map(([title, text]) => (
              <article key={title}><strong>{title}</strong><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div>
            <p className="kicker">SOBRE</p>
            <h2>Na interseção entre pesquisa, ensino e construção de tecnologia.</h2>
          </div>
          <div>
            <p className="body-copy">Atuo conectando Ciência da Computação, Educação e Inteligência Artificial. Minha trajetória combina docência, pesquisa, coordenação acadêmica, desenvolvimento de software e projetos aplicados.</p>
            <p className="body-copy">O ponto comum entre essas experiências é simples: compreender problemas complexos, organizar conhecimento e construir caminhos aplicáveis.</p>
            <div className="about-links">
              <a href="https://lattes.cnpq.br/6700242085425421" target="_blank" rel="noreferrer">Currículo Lattes ↗</a>
              <a href="https://orcid.org/0000-0003-3196-6468" target="_blank" rel="noreferrer">ORCID ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container contact-card">
          <p className="kicker">A CONVERSA COMEÇA PELO PROBLEMA</p>
          <h2>Qual problema você quer transformar?</h2>
          <p>Se existe um processo, uma decisão, um fluxo de informação ou uma experiência que pode ser repensada com Inteligência Artificial, podemos começar por aí.</p>
          <div className="hero-actions">
            <a className="button primary" href="https://www.linkedin.com/in/msc-sanval-ebert/" target="_blank" rel="noreferrer">Vamos conversar</a>
            <a className="button secondary" href="https://github.com/SanvalEbert" target="_blank" rel="noreferrer">Conhecer meus projetos <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><strong>SANVAL EBERT</strong><span>Pesquisa · Educação · Inteligência Artificial</span></div>
          <div className="footer-links">{profiles.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div>
        </div>
      </footer>
    </main>
  );
}
