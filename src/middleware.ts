// Faz todo link para outro site abrir em nova aba (target="_blank"), com rel="noopener noreferrer"
// por segurança. Roda na geração das páginas, então o HTML publicado já sai pronto, sem depender
// de JavaScript no navegador. Links internos (mesmo site, âncoras, e-mail) continuam na mesma aba.
import { defineMiddleware } from 'astro:middleware';

const linkExterno = /<a\b([^>]*?)\shref="(https?:\/\/[^"]+)"([^>]*)>/g;

function abrirEmNovaAba(html: string, origem: string): string {
  return html.replace(linkExterno, (tag, antes: string, url: string, depois: string) => {
    if (url.startsWith(origem)) return tag;
    let atributos = `${antes} href="${url}"${depois}`;
    if (!/\starget=/.test(atributos)) atributos += ' target="_blank"';
    if (/\srel="/.test(atributos)) {
      atributos = atributos.replace(/\srel="([^"]*)"/, (_m, valor: string) => {
        const partes = new Set(valor.split(/\s+/).filter(Boolean));
        partes.add('noopener');
        partes.add('noreferrer');
        return ` rel="${[...partes].join(' ')}"`;
      });
    } else {
      atributos += ' rel="noopener noreferrer"';
    }
    return `<a${atributos}>`;
  });
}

export const onRequest = defineMiddleware(async (contexto, proximo) => {
  const resposta = await proximo();
  if (!resposta.headers.get('content-type')?.includes('text/html')) return resposta;
  const html = await resposta.text();
  const origem = contexto.site ? contexto.site.origin : contexto.url.origin;
  return new Response(abrirEmNovaAba(html, origem), { status: resposta.status, headers: resposta.headers });
});
