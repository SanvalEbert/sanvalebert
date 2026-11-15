// TechEdu: piloto de cadastro mínimo. Nenhum segredo deve ser incluído neste arquivo.
// SDK oficial Supabase, versão imutável/pinada; chave pública (sb_publishable_) não é secreta.
// Fluxo OAuth com PKCE e sessão restrita a esta aba (sessionStorage).
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.0/+esm';

const PROJETO = 'https://rkmhpgyybawtmaeyvyva.supabase.co';
const CHAVE_PUBLICA = 'sb_publishable_mgDT9-Gx3gz-0IozYGRTiA_Evsg15sG';
const RETORNO = 'https://techedu.sanvalebert.com.br/servicos/';
const PENDENTE = 'techedu:servico-pendente:v1';
const PILOTO = 'techedu:piloto:v1';
const MODALIDADES = new Set(['palestras', 'treinamentos', 'minicursos', 'workshops']);
const raiz = document.querySelector('[data-techedu-piloto]');

if (raiz && window.isSecureContext) {
  const idioma = raiz.getAttribute('data-idioma') === 'en' ? 'en' : 'pt';
  const pt = idioma === 'pt';
  const texto = pt ? {
    falha: 'Não foi possível concluir a operação. Tente novamente.',
    erroLogin: 'Não foi possível concluir o login Google. Verifique se sua conta está na lista de usuários de teste e tente novamente.',
    obrigatorio: 'Selecione um serviço para prosseguir.',
    carregando: 'Conferindo sua sessão...',
    salvando: 'Registrando seu interesse...',
    salvo: 'Interesse registrado com sucesso. Obrigado!',
    jaExiste: 'Você já registrou interesse nesta modalidade.',
    vazio: 'Você ainda não registrou nenhum interesse.',
    usuario: 'Conta Google conectada',
    remover: 'Excluir este interesse',
    removerConfirmar: 'Deseja excluir este registro de interesse?',
    removido: 'Registro de interesse excluído.',
    desconectado: 'Você saiu da sua conta.',
    entrar: 'Continuar com Google',
    confirmar: 'Confirmar interesse',
    modalidade: 'Modalidade escolhida',
  } : {
    falha: 'We could not complete that action. Please try again.',
    erroLogin: 'Google sign-in could not be completed. Check whether your account is listed as a test user and try again.',
    obrigatorio: 'Choose a service to continue.',
    carregando: 'Checking your session...',
    salvando: 'Recording your interest...',
    salvo: 'Your interest was successfully recorded. Thank you!',
    jaExiste: 'You have already registered interest in this service.',
    vazio: 'You have not registered any interests yet.',
    usuario: 'Connected Google account',
    remover: 'Delete this interest',
    removerConfirmar: 'Do you want to delete this interest?',
    removido: 'Interest deleted.',
    desconectado: 'You have signed out.',
    entrar: 'Continue with Google',
    confirmar: 'Confirm interest',
    modalidade: 'Selected service',
  };
  const supabase = createClient(PROJETO, CHAVE_PUBLICA, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: window.sessionStorage,
      storageKey: 'techedu:auth:v1',
    },
  });
  const painel = raiz.querySelector('[data-cadastro-painel]');
  const email = raiz.querySelector('[data-cadastro-email]');
  const lista = raiz.querySelector('[data-cadastro-lista]');
  const status = raiz.querySelector('[data-cadastro-status]');
  const saida = raiz.querySelector('[data-cadastro-sair]');
  const modal = document.querySelector('[data-cadastro-dialogo]');
  const modalidade = modal?.querySelector('[data-cadastro-modalidade]');
  const continuar = modal?.querySelector('[data-cadastro-continuar]');
  const btnCancelar = modal?.querySelector('[data-cadastro-cancelar]');
  const links = [...document.querySelectorAll('[data-cadastro-modalidade-link]')];
  const servicos = Object.fromEntries(
    links.map(item => [item.getAttribute('data-cadastro-modalidade-link'), item.getAttribute('data-nome-servico')])
  );
  let usuario = null;
  let selecionado = null;
  let ocupado = false;

  function informar(mensagem) {
    status.textContent = mensagem || '';
  }

  function exibirPiloto() {
    const busca = new URLSearchParams(window.location.search);
    const habilitado = busca.get('cadastro') === 'teste' ||
      busca.has('code') || busca.has('error') ||
      window.sessionStorage.getItem(PILOTO) === '1';
    if (!habilitado) return false;
    window.sessionStorage.setItem(PILOTO, '1');
    raiz.hidden = false;
    links.forEach(btn => { btn.hidden = false; });
    return true;
  }

  function textoModal() {
    if (!modalidade || !continuar) return;
    modalidade.textContent = servicos[selecionado] || selecionado || '';
    continuar.textContent = usuario ? texto.confirmar : texto.entrar;
  }

  function ocultarDialogo() {
    if (modal?.open) modal.close();
  }

  function mostrarDialogo(servico) {
    if (!MODALIDADES.has(servico) || ocupado || !modal) return;
    selecionado = servico;
    textoModal();
    modal.showModal();
  }

  async function conferirUsuario() {
    const { data: sessao, error: erroSessao } = await supabase.auth.getSession();
    if (erroSessao) throw erroSessao;
    if (!sessao.session) return null;
    // A autenticação da identidade é conferida no servidor, não apenas no armazenamento local.
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  }

  function mostrarConta(user) {
    painel.hidden = !user;
    if (user) {
      const nome = user.user_metadata?.full_name || user.user_metadata?.name || '';
      email.textContent = [nome, user.email || ''].filter(Boolean).join(' · ');
    } else {
      email.textContent = '';
      lista.replaceChildren();
    }
  }

  function formatarData(valor) {
    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) return '';
    return new Intl.DateTimeFormat(pt ? 'pt-BR' : 'en-US', { dateStyle:'medium' }).format(data);
  }

  async function carregarInteresses() {
    if (!usuario) return;
    const { data, error } = await supabase.from('interests')
      .select('id,service_key,created_at')
      .order('created_at', { ascending:false });
    if (error) throw error;
    lista.replaceChildren();
    if (!data?.length) {
      const item = document.createElement('li');
      item.textContent = texto.vazio;
      lista.append(item);
      return;
    }
    for (const registro of data) {
      if (!MODALIDADES.has(registro.service_key)) continue;
      const item = document.createElement('li');
      const info = document.createElement('span');
      info.textContent = (servicos[registro.service_key] || registro.service_key) + ' · ' + formatarData(registro.created_at);
      const apagar = document.createElement('button');
      apagar.type = 'button';
      apagar.textContent = texto.remover;
      apagar.setAttribute('data-cadastro-excluir', registro.id);
      apagar.className = 'botao-texto-privacidade';
      item.append(info, apagar);
      lista.append(item);
    }
  }

  async function registrarInteresse(servico) {
    if (!usuario || !MODALIDADES.has(servico)) {
      informar(texto.obrigatorio);
      return;
    }
    informar(texto.salvando);
    const { error } = await supabase.from('interests').insert({
      user_id: usuario.id,
      service_key: servico,
    });
    if (error && error.code !== '23505') throw error;
    informar(error?.code === '23505' ? texto.jaExiste : texto.salvo);
    await carregarInteresses();
  }

  async function iniciarGoogle() {
    if (!MODALIDADES.has(selecionado) || ocupado) return;
    ocupado = true;
    continuar.disabled = true;
    try {
      if (usuario) {
        await registrarInteresse(selecionado);
        ocultarDialogo();
        return;
      }
      // O usuário escolheu explicitamente a modalidade e prosseguimento com Google.
      window.sessionStorage.setItem(PILOTO, '1');
      window.sessionStorage.setItem(PENDENTE, selecionado);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: RETORNO,
          scopes: 'email profile',
        },
      });
      if (error) throw error;
    } catch {
      window.sessionStorage.removeItem(PENDENTE);
      informar(texto.erroLogin);
      ocultarDialogo();
    } finally {
      continuar.disabled = false;
      ocupado = false;
    }
  }

  async function iniciar() {
    if (!exibirPiloto()) return; // visitas públicas continuam pelo WhatsApp
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      informar(texto.erroLogin);
      window.history.replaceState(null, '', window.location.pathname + '?cadastro=teste');
      window.sessionStorage.removeItem(PENDENTE);
    }
    try {
      informar(texto.carregando);
      usuario = await conferirUsuario();
      mostrarConta(usuario);
      if (!usuario) {
        informar(params.has('error') ? texto.erroLogin : '');
        return;
      }
      const pendente = window.sessionStorage.getItem(PENDENTE);
      window.sessionStorage.removeItem(PENDENTE);
      if (MODALIDADES.has(pendente)) {
        await registrarInteresse(pendente);
      } else {
        informar('');
        await carregarInteresses();
      }
    } catch {
      informar(texto.falha);
    }
  }

  links.forEach(btn => {
    btn.addEventListener('click', () => mostrarDialogo(btn.getAttribute('data-cadastro-modalidade-link')));
  });
  continuar?.addEventListener('click', iniciarGoogle);
  btnCancelar?.addEventListener('click', ocultarDialogo);
  lista?.addEventListener('click', async event => {
    const alvo = event.target.closest('button[data-cadastro-excluir]');
    if (!alvo || ocupado || !usuario || !window.confirm(texto.removerConfirmar)) return;
    ocupado = true;
    try {
      const { error } = await supabase.from('interests').delete().eq('id', alvo.dataset.cadastroExcluir);
      if (error) throw error;
      informar(texto.removido);
      await carregarInteresses();
    } catch {
      informar(texto.falha);
    } finally {
      ocupado = false;
    }
  });
  saida?.addEventListener('click', async () => {
    if (ocupado) return;
    ocupado = true;
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw error;
      usuario = null;
      window.sessionStorage.removeItem(PENDENTE);
      mostrarConta(null);
      informar(texto.desconectado);
    } catch {
      informar(texto.falha);
    } finally {
      ocupado = false;
    }
  });
  iniciar();
}
