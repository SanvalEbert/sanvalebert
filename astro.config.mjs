import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL e BASE_PATH permitem publicar tanto em domínio próprio quanto no GitHub Pages
// (https://sanvalebert.github.io/sanvalebert/), sem alterar o código.
const site = process.env.SITE_URL ?? 'https://sanvalebert.vercel.app';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  // Todas as páginas são geradas como arquivos estáticos (rápidas e baratas).
  // A Vercel publica a pasta dist diretamente. Quando houver páginas de servidor,
  // adicionar o adaptador oficial @astrojs/vercel.
  output: 'static',
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
