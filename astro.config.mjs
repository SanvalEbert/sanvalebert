import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL e BASE_PATH permitem publicar tanto em domínio próprio quanto no GitHub Pages
// (https://sanvalebert.github.io/sanvalebert/), sem alterar o código.
const site = process.env.SITE_URL ?? 'https://sanvalebert.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
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
