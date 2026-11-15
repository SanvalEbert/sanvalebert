# Sanval Ebert · Portal

Site de Sanval Ebert: identidade profissional, pesquisa, resultados dos estudantes, palestras e cursos.
Português como idioma principal, com versão em inglês em `/en/`.

## Como rodar

```bash
npm install
npm run dev      # servidor local
npm test         # tipos, build e verificação de links
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

O endereço e o caminho base vêm das variáveis `SITE_URL` e `BASE_PATH`
(por exemplo, `BASE_PATH=/sanvalebert` no GitHub Pages sem domínio próprio).
