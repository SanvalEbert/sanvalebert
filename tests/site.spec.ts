import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paginas = [
  { rota: '/', idioma: 'pt-BR' },
  { rota: '/palestras/', idioma: 'pt-BR' },
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
  await menu.getByRole('link', { name: /Palestras/ }).click();
  await expect(page).toHaveURL(/\/palestras\/$/);
  await expect(menu.getByRole('link', { name: /Palestras/ })).toHaveAttribute('aria-current', 'page');
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
  for (const link of await page.locator('a.botao').all()) {
    await expect(link).toHaveAttribute('href', /^(https:\/\/|\/)/);
  }
});
