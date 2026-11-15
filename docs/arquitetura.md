# Arquitetura e decisões

Registro curto das decisões técnicas, com o motivo de cada uma.

## 1. Gerador do site: Astro

Site de conteúdo, com páginas estáticas por padrão. Páginas que precisam de servidor
(login, área do estudante, pagamento) podem ser ligadas uma a uma com
`export const prerender = false`, sem reescrever o resto.

## 2. Hospedagem: Netlify

Critérios: o site vai vender cursos e palestras (uso comercial), vai precisar de
funções de servidor e deve ter prévia a cada alteração enquanto está em desenvolvimento.

| Opção | Servidor | Uso comercial no plano gratuito | Prévia por alteração |
| --- | --- | --- | --- |
| GitHub Pages | Não, só arquivos estáticos | Não | Não |
| Vercel | Sim | Não (exige o plano Pro) | Sim |
| Netlify | Sim | Sim | Sim |
| Cloudflare | Sim | Sim | Sim |

O código não depende do Netlify: trocar de hospedagem é trocar o adaptador em
`astro.config.mjs` (há adaptadores oficiais para Vercel, Netlify, Cloudflare e Node).

## 3. Áreas previstas, ainda não construídas

| Área | Rota | Como será feita |
| --- | --- | --- |
| Formulários (contato, lista de espera) | `/contratar/`, `/cursos/` | Função de servidor ou formulários da hospedagem |
| Conta do estudante (login) | `/conta/` | Serviço de autenticação pronto, com banco de dados gerenciado |
| Inscrição em projetos educacionais | `/conta/projetos/` | Páginas de servidor, protegidas por login |
| Compra de produtos | `/loja/` ou botão de compra nas páginas | Provedor de pagamento: o site nunca recebe nem guarda dados de cartão |

Regras para quando essas áreas entrarem:

- Senhas e dados de cartão ficam sempre com serviços especializados, nunca no nosso código.
- Dados pessoais dos estudantes seguem a LGPD: coletar o mínimo, com consentimento e política de privacidade.
- Chaves de acesso ficam em variáveis de ambiente da hospedagem, nunca no repositório.

## 4. Idiomas

Português em `/` e inglês em `/en/`. Textos lado a lado em `src/i18n/textos.ts`.
