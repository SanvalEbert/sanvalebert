# Assistente San com GPT-6 Luna

O componente `src/components/San.astro` é exibido em todas as páginas do portal em português e inglês. Preserva o avatar 3D de `public/images/san-avatar-3d.webp`, a navegação acessível e os links oficiais do catálogo.

## Arquitetura de baixo custo

- O site Astro continua inteiramente estático.
- `api/chat.js` é uma função HTTP da Vercel executada somente quando há consulta relevante.
- O navegador envia a pergunta (até 500 caracteres), idioma, até três referências do catálogo e um histórico curto.
- A função chama a **Responses API** pelo servidor usando `gpt-6-luna`, `reasoning.effort=none`, `max_output_tokens=260` e `store=false`.
- O modelo recebe apenas o conteúdo relevante do portal e orientação para não inventar fatos. A interface mostra links oficiais separados da resposta.
- Contato, saudações e agradecimentos são atendidos localmente para economizar tokens.
- Em falta de chave, erro, falta de rede ou tempo esgotado, o catálogo local continua disponível.
- Perguntas e respostas não são persistidas pelo projeto; o histórico da interface permanece apenas na memória da página.

## Configuração necessária (nunca commitar chave)

1. Na plataforma OpenAI, crie uma chave de API no projeto destinado ao portal e ative o faturamento.
2. Na **Vercel**, abra o projeto que realmente publica `sanvalebert.vercel.app` → **Settings → Environment Variables**.
3. Cadastre `OPENAI_API_KEY` como segredo do servidor, escolhendo os ambientes de Preview e Production desejados.
4. Publique uma nova versão para carregar a variável. Nunca use prefixo `PUBLIC_` ou `VITE_` e nunca coloque a chave em HTML, JavaScript cliente, GitHub ou conversas.
5. Configure notificações de consumo e orçamento na OpenAI; a cobrança é separada do ChatGPT Plus.
6. Verifique se `POST /api/chat` está acessível pela implantação Vercel e teste a pesquisa e uma publicação. Sem a chave, a rota deve responder 503, sem revelar credenciais.

> O site local `astro preview` serve as páginas estáticas, mas não executa a função Vercel. O modo fallback funciona localmente; o endpoint de IA precisa de implantação na Vercel para o teste real.

## Controles e ressalvas

- Origem de navegador deve coincidir com a hospedagem.
- Tamanho de requisição e referências limitado, timeout de 12 segundos no provedor e de 9 segundos no cliente.
- Limite inicial de 12 consultas por minuto e por IP **em cada instância**. Não é um rate limit global contra abuso distribuído; para produção com mais tráfego, configurar proteção e rate limit persistente na borda/Vercel WAF.
- O teto de `max_output_tokens` reduz o custo por chamada, **não estabelece limite rígido de gastos mensais**. Acompanhe o faturamento e defina alertas ou limites disponíveis em sua conta.
- A base de conhecimento é o catálogo do site, não a internet em tempo real. Para melhorar a cobertura, adicione conteúdo factual às páginas e ao catálogo antes de esperar novas respostas.

## Testes

- `node --test tests/api.test.mjs`: testes de contrato sem chamada real à OpenAI.
- `tests/san-ai.spec.ts`: simulação da resposta da API e fallback no navegador.
- `npm test`: tipos, build, links, API, navegador e acessibilidade, com Node.js 24.

A integração real fica pendente da configuração da variável `OPENAI_API_KEY` e da validação do deployment Vercel correto.
