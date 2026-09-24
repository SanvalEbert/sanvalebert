# Sanval Ebert — Portal Profissional

Portal profissional de **Sanval Ebert**, concebido como um hub de pesquisa, soluções em Inteligência Artificial, formação, projetos, publicações e presença profissional.

## Visão

O portal não será um currículo digital. A experiência comunica a convergência entre:

- **Pesquisa** — Inteligência Artificial aplicada à educação, personalização, ambientes virtuais e dados;
- **Soluções em IA** — diagnóstico, dados, modelos, automação, agentes, integrações e implementação;
- **Formação** — cursos, workshops, palestras, formação docente e capacitação de organizações;
- **Projetos e impacto** — evidências concretas de pesquisa aplicada, desenvolvimento e atuação profissional.

## Posicionamento

> Transformar desafios reais em soluções com Inteligência Artificial, dados e automação.

## Assinatura de processo

**Problema → Dados → IA → Automação → Integração → Impacto**

## Stack

- Next.js 16.3.6
- React 19.3
- TypeScript
- App Router
- Exportação estática
- GitHub Actions para validação de build

## Executar localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
```

## Estrutura atual

- `app/page.tsx` — Home v0.1
- `app/globals.css` — sistema visual e responsividade
- `app/layout.tsx` — metadata e layout raiz
- `docs/home-blueprint.md` — blueprint completo da Home
- `docs/design-system.md` — sistema visual inicial
- `.github/workflows/ci.yml` — validação automática do build

## Direção visual

A linguagem visual parte do DNA desenvolvido no projeto `wla_2026`, evoluindo para um portal explorável e de longa duração:

- base escura;
- ciano e azul como cores de energia e interação;
- superfícies discretas;
- tipografia de alto contraste;
- microinterações;
- movimento ambiental sutil;
- acessibilidade e performance como requisitos de projeto.

## Status

**v0.1 — Home publicada no GitHub**

A primeira versão funcional já contém Hero, ecossistema de atuação, pipeline, frentes de pesquisa/soluções/formação, projetos, pesquisa, formação, sobre e CTA final. O build é validado automaticamente pelo GitHub Actions.
