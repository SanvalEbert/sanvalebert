import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paginas = [
  { rota: '/pesquisa/', idioma: 'pt-BR' },
  { rota: '/en/research/', idioma: 'en' },
  { rota: '/contratar/', idioma: 'pt-BR' },
  { rota: '/en/hire/', idioma: 'en' },
  { rota: '/', idioma: 'pt-BR' },
  { rota: '/palestras/', idioma: 'pt-BR' },
  { rota: '/servicos/', idioma: 'pt-BR' },
  { rota: '/en/services/', idioma: 'en' },
  { rota: '/privacidade/', idioma: 'pt-BR' },
  { rota: '/en/privacy/', idioma: 'en' },
  { rota: '/estudantes/', idioma: 'pt-BR' },
  { rota: '/en/', idioma: 'en' },
  { rota: '/en/talks/', idioma: 'en' },
  { rota: '/en/students/', idioma: 'en' },
  { rota: '/es/', idioma: 'es' },
  { rota: '/es/investigacion/', idioma: 'es' },
  { rota: '/es/resultados/', idioma: 'es' },
  { rota: '/es/charlas/', idioma: 'es' },
  { rota: '/es/servicios/', idioma: 'es' },
  { rota: '/es/privacidad/', idioma: 'es' },
  { rota: '/es/contratar/', idioma: 'es' },
  { rota: '/ia-para-professores/', idioma: 'pt-BR' },
  { rota: '/en/ai-for-teachers/', idioma: 'en' },
  { rota: '/es/ia-para-docentes/', idioma: 'es' },
];

// O widget do VLibras vem de um servidor externo; nos testes ele é bloqueado
// para que o resultado não dependa da internet.
async function abrir(page: Page, rota: string) {
  await page.route(/vlibras\.gov\.br/, (r) => r.abort());
  await page.goto(rota);
}

