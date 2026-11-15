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
  await page.getByRole('link', { name: 'Português' }).click();
  await expect(page).toHaveURL(/\/palestras\/$/);
});

test('o menu leva às páginas prontas', async ({ page }) => {
  await abrir(page, '/');
  const menu = page.getByRole('navigation', { name: 'Menu principal' });
  await menu.getByRole('link', { name: 'Serviços', exact: true }).click();
  await expect(page).toHaveURL(/\/servicos\/$/);
  await expect(menu.getByRole('link', { name: 'Serviços', exact: true })).toHaveAttribute('aria-current', 'page');
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

test('os botões de contato têm destino', async ({ page }) => {
  await abrir(page, '/');
  await expect(page.getByRole('link', { name: 'Solicitar uma proposta', exact: true })).toHaveAttribute('href', 'https://wa.me/5571985558490');
  for (const link of await page.locator('a.botao').all()) {
    await expect(link).toHaveAttribute('href', /^(https:\/\/|\/)/);
  }
  await abrir(page, '/palestras/');
  for (const proposta of await page.getByRole('link', { name: 'Solicitar uma proposta', exact: true }).all()) {
    await expect(proposta).toHaveAttribute('href', 'https://wa.me/5571985558490');
  }
});

test('navega até o rodapé e retorna ao topo', async ({ page }) => {
  await abrir(page, '/');
  await page.getByRole('link', { name: 'Ir ao fim da página', exact: true }).click();
  await expect(page.locator('footer')).toBeInViewport();
  await page.getByRole('link', { name: 'Voltar ao topo', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
});

test('apresentação leva aos perfis e à contratação', async ({ page }) => {
  await abrir(page, '/');
  await page.getByRole('navigation', { name: 'Menu principal' }).getByRole('link', { name: /Sobre/ }).click();
  await expect(page.locator('#sobre')).toBeInViewport();
  await expect(page.locator('#sobre')).not.toContainText('CPC 5');
  await expect(page.locator('#sobre')).not.toContainText('IGC 5');
  await expect(page.locator('#sobre').getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/sanval-ebert/');
  await page.getByRole('link', { name: 'Contratar palestra ou formação', exact: true }).click();
  await expect(page).toHaveURL(/\/contratar\/$/);
  await expect(page.getByRole('link', { name: /Conversar sobre uma proposta/ })).toHaveAttribute('href', 'https://wa.me/5571985558490');
  await expect(page.locator('main')).toContainText('WhatsApp');
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

test('cabeçalho exibe nome em destaque sem monograma SE', async ({ page }) => {
  await abrir(page, '/');
  const identidade = page.locator('.portal-header .identidade');
  await expect(identidade.locator('.monograma')).toHaveCount(0);
  await expect(identidade.locator('.nome')).toHaveText('Sanval Ebert');
  await expect(identidade.locator('.descricao')).toHaveText('Educação, pesquisa e tecnologia');
  await expect(identidade).toHaveAttribute('href', '/');
  const fonte = await identidade.locator('.nome').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
  expect(fonte).toBeGreaterThanOrEqual(30);
});

test('cabeçalho preserva identidade e idioma em inglês', async ({ page }) => {
  await abrir(page, '/en/');
  const identidade = page.locator('.portal-header .identidade');
  await expect(identidade.locator('.monograma')).toHaveCount(0);
  await expect(identidade.locator('.nome')).toHaveText('Sanval Ebert');
  await expect(identidade.locator('.descricao')).toHaveText('Education, research and technology');
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
  await expect(page.getByRole('navigation', { name: 'Main menu' }).getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
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
