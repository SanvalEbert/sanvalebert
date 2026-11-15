import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// SITE_URL e BASE_PATH permitem publicar tanto em domínio próprio quanto no GitHub Pages
// (https://sanvalebert.github.io/sanvalebert/), sem alterar o código.
const site = process.env.SITE_URL ?? 'https://sanvalebert.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  // Todas as páginas são geradas como arquivos estáticos (rápidas e baratas).
  // O adaptador permite que páginas específicas rodem no servidor quando for preciso
  // (login, área do estudante, pagamento): basta `export const prerender = false` nelas.
  output: 'static',
  adapter: netlify(),
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'pt',
        locales: { pt: 'pt-BR', en: 'en' },
      },
    }),
  ],
});
