// Função Vercel: inscrições da imersão "Inteligência Artificial na Prática Docente".
// Grava na tabela `participantes` do Supabase (a mesma usada pelo site anterior da imersão).
// A chave secreta fica só no servidor: SUPABASE_URL e SUPABASE_SECRET_KEY (ou SUPABASE_SERVICE_ROLE_KEY).
// O link do grupo pode ser definido em WHATSAPP_GROUP_URL.
//
// Cada inscrição registra a edição (coluna `edicao`). Se o banco ainda não tiver essa coluna,
// a inscrição é gravada sem ela, para não perder ninguém (ver docs/inscricoes-imersao.md).

export const EDICAO = '2027-02';
const GRUPO_PADRAO = 'https://chat.whatsapp.com/FLHy7jnIBoTIf3cewk6zTW';

const estados = new Set(['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']);
const experiencias = new Set(['Nenhuma', 'Iniciante', 'Intermediário', 'Avançado']);

const janelaMs = 10 * 60_000;
const limitePorJanela = 8;
const acessos = new Map();

function resposta(res, status, conteudo) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(conteudo));
}

function origemPermitida(req) {
  const origem = req.headers.origin;
  if (!origem) return true;
  try {
    return new URL(origem).host === req.headers.host;
  } catch {
    return false;
  }
}

function permitida(ip) {
  const agora = Date.now();
  if (acessos.size > 5000) {
    for (const [chave, valor] of acessos) if (agora - valor.inicio > janelaMs) acessos.delete(chave);
  }
  const atual = acessos.get(ip);
  if (!atual || agora - atual.inicio >= janelaMs) {
    acessos.set(ip, { inicio: agora, quantidade: 1 });
    return true;
  }
  if (atual.quantidade >= limitePorJanela) return false;
  atual.quantidade++;
  return true;
}

const limpar = (valor, max = 180) =>
  typeof valor === 'string' ? valor.trim().replace(/\s+/g, ' ').slice(0, max) : '';

function lerCorpo(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return null; }
  }
  return null;
}

export function validar(corpo) {
  const nome_completo = limpar(corpo.nome_completo, 160);
  const whatsapp = limpar(corpo.whatsapp, 30).replace(/\D/g, '');
  const email = limpar(corpo.email, 180).toLowerCase();
  const cidade = limpar(corpo.cidade, 120);
  const estado = limpar(corpo.estado, 2).toUpperCase();
  const instituicao_ensino = limpar(corpo.instituicao_ensino, 180);
  const experiencia_ia = limpar(corpo.experiencia_ia, 30);
  const consentimento_lgpd = corpo.consentimento_lgpd === true || corpo.consentimento_lgpd === 'true';
  const valido =
    nome_completo.length >= 3 &&
    whatsapp.length >= 10 && whatsapp.length <= 13 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    cidade.length >= 2 &&
    estados.has(estado) &&
    instituicao_ensino.length >= 2 &&
    experiencias.has(experiencia_ia) &&
    consentimento_lgpd;
  if (!valido) return null;
  return {
    nome_completo, whatsapp, email, cidade, estado, instituicao_ensino, experiencia_ia, consentimento_lgpd,
    origem: limpar(corpo.origem, 300) || 'portal-sanvalebert',
    utm_source: limpar(corpo.utm_source, 120) || null,
    utm_medium: limpar(corpo.utm_medium, 120) || null,
    utm_campaign: limpar(corpo.utm_campaign, 160) || null,
  };
}

async function gravar(url, chave, dados) {
  const cabecalhos = { apikey: chave, 'Content-Type': 'application/json', Prefer: 'return=minimal' };
  // Chaves legadas (service_role) são JWT e usam também Authorization; as novas sb_secret_* não.
  if (!chave.startsWith('sb_secret_')) cabecalhos.Authorization = `Bearer ${chave}`;
  return fetch(`${url.replace(/\/$/, '')}/rest/v1/participantes`, {
    method: 'POST',
    headers: cabecalhos,
    body: JSON.stringify(dados),
    signal: AbortSignal.timeout(8000),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return resposta(res, 405, { erro: 'method_not_allowed' });
  }
  if (!origemPermitida(req)) return resposta(res, 403, { erro: 'origin_not_allowed' });
  const tipo = String(req.headers['content-type'] || '').toLowerCase();
  if (!tipo.includes('application/json')) return resposta(res, 415, { erro: 'unsupported_media_type' });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'desconhecido').split(',')[0].trim();
  if (!permitida(ip)) return resposta(res, 429, { erro: 'too_many_requests' });

  const corpo = lerCorpo(req);
  if (!corpo) return resposta(res, 400, { erro: 'invalid_body' });
  // Campo invisível: robôs simples o preenchem; pessoas não.
  if (limpar(corpo.website, 120)) return resposta(res, 201, { ok: true, grupo: null });

  const dados = validar(corpo);
  if (!dados) return resposta(res, 400, { erro: 'invalid_fields' });

  const url = process.env.SUPABASE_URL;
  const chave = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !chave) return resposta(res, 503, { erro: 'registrations_not_configured' });

  dados.user_agent = limpar(req.headers['user-agent'], 500) || null;
  const grupo = process.env.WHATSAPP_GROUP_URL || GRUPO_PADRAO;

  try {
    let retorno = await gravar(url, chave, { ...dados, edicao: EDICAO });
    let detalhe = retorno.ok ? '' : await retorno.text();
    // Banco ainda sem a coluna `edicao`: grava sem ela.
    if (!retorno.ok && /edicao/i.test(detalhe) && /(PGRST204|42703|column)/i.test(detalhe)) {
      retorno = await gravar(url, chave, dados);
      detalhe = retorno.ok ? '' : await retorno.text();
    }
    if (!retorno.ok) {
      const duplicada = retorno.status === 409 || detalhe.includes('23505') || /duplicate/i.test(detalhe);
      if (duplicada) return resposta(res, 409, { erro: 'already_registered' });
      console.error('Supabase recusou a inscrição:', retorno.status, detalhe.slice(0, 300));
      return resposta(res, 502, { erro: 'storage_unavailable' });
    }
    return resposta(res, 201, { ok: true, grupo });
  } catch (erro) {
    console.error('Falha ao gravar a inscrição:', erro?.name || erro);
    return resposta(res, 502, { erro: 'storage_unavailable' });
  }
}
