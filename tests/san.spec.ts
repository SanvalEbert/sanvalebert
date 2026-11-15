import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.route(/vlibras\.gov\.br/, r => r.abort());
  await page.goto('/');
  await page.getByRole('button', { name: 'Conversar com San', exact: true }).click();
});

test('San localiza uma publica��o e sua fonte original', async ({ page }) => {
  await page.getByRole('button', { name: 'Pesquisas', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('As pesquisas do portal abordam');
  await page.getByLabel('O que voc� procura?').fill('Parkinson');
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  const log = page.getByRole('log');
  await expect(log.getByRole('link', { name: /Study of autocorrelations/ })).toHaveAttribute('href', /^https:\/\/doi.org\//);
  await expect(log).toContainText('2025');
});

test('San reconhece limites e trata texto como texto', async ({ page }) => {
  await page.getByLabel('O que voc� procura?').fill('<img src=x onerror=alert(1)> meteorologia');
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('N�o encontrei essa informa��o');
  await expect(page.getByRole('log').locator('img')).toHaveCount(0);
  await expect(page.getByRole('log').getByRole('link', { name: 'Falar com Sanval no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5571985558490');
});

test('San abre por teclado, fecha com Escape e devolve o foco', async ({ page }) => {
  await expect(page.getByLabel('O que voc� procura?')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  const abrir = page.getByRole('button', { name: 'Conversar com San', exact: true });
  await expect(abrir).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('San oferece sugest�es, limpa hist�rico e mant�m a conversa apenas na p�gina', async ({ page }) => {
  await page.getByRole('button', { name: 'Resultados', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('segundo lugar mundial');
  await page.getByRole('button', { name: 'Limpar conversa' }).click();
  await expect(page.getByRole('log').locator('.san-mensagem')).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('conversa aberta � acess�vel e cabe na tela', async ({ page }) => {
  const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).exclude('[vw]').analyze();
  expect(resultado.violations.map(v => v.id)).toEqual([]);
  const caixa = await page.getByRole('dialog').boundingBox();
  const tela = page.viewportSize()!;
  expect(caixa!.x).toBeGreaterThanOrEqual(0);
  expect(caixa!.x + caixa!.width).toBeLessThanOrEqual(tela.width);
  expect(caixa!.y + caixa!.height).toBeLessThanOrEqual(tela.height);
});

test('San responde em ingl�s nas p�ginas em ingl�s', async ({ page }) => {
  await page.goto('/en/research/');
  await page.getByRole('button', { name: 'Chat with San', exact: true }).click();
  await page.getByRole('button', { name: 'Talks', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('contact Sanval on WhatsApp');
});
