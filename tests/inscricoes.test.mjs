import { test, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import handler, { EDICAO } from '../api/inscricoes.js';

const ambiente = { ...process.env };
const fetchAnterior = global.fetch;
after(() => { process.env = ambiente; global.fetch = fetchAnterior; });
beforeEach(() => {
  process.env.SUPABASE_URL = 'https://banco.supabase.co';
  process.env.SUPABASE_SECRET_KEY = 'sb_secret_teste';
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.WHATSAPP_GROUP_URL;
});

let ipSeq = 1;
function simular(body, { origin = 'https://portal.test', tipo = 'application/json', method = 'POST' } = {}) {
  const ip = `10.0.0.${ipSeq++}`;
  const req = { method, body, headers: { host: 'portal.test', origin, 'content-type': tipo, 'x-forwarded-for': ip, 'user-agent': 'teste' }, socket: { remoteAddress: ip } };
  let dados;
  const res = { statusCode: 200, headers: {}, setHeader(n, v) { this.headers[n] = v; }, end(v) { dados = JSON.parse(v); } };
  return { req, res, get dados() { return dados; } };
}

const valido = {
  nome_completo: 'Maria da Silva', whatsapp: '(71) 99999-1234', email: 'Maria@Escola.edu.br', cidade: 'Salvador',
  estado: 'ba', instituicao_ensino: 'Escola Estadual', experiencia_ia: 'Iniciante', consentimento_lgpd: true,
};

test('grava no Supabase com a edição, sem expor a chave, e devolve o link do grupo', async () => {
  let chamada;
  global.fetch = async (url, opcoes) => { chamada = { url, opcoes }; return new Response(null, { status: 201 }); };
  const s = simular(valido);
  await handler(s.req, s.res);
  assert.equal(s.res.statusCode, 201);
  assert.match(s.dados.grupo, /^https:\/\/chat\.whatsapp\.com\//);
  assert.equal(chamada.url, 'https://banco.supabase.co/rest/v1/participantes');
  assert.equal(chamada.opcoes.headers.apikey, 'sb_secret_teste');
  assert.equal(chamada.opcoes.headers.Authorization, undefined);
  const corpo = JSON.parse(chamada.opcoes.body);
  assert.equal(corpo.edicao, EDICAO);
  assert.equal(corpo.email, 'maria@escola.edu.br');
  assert.equal(corpo.whatsapp, '71999991234');
  assert.equal(corpo.estado, 'BA');
  assert.equal(JSON.stringify(s.dados).includes('sb_secret'), false);
});

test('sem a coluna edicao no banco, grava de novo sem ela', async () => {
  const corpos = [];
  global.fetch = async (_url, opcoes) => {
    corpos.push(JSON.parse(opcoes.body));
    return corpos.length === 1
      ? new Response('{"code":"PGRST204","message":"Could not find the \'edicao\' column"}', { status: 400 })
      : new Response(null, { status: 201 });
  };
  const s = simular(valido);
  await handler(s.req, s.res);
  assert.equal(s.res.statusCode, 201);
  assert.equal(corpos.length, 2);
  assert.equal('edicao' in corpos[1], false);
});

test('e-mail repetido na edição retorna 409', async () => {
  global.fetch = async () => new Response('{"code":"23505","message":"duplicate key"}', { status: 409 });
  const s = simular(valido);
  await handler(s.req, s.res);
  assert.equal(s.res.statusCode, 409);
  assert.equal(s.dados.erro, 'already_registered');
});

test('campos inválidos, sem consentimento ou origem externa são recusados sem tocar no banco', async () => {
  let chamou = false;
  global.fetch = async () => { chamou = true; return new Response(null, { status: 201 }); };
  for (const corpo of [{ ...valido, email: 'sem-arroba' }, { ...valido, consentimento_lgpd: false }, { ...valido, estado: 'XX' }, { ...valido, experiencia_ia: 'Expert' }]) {
    const s = simular(corpo); await handler(s.req, s.res);
    assert.equal(s.res.statusCode, 400);
  }
  const externa = simular(valido, { origin: 'https://outro.site' }); await handler(externa.req, externa.res);
  assert.equal(externa.res.statusCode, 403);
  const metodo = simular(valido, { method: 'GET' }); await handler(metodo.req, metodo.res);
  assert.equal(metodo.res.statusCode, 405);
  assert.equal(chamou, false);
});

test('campo isca preenchido finge sucesso e não grava', async () => {
  let chamou = false;
  global.fetch = async () => { chamou = true; return new Response(null, { status: 201 }); };
  const s = simular({ ...valido, website: 'spam.com' }); await handler(s.req, s.res);
  assert.equal(s.res.statusCode, 201);
  assert.equal(chamou, false);
});

test('sem credenciais do banco responde 503', async () => {
  delete process.env.SUPABASE_URL;
  const s = simular(valido); await handler(s.req, s.res);
  assert.equal(s.res.statusCode, 503);
  assert.equal(s.dados.erro, 'registrations_not_configured');
});
