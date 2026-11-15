# Assistente San

O componente `src/components/San.astro` oferece um guia textual em todas as páginas, no idioma da página. Usa o retrato já publicado como avatar e a identidade visual do portal. O botão fica à esquerda, separado dos controles de navegação e do VLibras.

Esta primeira versão consulta um catálogo local por palavras, acentos e variações de plural. As respostas são trechos editoriais do catálogo; as publicações e suas sínteses vêm diretamente de `src/data/publicacoes.ts`. Cada resposta encontrada inclui links para as páginas ou fontes originais e contato pelo WhatsApp. Sem correspondência, informa que não encontrou a informação. Não confirma preços ou disponibilidade.

A interface usa diálogo modal nativo com foco inicial, Escape e retorno do foco ao botão de abertura. Os textos enviados são inseridos com `textContent`. A conversa permanece somente na memória da página, tem limite de mensagens e pode ser limpa. Não há envio de perguntas a APIs nem persistência em armazenamento do navegador.

## Integração de IA pendente

Esta versão não usa um modelo de linguagem. A integração exige escolher e configurar o provedor e criar uma rota de servidor com credenciais exclusivamente no servidor. O projeto atual é estático. A futura rota deve recuperar os conteúdos relevantes, devolver referências verificáveis, limitar requisições e manter o catálogo como alternativa quando o serviço estiver indisponível. Não colocar chaves em atributos HTML ou variáveis públicas.

## Validação

`tests/san.spec.ts` cobre fontes de publicações, perguntas sem correspondência, tratamento de HTML como texto, teclado, histórico, português/inglês, layout e acessibilidade em computador e celular. Execute com a suíte existente: `npm test` em Node.js 24.
