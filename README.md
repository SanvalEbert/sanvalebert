# Sanval Ebert · Portal

Site de Sanval Ebert: identidade profissional, pesquisa, resultados dos estudantes, palestras e cursos.
Português como idioma principal, com versão em inglês em `/en/`.

## Como rodar

```bash
npm install
npm run dev      # servidor local
npm test         # tipos, build, links, navegação e acessibilidade
```

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Textos em português e inglês | `src/i18n/textos.ts` |
| Menu, redes e contato | `src/data/site.ts` |
| Cores, tipografia e componentes visuais | `src/styles/global.css` |
| Cabeçalho, rodapé e página inicial | `src/components/` |
| Rotas (`/` e `/en/`) | `src/pages/` |

Uma página nova entra no menu quando `pronta` passa a `true` em `src/data/site.ts`.

## Publicação

Hospedagem escolhida: Vercel. Importe este repositório como um projeto Astro,
com Node.js 24.x e saída `dist`. A configuração em `vercel.json` executa a
verificação de tipos e links antes de publicar. O código em desenvolvimento está
em `feat/base-e-inicio`; a `main` ainda não contém a implementação.
Para avaliar a migração, use a branch `feat/vercel-preview`.
Os testes de navegador rodam com `npm test`; para usar um Chrome instalado,
defina `PW_CHANNEL=chrome` no ambiente.

O endereço e o caminho base vêm das variáveis `SITE_URL` e `BASE_PATH`
(por exemplo, `BASE_PATH=/sanvalebert` no GitHub Pages sem domínio próprio).
