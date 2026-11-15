# Assistente San

O componente `src/components/San.astro` oferece um guia textual em todas as p�ginas, no idioma da p�gina. Usa o retrato j� publicado como avatar e a identidade visual do portal. O bot�o fica � esquerda, separado dos controles de navega��o e do VLibras.

Esta primeira vers�o consulta um cat�logo local por palavras, acentos e varia��es de plural. As respostas s�o trechos editoriais do cat�logo; as publica��es e suas s�nteses v�m diretamente de `src/data/publicacoes.ts`. Cada resposta encontrada inclui links para as p�ginas ou fontes originais e contato pelo WhatsApp. Sem correspond�ncia, informa que n�o encontrou a informa��o. N�o confirma pre�os ou disponibilidade.

A interface usa di�logo modal nativo com foco inicial, Escape e retorno do foco ao bot�o de abertura. Os textos enviados s�o inseridos com `textContent`. A conversa permanece somente na mem�ria da p�gina, tem limite de mensagens e pode ser limpa. N�o h� envio de perguntas a APIs nem persist�ncia em armazenamento do navegador.

## Integra��o de IA pendente

Esta vers�o n�o usa um modelo de linguagem. A integra��o exige escolher e configurar o provedor e criar uma rota de servidor com credenciais exclusivamente no servidor. O projeto atual � est�tico. A futura rota deve recuperar os conte�dos relevantes, devolver refer�ncias verific�veis, limitar requisi��es e manter o cat�logo como alternativa quando o servi�o estiver indispon�vel. N�o colocar chaves em atributos HTML ou vari�veis p�blicas.

## Valida��o

`tests/san.spec.ts` cobre fontes de publica��es, perguntas sem correspond�ncia, tratamento de HTML como texto, teclado, hist�rico, portugu�s/ingl�s, layout e acessibilidade em computador e celular. Execute com a su�te existente: `npm test` em Node.js 24.
