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
- Tamanho de requisição e referências limitado, timeout de 8 segundos no provedor e de 9 segundos no cliente.
- Limite inicial de 12 consultas por minuto e por IP **em cada instância**. Não é um rate limit global contra abuso distribuído; para produção com mais tráfego, configurar proteção e rate limit persistente na borda/Vercel WAF.
- O teto de `max_output_tokens` reduz o custo por chamada, **não estabelece limite rígido de gastos mensais**. Acompanhe o faturamento e defina alertas ou limites disponíveis em sua conta.
- A base de conhecimento é o catálogo do site, não a internet em tempo real. Para melhorar a cobertura, adicione conteúdo factual às páginas e ao catálogo antes de esperar novas respostas.

## Testes

- `node --test tests/api.test.mjs`: testes de contrato sem chamada real à OpenAI.
- `tests/san-ai.spec.ts`: simulação da resposta da API e fallback no navegador.
- `npm test`: tipos, build, links, API, navegador e acessibilidade, com Node.js 24.

A integração real fica pendente da configuração da variável `OPENAI_API_KEY` e da validação do deployment Vercel correto.

## Teste de prévia após configurar a chave

Toda alteração de variáveis na Vercel exige **nova implantação**. Ao salvar `OPENAI_API_KEY`, faça novo deploy de **Preview** (por exemplo, por meio de commit na branch deste pull request); deploys anteriores não recebem a variável.

Valide na URL de preview, antes de integrar à `main`:

1. Confirme que o campo de variáveis da Vercel mostra `OPENAI_API_KEY` como **Secret**, nos escopos Production e Preview, sem mostrar o valor.
2. Pergunte “Quais são as pesquisas de Sanval em IA?” e verifique uma resposta contextualizada, com links para fontes do portal.
3. Pergunte “Quero o contato do professor Saval” e confira se o WhatsApp oficial é fornecido.
4. Faça uma pergunta sem suporte no conteúdo e verifique se o assistente não inventa uma resposta.
5. Se a rota de IA retornar 503/502, verificar o status de faturamento/permissões da OpenAI e os logs da função na Vercel, sem expor a chave.

O registro de testes automatizados simula o provedor, portanto não substitui o teste real com a chave de API configurada.

## UX final: convite do San

O launcher fixo agora fica no canto inferior direito, com avatar 3D em moldura circular e convite **“Pergunte ao San”** / **“Ask San”**. No desktop, a descrição curta diz “Pesquisas, publicações e contato”. Os controles de navegação da página ficam do lado esquerdo para evitar sobreposição. Em telas pequenas o convite se adapta e o diálogo de conversa cabe no viewport. Sem animações obrigatórias para quem prefere movimento reduzido.

## Estatísticas privadas de visitantes (Vercel Web Analytics)

- O layout comum inclui o script Vercel `/_vercel/insights/script.js` para registrar visualizações e visitantes de modo agregado, sem contador público.
- **É necessário habilitar Web Analytics** no projeto `sanvalebert` na Vercel: projeto → **Analytics → Enable**. A ativação acrescenta rotas de coleta na implantação **seguinte**, portanto faça novo deploy após habilitar.
- No painel Web Analytics, consultar **Visitors**, **Page Views**, **Countries**, **Referrers** e **Pages**. A origem geográfica representa país/região agregados, não identificação pessoal ou endereço exato.
- Não são instalados cookies de rastreamento pela integração. O visitante único é uma estimativa e a identificação de visitas não persiste entre dias.
- No plano Hobby há até 50.000 eventos/mês e relatório mensal, conforme https://vercel.com/docs/analytics/limits-and-pricing. O recurso é separado dos custos da API OpenAI.
- Se o painel permanecer vazio, verificar se está habilitado e se a implantação posterior está publicada. Em Network, confirmar o carregamento do script e os eventos na rota de coleta.

