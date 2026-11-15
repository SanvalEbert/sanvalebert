import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/chat.js';

const chaveAnterior = process.env.OPENAI_API_KEY;
const fetchAnterior = global.fetch;
after(() => {
  if (chaveAnterior === undefined) delete process.env.OPENAI_API_KEY;
  else process.env.OPENAI_API_KEY = chaveAnterior;
  global.fetch = fetchAnterior;
});

function simular({ method = 'POST', origin = 'https://portal.test', body = null } = {}) {
  const headers = { host: 'portal.test', origin, 'x-forwarded-for': '127.0.0.22' };
  const req = { method, headers, body, socket: { remoteAddress: '127.0.0.22' } };
  let retorno;
  const res = {
    statusCode: 200,
    headers: {},
    setHeader(nome, valor) { this.headers[nome] = valor; },
    end(valor) { retorno = JSON.parse(valor); },
  };
  return { req, res, get dados() { return retorno; } };
}

const base = {
  pergunta: 'O que Sanval pesquisa?',
  idioma: 'pt',
  referencias: [{ titulo: 'Pesquisa', resumo: 'Sanval pesquisa IA na educação e ambientes imersivos.', url: '/pesquisa/' }],
};

test('sem chave retorna 503 e nunca chama o provedor', async () => {
  delete process.env.OPENAI_API_KEY;
  const req = simular({ body: base });
  await handler(req.req, req.res);
  assert.equal(req.res.statusCode, 503);
  assert.equal(req.dados.erro, 'ai_not_configured');
});

test('responde pela API do GPT-6 Luna sem divulgar credenciais', async () => {
  process.env.OPENAI_API_KEY = 'chave-falsa-para-teste';
  let corpo;
  global.fetch = async (_url, options) => {
    corpo = JSON.parse(options.body);
    assert.equal(options.headers.Authorization, 'Bearer chave-falsa-para-teste');
    return {
      ok: true,
      json: async () => ({ output: [{ type: 'message', content: [{ type: 'output_text', text: 'Sanval pesquisa IA aplicada à educação.' }] }] }),
    };
  };
  const req = simular({ body: base });
  await handler(req.req, req.res);
  assert.equal(req.res.statusCode, 200);
  assert.equal(req.dados.resposta, 'Sanval pesquisa IA aplicada à educação.');
  assert.equal(corpo.model, 'gpt-6-luna');
  assert.equal(corpo.reasoning.effort, 'none');
  assert.equal(corpo.store, false);
  assert.ok(!JSON.stringify(req.dados).includes('chave-falsa'));
});

test('bloqueia origens externas', async () => {
  process.env.OPENAI_API_KEY = 'teste';
  const req = simular({ body: base, origin: 'https://outro-site.test' });
  await handler(req.req, req.res);
  assert.equal(req.res.statusCode, 403);
});

test('recusa perguntas extensas', async () => {
  process.env.OPENAI_API_KEY = 'teste';
  const req = simular({ body: { ...base, pergunta: 'A'.repeat(501) } });
  await handler(req.req, req.res);
  assert.equal(req.res.statusCode, 400);
});
