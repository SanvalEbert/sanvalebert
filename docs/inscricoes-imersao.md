# Inscrições da imersão IA na Prática Docente

O formulário fica na página **IA para Professores** (`/ia-para-professores/`) e envia os dados para a função
`api/inscricoes.js`, que grava na tabela `participantes` do Supabase, a mesma usada pelo site anterior da imersão.

## 1. Variáveis de ambiente na Vercel (projeto do portal)

Em *Settings → Environment Variables*, para **Production** e **Preview**:

| Nome | Valor |
| --- | --- |
| `SUPABASE_URL` | URL do projeto Supabase (a mesma do site professor-ia) |
| `SUPABASE_SECRET_KEY` | chave secreta `sb_secret_…` (ou use `SUPABASE_SERVICE_ROLE_KEY` com a chave legada) |
| `WHATSAPP_GROUP_URL` | opcional: link do grupo da edição; sem ele, usa o grupo atual |

Depois de salvar, faça um novo deploy. Sem essas variáveis, o formulário mostra que as inscrições estão em configuração.

## 2. Ajuste no banco (uma vez, no SQL Editor do Supabase)

A tabela não aceita o mesmo e-mail duas vezes. Para que quem participou em novembro de 2026 possa se inscrever
de novo em fevereiro de 2027, cada inscrição passa a guardar a edição:

```sql
alter table public.participantes add column if not exists edicao text not null default '2026-11';
drop index if exists participantes_email_unique;
create unique index if not exists participantes_email_edicao_unique
  on public.participantes (lower(email), edicao);
```

Até esse ajuste ser feito, o portal grava as inscrições sem a coluna `edicao` (ninguém é perdido), mas um e-mail
já inscrito em novembro recebe o aviso de que já está inscrito.

## 3. Consultar as inscrições da edição

```sql
select nome_completo, email, whatsapp, cidade, estado, instituicao_ensino, experiencia_ia, criado_em
from public.participantes
where edicao = '2027-02'
order by criado_em desc;
```