for (const { rota, idioma } of paginas) {
  test.describe(`página ${rota}`, () => {
    test('carrega com título, idioma e um único h1', async ({ page }) => {
      await abrir(page, rota);
      await expect(page).toHaveTitle(/Sanval Ebert/);
      await expect(page.locator('html')).toHaveAttribute('lang', idioma);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
    });

    test('não tem rolagem lateral', async ({ page }) => {
      await abrir(page, rota);
      const sobra = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(sobra).toBeLessThanOrEqual(0);
    });

    test('passa nas regras de acessibilidade WCAG 2.1 A e AA', async ({ page }) => {
      await abrir(page, rota);
      const resultado = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .exclude('[vw]')
        .analyze();
      expect(resultado.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
    });
  });
}

test('o botão de idioma leva à mesma página no outro idioma e volta', async ({ page }) => {
  await abrir(page, '/palestras/');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/talks\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('link', { name: 'Español' }).click();
  await expect(page).toHaveURL(/\/es\/charlas\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await page.getByRole('link', { name: 'Português' }).click();
  await expect(page).toHaveURL(/\/palestras\/$/);
});

test('seletor de idioma mostra as siglas PT, EN e ES com o idioma atual marcado', async ({ page }) => {
  for (const [rota, atual, rotulo] of [['/', 'PT', 'Idioma'], ['/en/', 'EN', 'Language'], ['/es/', 'ES', 'Idioma']]) {
    await abrir(page, rota);
    const seletor = page.getByRole('navigation', { name: rotulo, exact: true });
    await expect(seletor).toContainText('PT');
    await expect(seletor).toContainText('EN');
    await expect(seletor).toContainText('ES');
    await expect(seletor.locator('[aria-current="true"]')).toContainText(atual);
    await expect(seletor.getByRole('link')).toHaveCount(2);
  }
});

test('a versão em espanhol traduz a página inicial, os destaques e o San', async ({ page }) => {
  await abrir(page, '/es/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('quienes enseñan');
  await expect(page.getByRole('heading', { level: 2, name: 'Sobre mí' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Destacados' })).toContainText('BATV');
  await expect(page.getByRole('heading', { level: 2, name: 'Consejos y formación' })).toBeVisible();
  await expect(page.getByRole('article', { name: /Estudie en la Universidad SENAI CIMATEC/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Pregunte a San/ })).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/Conheça|Pesquisa e publicações|Dicas e treinamentos/);
});

test('inscrição na própria página: valida, envia e mostra o link do grupo', async ({ page }) => {
  let enviado: Record<string, unknown> | null = null;
  await page.route('**/api/inscricoes', async (rota) => {
    enviado = rota.request().postDataJSON();
    await rota.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ ok: true, grupo: 'https://chat.whatsapp.com/teste' }) });
  });
  await abrir(page, '/ia-para-professores/');
  const form = page.locator('[data-formulario]');
  await form.getByRole('button', { name: 'Confirmar minha inscrição' }).click();
  await expect(form.getByRole('alert')).toContainText('Revise os campos');
  expect(enviado).toBeNull();
  await form.getByLabel('Nome completo', { exact: true }).fill('Maria da Silva');
  await form.getByLabel('WhatsApp com DDD', { exact: true }).fill('(71) 99999-1234');
  await form.getByLabel('E-mail', { exact: true }).fill('maria@escola.edu.br');
  await form.getByLabel('Cidade', { exact: true }).fill('Salvador');
  await form.locator('select[name="estado"]').selectOption('BA');
  await form.getByLabel('Instituição onde ensina', { exact: true }).fill('Escola Estadual');
  await form.getByLabel('Iniciante', { exact: true }).check();
  await form.getByRole('checkbox').check();
  await form.getByRole('button', { name: 'Confirmar minha inscrição' }).click();
  const sucesso = page.locator('[data-sucesso]');
  await expect(sucesso).toBeVisible();
  await expect(sucesso).toContainText('Inscrição confirmada!');
  await expect(sucesso.getByRole('link', { name: /Entrar no grupo do WhatsApp/ })).toHaveAttribute('href', 'https://chat.whatsapp.com/teste');
  expect(enviado).toMatchObject({ email: 'maria@escola.edu.br', estado: 'BA', experiencia_ia: 'Iniciante', consentimento_lgpd: true });
});

test('inscrição mostra mensagem clara quando o e-mail já está inscrito', async ({ page }) => {
  await page.route('**/api/inscricoes', (rota) => rota.fulfill({ status: 409, contentType: 'application/json', body: '{"erro":"already_registered"}' }));
  await abrir(page, '/es/ia-para-docentes/');
  const form = page.locator('[data-formulario]');
  await form.getByLabel('Nombre completo').fill('María Pérez');
  await form.getByLabel('WhatsApp con código de área').fill('71999991234');
  await form.getByLabel('Correo electrónico').fill('maria@escuela.edu');
  await form.getByLabel('Ciudad').fill('Salvador');
  await form.getByLabel('Estado (Brasil)').selectOption('BA');
  await form.getByLabel('Institución donde enseña').fill('Escuela');
  await form.getByLabel('Avanzada').check();
  await form.getByRole('checkbox').check();
  await form.getByRole('button', { name: 'Confirmar mi inscripción' }).click();
  await expect(form.getByRole('alert')).toContainText('ya está inscrito');
});

test('menu leva o professor à página IA para Professores nos três idiomas', async ({ page }) => {
  for (const [rota, menu, nome, destino] of [
    ['/', 'Menu principal', 'IA para Professores', '/ia-para-professores/'],
    ['/en/', 'Main menu', 'AI for Teachers', '/en/ai-for-teachers/'],
    ['/es/', 'Menú principal', 'IA para Docentes', '/es/ia-para-docentes/'],
  ]) {
    await abrir(page, rota);
    const item = page.getByRole('navigation', { name: menu }).getByRole('link', { name: nome, exact: true });
    await expect(item).toHaveAttribute('href', destino);
    await expect(page.getByRole('navigation', { name: menu })).not.toContainText('Tech Services');
  }
});

test('página da imersão traz as novas datas, a programação e a inscrição em nova aba', async ({ page }) => {
  await abrir(page, '/ia-para-professores/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Nunca foi tão interessante');
  await expect(page.locator('main')).toContainText('23, 24 e 25 de fevereiro de 2027');
  await expect(page.locator('main')).toContainText('20h às 21h');
  await expect(page.locator('main')).not.toContainText(/novembro|17\/11|2026-11/);
  await expect(page.locator('.encontros li')).toHaveCount(3);
  for (const data of ['2027-02-23T20:00-03:00', '2027-02-24T20:00-03:00', '2027-02-25T20:00-03:00']) {
    await expect(page.locator(`time[datetime="${data}"]`)).toHaveCount(1);
  }
  const inscricao = page.getByRole('link', { name: /Quero participar gratuitamente/ });
  await expect(inscricao).toHaveCount(1);
  await expect(inscricao).toHaveAttribute('href', '#inscricao');
  await expect(page.locator('main a[href*="professor-ia-eosin"]')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('algo ainda mais prazeroso');
  await expect(page.getByRole('link', { name: 'Adicionar à agenda' })).toHaveAttribute('href', '/agenda/imersao-ia-fevereiro-2027.ics');
  const ics = await (await page.request.get('/agenda/imersao-ia-fevereiro-2027.ics')).text();
  expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(3);
  expect(ics).toContain('DTSTART:20270223T230000Z');
});

test('o botão de voltar ao topo aparece ao rolar e leva ao início', async ({ page }) => {
  await abrir(page, '/');
  const botao = page.getByRole('link', { name: 'Voltar ao topo' });
  await expect(botao).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(botao).toBeVisible();
  await botao.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

test('o VLibras está nas páginas em português e fora das páginas em inglês', async ({ page }) => {
  await abrir(page, '/');
  await expect(page.locator('[vw-access-button]')).toHaveCount(1);
  await abrir(page, '/en/');
  await expect(page.locator('[vw-access-button]')).toHaveCount(0);
});

test('links externos abrem em nova aba com rel seguro; links internos ficam na mesma aba', async ({ page }) => {
  for (const rota of ['/', '/pesquisa/', '/estudantes/', '/es/']) {
    await abrir(page, rota);
    const externos = page.locator('a[href^="http"]:not([href^="http://localhost"])');
    expect(await externos.count()).toBeGreaterThan(3);
    for (const a of await externos.all()) {
      await expect(a).toHaveAttribute('target', '_blank');
      await expect(a).toHaveAttribute('rel', /noopener/);
    }
    for (const a of await page.locator('a[href^="/"], a[href^="#"]').all()) await expect(a).not.toHaveAttribute('target', '_blank');
  }
});

test('a página inicial não oferece contratação', async ({ page }) => {
  for (const rota of ['/', '/en/']) {
    await abrir(page, rota);
    await expect(page.locator('a[href*="wa.me"], a[href$="/contratar/"], a[href$="/en/hire/"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: /Contratar|Hire me|proposta|proposal/ })).toHaveCount(0);
    await expect(page.locator('main')).not.toContainText('Inteligência Artificial para Professores');
  }
});

test('destaques ficam em carrossel com links para as redes', async ({ page }) => {
  await abrir(page, '/');
  const carrossel = page.getByRole('region', { name: 'Destaques' });
  const slides = carrossel.locator('.faixa > li');
  await expect(slides).toHaveCount(2);
  await expect(slides.nth(0)).toContainText('BATV');
  await expect(slides.nth(1)).toContainText('Engage-Agent');
  for (const img of await carrossel.locator('img').all()) await expect(img).toHaveAttribute('alt', /.+/);
  await expect(carrossel.getByRole('link', { name: /Ver no Instagram/ }).first()).toHaveAttribute('href', /instagram\.com/);
  await expect(carrossel.getByRole('link', { name: /Ler no LinkedIn/ }).first()).toHaveAttribute('href', /linkedin\.com/);
  if ((page.viewportSize()?.width ?? 0) > 540) {
    const pausa = carrossel.getByRole('button', { name: 'Pausar a passagem automática' });
    await pausa.click();
    await expect(carrossel.getByRole('button', { name: 'Retomar a passagem automática' })).toHaveAttribute('aria-pressed', 'true');
    await carrossel.getByRole('button', { name: 'Próximo' }).click();
    await expect(carrossel.locator('[data-atual]')).toHaveText('2');
    // Em ciclo, o próximo do último volta ao primeiro.
    await carrossel.getByRole('button', { name: 'Próximo' }).click();
    await expect(carrossel.locator('[data-atual]')).toHaveText('1');
  }
});

test('carrossel de destaques passa sozinho e respeita quem pede menos movimento', async ({ page }) => {
  await page.clock.install();
  await abrir(page, '/');
  const carrossel = page.getByRole('region', { name: 'Destaques' });
  await page.mouse.move(0, 0);
  await expect(carrossel.locator('[data-atual]')).toHaveText('1');
  await page.clock.runFor(7500);
  await expect(carrossel.locator('[data-atual]')).toHaveText('2');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await abrir(page, '/');
  await page.clock.runFor(15000);
  await expect(page.getByRole('region', { name: 'Destaques' }).locator('[data-atual]')).toHaveText('1');
  await expect(page.getByRole('region', { name: 'Destaques' }).getByRole('button', { name: 'Pausar a passagem automática' })).toBeHidden();
});

test('dicas e treinamentos passam sozinhas em carrossel, com setas para voltar', async ({ page }) => {
  await page.clock.install();
  await abrir(page, '/');
  const carrossel = page.getByRole('region', { name: 'Dicas e treinamentos' });
  await page.mouse.move(0, 0);
  await expect(carrossel.locator('[data-atual]')).toHaveText('1');
  await page.clock.runFor(6500);
  await expect(carrossel.locator('[data-atual]')).toHaveText('2');
  await carrossel.getByRole('button', { name: 'Anterior' }).click();
  await expect(carrossel.locator('[data-atual]')).toHaveText('1');
  await expect(carrossel.getByRole('button', { name: 'Pausar a passagem automática' })).toBeVisible();
});

test('dicas e treinamentos mostram as quatro notas de curadoria com link de acesso', async ({ page }) => {
  for (const [rota, titulo, botao] of [['/', 'Dicas e treinamentos', 'Acessar'], ['/en/', 'Tips and training', 'Visit']]) {
    await abrir(page, rota);
    const secao = page.locator('section', { has: page.getByRole('heading', { level: 2, name: titulo }) });
    const cartoes = secao.locator('[data-carrossel] .nota-curadoria');
    await expect(cartoes).toHaveCount(4);
    for (const cartao of await cartoes.all()) {
      await expect(cartao.getByRole('heading', { level: 3 })).not.toBeEmpty();
      await expect(cartao.locator('blockquote')).not.toBeEmpty();
      const link = cartao.getByRole('link', { name: new RegExp(botao) });
      await expect(link).toHaveAttribute('href', /^https:\/\//);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }
  }
  await abrir(page, '/');
  for (const url of ['https://www.microsoft.com/pt-br/microsoft-learn', 'https://skillbuilder.aws/', 'https://training.fortinet.com/', 'https://aws.amazon.com/pt/startups/']) {
    await expect(page.locator(`a[href="${url}"]`)).toHaveCount(1);
  }
});

test('cartão da Universidade SENAI CIMATEC destaca os cursos de computação', async ({ page }) => {
  await abrir(page, '/');
  const uni = page.getByRole('article', { name: /Estude na Universidade SENAI CIMATEC/ });
  await expect(uni).toBeVisible();
  await expect(uni).toContainText('Eu recomendo.');
  await expect(uni).toContainText('IGC 5');
  await expect(uni).toContainText('CPC 5');
  const cursos = uni.getByRole('link', { name: /Conhecer o curso/ });
  await expect(cursos).toHaveCount(2);
  await expect(cursos.nth(0)).toContainText('Engenharia de Computação');
  await expect(cursos.nth(1)).toContainText('Ciência de Dados e Inteligência Artificial');
  for (const nome of ['Todos os cursos', 'Pós-graduação', 'Extensão']) {
    await expect(uni.getByRole('link', { name: new RegExp(nome) })).toHaveAttribute('href', /^https:\/\/universidadesenaicimatec\.edu\.br\//);
  }
  for (const link of await uni.getByRole('link').all()) await expect(link).toHaveAttribute('target', '_blank');
});

test('assistente San e atalhos ficam nos corredores laterais, sem cobrir o texto', async ({ page }) => {
  await abrir(page, '/');
  const sobrepoe = await page.evaluate(() => {
    const caixas = [...document.querySelectorAll('.san-abrir, .navegacao-pagina .ao-topo.visivel')].map((e) => e.getBoundingClientRect());
    const textos = [...document.querySelectorAll('main p, main h1, main h2, main h3')].map((e) => e.getBoundingClientRect());
    return caixas.some((c) => textos.some((t) => c.left < t.right && c.right > t.left && c.top < t.bottom && c.bottom > t.top));
  });
  if ((page.viewportSize()?.width ?? 0) > 540) expect(sobrepoe).toBe(false);
});

test('navega até o rodapé e retorna ao topo', async ({ page }) => {
  await abrir(page, '/');
  const fim = page.getByRole('link', { name: 'Ir ao fim da página', exact: true });
  // No celular o atalho "Fim" fica oculto para não cobrir o texto; rola-se com o dedo.
  if (await fim.isVisible()) await fim.click();
  else await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.locator('footer')).toBeInViewport();
  await page.getByRole('link', { name: 'Voltar ao topo', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

test('fotos da abertura se alternam, sem moldura, com controles acessíveis', async ({ page }) => {
  await page.clock.install();
  await abrir(page, '/');
  const fotos = page.getByRole('region', { name: 'Fotos de Sanval Ebert' });
  await expect(fotos.locator('img')).toHaveCount(5);
  for (const img of await fotos.locator('img').all()) await expect(img).toHaveAttribute('alt', /Sanval Ebert/);
  await expect(fotos.locator('img.ativa')).toHaveCount(1);
  await page.mouse.move(0, 0);
  await page.clock.runFor(6000);
  await expect(fotos.locator('img').nth(1)).toHaveClass(/ativa/);
  await fotos.getByRole('button', { name: 'Mostrar foto 4' }).click();
  await expect(fotos.locator('img').nth(3)).toHaveClass(/ativa/);
  await expect(fotos.getByRole('button', { name: 'Pausar a troca de fotos' })).toBeVisible();
});

test('apresentação leva aos perfis', async ({ page }) => {
  await abrir(page, '/');
  await page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: /Sobre/ }).click();
  await expect(page.locator('#sobre')).toBeInViewport();
  await expect(page.locator('#sobre')).not.toContainText('CPC 5');
  await expect(page.locator('#sobre')).not.toContainText('IGC 5');
  await expect(page.locator('#sobre').getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/sanval-ebert/');
});

test('Pesquisa permite encontrar publicações por assunto e área', async ({ page }) => {
 await abrir(page, '/');
 await page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: /Pesquisa/ }).click();
 await expect(page).toHaveURL(/\/pesquisa\/$/);
 await expect(page.locator('[data-publicacao]:visible')).toHaveCount(13);
 await page.getByRole('searchbox').fill('Parkinson');
 await expect(page.locator('[data-publicacao]:visible')).toHaveCount(1);
 await expect(page.locator('[data-publicacao]:visible').getByRole('link', { name: /Publicação e DOI/ })).toHaveAttribute('href','https://doi.org/10.1038/s41598-025-94252-2');
 await page.getByLabel('Área',{exact:true}).selectOption('ia');
 await expect(page.locator('[data-vazio]')).toBeVisible();
 await page.getByRole('searchbox').fill('');
 await page.getByLabel('Área',{exact:true}).selectOption('');
 await expect(page.locator('[data-publicacao]:visible')).toHaveCount(13);
});

test('Pesquisa mantém o contexto ao trocar de idioma e identifica a fonte da métrica', async ({ page }) => {
 await abrir(page, '/pesquisa/');
 await expect(page.locator('.alcance')).toContainText('34');
 await expect(page.locator('.alcance')).toContainText('ResearchGate');
 await page.getByRole('link',{name:'English',exact:true}).click();
 await expect(page).toHaveURL(/\/en\/research\/$/);
 await expect(page.locator('[data-publicacao]')).toHaveCount(13);
});

test('Resultados apresenta conquistas sem oferta comercial no conteúdo e rodapé', async ({ page }) => {
 await abrir(page, '/estudantes/');
 await expect(page.getByRole('heading',{level:1})).toContainText('educação, pesquisa e tecnologia.');
 await expect(page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: 'Resultados', exact: true })).toHaveAttribute('aria-current', 'page');
 await expect(page.locator('main')).toContainText('CPC 5');
 await expect(page.locator('main')).toContainText('IGC 5');
 await expect(page.locator('main')).toContainText('4º do Brasil');
 await expect(page.locator('main a[href="/contratar/"], footer a[href="/contratar/"]')).toHaveCount(0);
 await expect(page.getByRole('heading',{name:'Três equipes da universidade na final'})).toBeVisible();
});

test('Analytics é carregado de forma privada, sem contador público', async ({ page }) => {
  await page.route('**/_vercel/insights/script.js', route => route.fulfill({ status: 200, contentType: 'text/javascript', body: '' }));
  await abrir(page, '/');
  await expect(page.locator('script[src="/_vercel/insights/script.js"]')).toHaveCount(1);
  await expect(page.locator('[data-contador-publico], .visitantes-publicos')).toHaveCount(0);
});

test('cabeçalho exibe a marca oficial (arquivos de produção) com nome e descritor', async ({ page }) => {
  await abrir(page, '/');
  const identidade = page.locator('.portal-header .identidade');
  const marca = identidade.locator('img');
  await expect(marca).toBeVisible();
  await expect(marca).toHaveAttribute('src', '/brand/logo-horizontal-escuro.svg');
  await expect(marca).toHaveAttribute('alt', 'Sanval Ebert — Educação, pesquisa e tecnologia');
  await expect(identidade).toHaveAttribute('href', '/');
  const altura = await marca.evaluate(el => el.getBoundingClientRect().height);
  expect(altura).toBeGreaterThanOrEqual(30);
  const proporcao = await marca.evaluate(el => { const r = el.getBoundingClientRect(); return r.width / r.height; });
  expect(proporcao).toBeGreaterThan(4);
  const resposta = await page.request.get('/brand/logo-horizontal-escuro.svg');
  expect(resposta.ok()).toBe(true);
});

test('cabeçalho preserva identidade e idioma em inglês', async ({ page }) => {
  await abrir(page, '/en/');
  const marca = page.locator('.portal-header .identidade img');
  await expect(marca).toHaveAttribute('alt', 'Sanval Ebert — Education, research and technology');
});

test('ícones da marca estão publicados', async ({ page }) => {
  await abrir(page, '/');
  for (const href of ['/brand/favicon.svg', '/brand/favicon.ico', '/brand/icone-180.png', '/brand/site.webmanifest']) {
    await expect(page.locator(`link[href="${href}"]`)).toHaveCount(1);
    expect((await page.request.get(href)).ok()).toBe(true);
  }
});

test('Serviços exibe quatro modalidades e preserva a página de palestras', async ({ page }) => {
  await abrir(page, '/servicos/');
  const cards = page.locator('.grade-servicos article');
  await expect(cards).toHaveCount(4);
  for (const nome of ['Palestras', 'Treinamentos', 'Minicursos', 'Workshops']) {
    await expect(cards.getByRole('heading', { name: nome, exact: true })).toHaveCount(1);
  }
  await cards.first().getByRole('link', { name: 'Conhecer temas e palestras' }).click();
  await expect(page).toHaveURL(/\/palestras\/$/);
});

test('interesse é contato explícito e não formulário de coleta de dados', async ({ page }) => {
  await abrir(page, '/servicos/');
  const interesse = page.getByRole('link', { name: 'Tenho interesse em minicurso' });
  await expect(interesse).toHaveAttribute('href', /^https:\/\/wa\.me\/5571985558490\?text=/);
  await expect(page.locator('input[type="email"], input[type="password"]')).toHaveCount(0);
  await expect(page.locator('main')).toContainText('não coleta seus dados de cadastro automaticamente');
});

test('Serviços mantém idioma, modalidades e navegação em inglês', async ({ page }) => {
  await abrir(page, '/servicos/');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/services\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('education and technology.');
  await expect(page.locator('.grade-servicos article')).toHaveCount(4);
});
test('política de privacidade está acessível pelo rodapé nas duas línguas', async ({ page }) => {
  await abrir(page, '/servicos/');
  await page.locator('footer').getByRole('link', { name: 'Privacidade e Segurança' }).click();
  await expect(page).toHaveURL(/\/privacidade\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Seus dados');
  await expect(page.locator('main')).toContainText('não exige login nem cadastro');
  await expect(page.locator('main')).toContainText('O Google');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/privacy\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your data');
  await expect(page.locator('footer').getByRole('link', { name: 'Privacy and Security' })).toBeVisible();
});

test('catálogo informa privacidade antes do futuro cadastro Google', async ({ page }) => {
  await abrir(page, '/servicos/');
  await expect(page.locator('main').getByRole('link', { name: 'Leia a Política de Privacidade e Segurança.' })).toHaveAttribute('href', '/privacidade/');
  await expect(page.locator('input[type="email"], input[type="password"]')).toHaveCount(0);
});


test('a captação Google é restrita ao piloto e informa dados mínimos antes do login', async ({ page }) => {
  let chamados = 0;
  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.0/+esm', route => {
    chamados++;
    return route.fulfill({
      status:200,contentType:'application/javascript',
      headers:{'access-control-allow-origin':'*'},
      body:'export function createClient(){return {auth:{getSession:async()=>({data:{session:null},error:null}),getUser:async()=>({data:{user:null},error:null}),signInWithOAuth:async()=>({error:null})}}}',
    });
  });
  await abrir(page, '/servicos/');
  await expect(page.locator('[data-techedu-piloto]')).toBeHidden();
  await expect(page.locator('button[data-cadastro-modalidade-link]:visible')).toHaveCount(0);
  expect(chamados).toBe(0);
  await abrir(page, '/servicos/?cadastro=teste');
  await expect(page.locator('[data-techedu-piloto]')).toBeVisible();
  await expect(page.locator('button[data-cadastro-modalidade-link]:visible')).toHaveCount(4);
  await page.locator('button[data-cadastro-modalidade-link="minicursos"]').click();
  const dialogo = page.locator('[data-cadastro-dialogo]');
  await expect(dialogo).toBeVisible();
  await expect(dialogo).toContainText('Minicursos');
  await expect(dialogo).toContainText('nome, e-mail');
  await expect(dialogo.getByRole('link', { name:'Leia a Política de Privacidade e Segurança' })).toHaveAttribute('href','/privacidade/');
  await dialogo.getByRole('button', { name:'Cancelar' }).click();
  await expect(dialogo).toBeHidden();
});

test('piloto inclui e exclui interesse de usuário autenticado simulado', async ({ page }) => {
  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.119.0/+esm', route => route.fulfill({
    status:200,contentType:'application/javascript',
    headers:{'access-control-allow-origin':'*'},
    body:'export function createClient(){let entries=[];const user={id:"11111111-1111-4111-8111-111111111111",email:"teste@example.com",user_metadata:{full_name:"Participante de teste"}};return {auth:{getSession:async()=>({data:{session:{access_token:"test"}},error:null}),getUser:async()=>({data:{user},error:null}),signOut:async()=>({error:null})},from(table){if(table!=="interests")throw Error("Wrong table");return {select:()=>({order:async()=>({data:entries,error:null})}),insert:async input=>{entries.push({id:"22222222-2222-4222-8222-222222222222",service_key:input.service_key,created_at:"2026-11-15T18:00:00Z"});return {error:null}},delete:()=>({eq:async (_column,value)=>{entries=entries.filter(e=>e.id!==value);return {error:null}}})}}}}',
  }));
  await abrir(page, '/servicos/?cadastro=teste');
  await expect(page.locator('[data-cadastro-email]')).toContainText('teste@example.com');
  await page.locator('button[data-cadastro-modalidade-link="workshops"]').click();
  const dialogo = page.locator('[data-cadastro-dialogo]');
  await expect(dialogo.getByRole('button', { name:'Confirmar interesse' })).toBeVisible();
  await dialogo.getByRole('button', { name:'Confirmar interesse' }).click();
  await expect(page.locator('[data-cadastro-status]')).toContainText('sucesso');
  await expect(page.locator('[data-cadastro-lista]')).toContainText('Workshops');
  page.once('dialog', d=>d.accept());
  await page.getByRole('button', { name:'Excluir este interesse' }).click();
  await expect(page.locator('[data-cadastro-status]')).toContainText('excluído');
  await expect(page.locator('[data-cadastro-lista]')).toContainText('ainda não registrou');
  await page.getByRole('button', { name:'Sair da conta' }).click();
  await expect(page.locator('[data-cadastro-painel]')).toBeHidden();
});
