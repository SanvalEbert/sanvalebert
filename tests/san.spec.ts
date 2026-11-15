import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.route(/vlibras\.gov\.br/, r => r.abort());
  await page.goto('/');
  await page.getByRole('button', { name: /Pergunte ao San/ }).click();
});

test('San localiza uma publicação e sua fonte original', async ({ page }) => {
  await page.getByRole('button', { name: 'Pesquisas', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('As pesquisas do portal abordam');
  await page.getByLabel('O que você procura?').fill('Parkinson');
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  const log = page.getByRole('log');
  await expect(log.getByRole('link', { name: /Study of autocorrelations/ })).toHaveAttribute('href', /^https:\/\/doi.org\//);
  await expect(log).toContainText('2025');
});

test('San reconhece limites e trata texto como texto', async ({ page }) => {
  await page.getByLabel('O que você procura?').fill('<img src=x onerror=alert(1)> meteorologia');
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('Não encontrei essa informação');
  await expect(page.getByRole('log').locator('img')).toHaveCount(0);
  await expect(page.getByRole('log').getByRole('link', { name: 'Falar com Sanval no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5571985558490');
});

test('San abre por teclado, fecha com Escape e devolve o foco', async ({ page }) => {
  await expect(page.getByLabel('O que você procura?')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  const abrir = page.getByRole('button', { name: /Pergunte ao San/ });
  await expect(abrir).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('San oferece sugestões, limpa histórico e mantém a conversa apenas na página', async ({ page }) => {
  await page.getByRole('button', { name: 'Publicações', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('As pesquisas do portal abordam');
  await page.getByRole('button', { name: 'Limpar conversa' }).click();
  await expect(page.getByRole('log').locator('.san-mensagem')).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('conversa aberta é acessível e cabe na tela', async ({ page }) => {
  const resultado = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).exclude('[vw]').analyze();
  expect(resultado.violations.map(v => v.id)).toEqual([]);
  const caixa = await page.getByRole('dialog').boundingBox();
  const tela = page.viewportSize()!;
  expect(caixa!.x).toBeGreaterThanOrEqual(0);
  expect(caixa!.x + caixa!.width).toBeLessThanOrEqual(tela.width);
  expect(caixa!.y + caixa!.height).toBeLessThanOrEqual(tela.height);
});

test('San responde em inglês nas páginas em inglês', async ({ page }) => {
  await page.goto('/en/research/');
  await page.getByRole('button', { name: /Ask San/ }).click();
  await page.getByRole('button', { name: 'Talks', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('contact Sanval on WhatsApp');
});

for (const pergunta of [
  'Eu queria o contato do professor Saval',
  'Qual é o telefone do professor Sanval?',
  'Como posso falar com ele?',
  'Me passa o número dele',
  'Tem WhatsApp?',
  'Gostaria de conversar com o professor',
]) {
  test(`contato direto: ${pergunta}`, async ({ page }) => {
    await page.getByLabel('O que você procura?').fill(pergunta);
    await page.getByRole('button', { name: 'Enviar', exact: true }).click();
    const resposta = page.getByRole('log').locator('.san-mensagem').last();
    await expect(resposta).toContainText('(71) 98555-8490');
    await expect(resposta.getByRole('link', { name: 'Falar com Sanval no WhatsApp' })).toHaveAttribute('href', 'https://wa.me/5571985558490');
    await expect(resposta.getByRole('link')).toHaveCount(1);
  });
}

test('contato em inglês mostra o número internacional', async ({ page }) => {
  await page.goto('/en/');
  await page.getByRole('button', { name: /Ask San/ }).click();
  await page.getByLabel('What are you looking for?').fill('How can I contact professor Saval?');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('+55 71 98555-8490');
});

test('falar sobre pesquisa continua procurando conteúdos', async ({ page }) => {
  await page.getByLabel('O que você procura?').fill('Quero falar sobre pesquisa');
  await page.getByRole('button', { name: 'Enviar', exact: true }).click();
  await expect(page.getByRole('log').locator('.san-mensagem').last()).toContainText('As pesquisas do portal abordam');
});

test('convite do San não cobre navegação e conserva hierarquia visual', async ({ page }) => {
  await page.getByRole('button', { name: 'Fechar conversa' }).click();
  const convite = page.getByRole('button', { name: /Pergunte ao San/ });
  await expect(convite).toContainText('Pesquisas, publicações e contato');
  const retConvite = await convite.boundingBox();
  const nav = await page.locator('.navegacao-pagina').boundingBox();
  expect(retConvite).not.toBeNull();
  expect(nav).not.toBeNull();
  const separacao = retConvite!.x >= nav!.x + nav!.width ||
    nav!.x >= retConvite!.x + retConvite!.width ||
    retConvite!.y >= nav!.y + nav!.height ||
    nav!.y >= retConvite!.y + retConvite!.height;
  expect(separacao).toBe(true);
  await convite.click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
