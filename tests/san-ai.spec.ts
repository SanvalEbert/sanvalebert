import { test, expect } from '@playwright/test';

test('San consulta a IA quando a API está disponível', async ({ page }) => {
  await page.route('**/api/chat', async rota => {
    const corpo = rota.request().postDataJSON();
    expect(corpo.idioma).toBe('pt');
    expect(corpo.pergunta).toContain('inteligência artificial');
    expect(corpo.referencias.length).toBeGreaterThan(0);
    await rota.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ resposta: 'Sanval investiga o uso de inteligência artificial em ambientes virtuais de aprendizagem.' }),
    });
  });
  await page.goto('/');
  await page.getByRole('button', {name:'Pergunte ao San',exact:true}).click();
  await page.getByLabel('O que você procura?').fill('Quais são as pesquisas em inteligência artificial?');
  await page.getByRole('button', {name:'Enviar',exact:true}).click();
  await expect(page.getByRole('log')).toContainText('Sanval investiga o uso de inteligência artificial');
  await expect(page.getByRole('log').getByRole('link', {name:'Pesquisa e publicações'})).toBeVisible();
});

test('San usa o catálogo se a IA não estiver configurada', async ({ page }) => {
  await page.route('**/api/chat', rota => rota.fulfill({
    status: 503, contentType: 'application/json',
    body: JSON.stringify({erro:'ai_not_configured'}),
  }));
  await page.goto('/');
  await page.getByRole('button', {name:'Pergunte ao San',exact:true}).click();
  await page.getByRole('button', {name:'Pesquisas',exact:true}).click();
  await expect(page.getByRole('log')).toContainText('As pesquisas do portal abordam');
});
