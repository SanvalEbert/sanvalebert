# Sanval Ebert · Portal

Site de Sanval Ebert: identidade profissional, pesquisa, resultados dos estudantes, palestras e cursos.
Português como idioma principal, com versões em inglês (`/en/`) e espanhol (`/es/`).

## Como rodar

```bash
npm install
npm run dev      # servidor local
npm test         # tipos, build, links, navegação e acessibilidade
```

## Onde fica cada coisa

| O quê | Onde |
| --- | --- |
| Textos em português, inglês e espanhol | `src/i18n/textos.ts`, `src/i18n/paginas.ts` e `tr()` em `src/i18n/tr.ts` |
| Menu, redes e contato | `src/data/site.ts` |
| Cores, tipografia e componentes visuais | `src/styles/global.css` |
| Cabeçalho, rodapé e página inicial | `src/components/` |
| Rotas (`/` e `/en/`) | `src/pages/` |
| Destaques da página inicial (carrossel) | `src/data/destaques.ts` |
| Notícias e treinamentos | `src/data/noticias.ts` |

Destaques e notícias marcados com `rascunho: true` aparecem só no `npm run dev`.
Uma página nova entra no menu quando `pronta` passa a `true` em `src/data/site.ts`.

## Publicação

Hospedagem escolhida: Vercel. Importe este repositório como um projeto Astro,
com Node.js 24.x e saída `dist`. A configuração em `vercel.json` executa a
verificação de tipos e links antes de publicar. Os testes de navegador rodam com `npm test`; para usar um Chrome instalado,
defina `PW_CHANNEL=chrome` no ambiente.

O endereço e o caminho base vêm das variáveis `SITE_URL` e `BASE_PATH`
(por exemplo, `BASE_PATH=/sanvalebert` no GitHub Pages sem domínio próprio).
