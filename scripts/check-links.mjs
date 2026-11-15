// Confere se todo link interno das páginas geradas aponta para um arquivo que existe.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const raiz = 'dist';
const base = (process.env.BASE_PATH ?? '/').replace(/\/$/, '');

function paginas(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return paginas(caminho);
    return nome.endsWith('.html') ? [caminho] : [];
  });
}

const erros = [];
for (const arquivo of paginas(raiz)) {
  const html = readFileSync(arquivo, 'utf8');
  for (const [, alvo] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(alvo)) continue;
    let caminho = alvo.split('#')[0].split('?')[0];
    if (caminho.startsWith('/')) {
      if (base && !caminho.startsWith(base + '/')) {
        erros.push(`${arquivo}: "${alvo}" está fora do caminho base "${base}"`);
        continue;
      }
      caminho = join(raiz, caminho.slice(base.length));
    } else {
      caminho = join(dirname(arquivo), caminho);
    }
    if (caminho.endsWith('/')) caminho = join(caminho, 'index.html');
    if (!existsSync(caminho)) erros.push(`${arquivo}: "${alvo}" não existe`);
  }
}

if (erros.length) {
  console.error(`Links quebrados (${erros.length}):\n` + erros.join('\n'));
  process.exit(1);
}
console.log('Links internos: todos corretos.');
