# TechEdu — Política de Segurança da Informação e Governança de Dados

**Status:** proposta técnica anterior à ativação de login Google ou banco de interessados.  
**Revisão:** 15/11/2026.  
**Escopo:** domínio `techedu.sanvalebert.com.br`; não abrange os projetos existentes de cursos, especialmente o curso IA para professores.

Esta política estabelece os controles que deverão ser **efetivamente implementados e verificados** antes de coletar cadastros. Não deve ser apresentada como prova de que o banco ou o login já estão em produção.

## 1. Princípios

- **Privacidade por padrão:** catálogo público sem cadastro obrigatório; identificar o visitante somente quando manifestar interesse ou se inscrever.
- **Minimização:** utilizar Google OAuth apenas com `openid`, `email` e `profile`; não pedir Gmail, Drive, Contacts, CPF, RG, telefone, instituição, cargo ou endereço.
- **Finalidade explícita:** cadastro destinado a acompanhar o interesse declarado na modalidade escolhida. Novidades e marketing são opcionais e separados.
- **Independência:** criar um projeto Supabase **novo e específico**, sem compartilhar dados, Auth, banco ou chaves com as iniciativas de formação já existentes.
- **Acessibilidade e confiança:** aviso breve antes da autenticação, política visível no rodapé, controles para corrigir ou apagar dados.
- **Segurança desde a implementação:** acesso mínimo, HTTPS, segredo no servidor, isolamento de registros e defesa contra abuso.

## 2. Dados mínimos propostos

| Fonte | Campo lógico | Obrigatório | Uso |
| --- | --- | --- | --- |
| Google Auth | `auth.users.id` | Sim | Identificador técnico estável do usuário |
| Google Auth | Nome público | Sim para experiência, caso fornecido | Saudação na interface |
| Google Auth | E-mail | Sim | Identificação e resposta ao pedido |
| Usuário | `service_key` | Sim | Modalidade: palestra, treinamento, minicurso ou workshop |
| Sistema | `created_at` | Sim | Data do interesse |
| Usuário | `marketing_opt_in` | Não, desmarcado por padrão | Receber futuras novidades, sem condicionar o atendimento |

O nome e e-mail já ficam no provedor de autenticação; **não criar cópias adicionais em `profiles`** na primeira versão. Nunca armazenar tokens Google, senhas, foto de perfil, endereço IP ou informação de navegação na tabela de leads.

O Google oferece dados básicos de identidade somente após autorização do titular. O contato por telefone e a informação institucional podem ser solicitados mais tarde, apenas quando estritamente necessários a uma proposta concreta e com justificativa.

## 3. Modelo de dados mínimo (proposto, não aplicado)

Para o projeto novo:

- `public.interests`: `id uuid`, `user_id uuid` referenciando `auth.users(id)`, `service_key text` com valores controlados, `created_at timestamptz`.
- `public.marketing_preferences`: `user_id uuid`, `opt_in boolean default false`, `updated_at timestamptz`; se o marketing usar consentimento, manter evidência verificável de data e versão do texto exibido.
- Administração: atribuição de privilégios por mecanismo **servidor/controlado**, nunca por `user_metadata` ou e-mail fornecido pelo navegador.
- Futuro: `course_offerings`, `enrollments`, `payments` e `lms_accounts` em módulos independentes, quando o produto evoluir.

### Exemplo de isolamento RLS

```sql
-- Exemplo arquitetural; não executar antes da criação da base dedicada e dos testes.
alter table public.interests enable row level security;

create policy "read_own_interest"
  on public.interests for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "add_own_interest"
  on public.interests for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "delete_own_interest"
  on public.interests for delete to authenticated
  using ((select auth.uid()) = user_id);
```

Não autorizar `SELECT` genérico para `anon`. A administração deve passar por caminho seguro com autenticação, autorização real de função e trilha de auditoria. Jamais inserir `service_role`/chaves secretas em HTML, frontend, repositório ou analytics.

## 4. Controles de segurança obrigatórios antes do lançamento

1. Configurar domínio(s) e URLs de redirecionamento permitidas (sem URL de callback arbitrária) e ativar Google Login com OAuth `state` e proteção PKCE quando aplicável.
2. Revisar a tela de consentimento da marca TechEdu no Google; solicitar apenas os escopos básicos.
3. Habilitar RLS em todas as tabelas expostas; testar usuário A não consegue ler, alterar nem excluir interesse do usuário B. Verificar requisições anônimas.
4. Restringir a área administrativa a usuários designados, com autenticação reforçada, preferencialmente MFA, controle de sessão e registro de operações.
5. Validar `service_key`, limite de tamanho de payloads, rate limiting e prevenção contra automação abusiva.
6. Criptografar transporte com TLS; utilizar criptografia e controles do provedor para dados armazenados. Guardar credenciais em variáveis de ambiente gerenciadas.
7. Configurar cópias de segurança de acordo com o plano contratado e ensaiar restauração. No plano gratuito, **não presumir** backups automáticos garantidos.
8. Não incluir dados pessoais nos logs, na telemetria, em mensagens de erro nem nas perguntas ao assistente San. As atividades da IA devem permanecer distintas da base de leads.
9. Implementar solicitação de exclusão e correção e rotina de revisão dos registros desnecessários; configurar política de retenção (proposta inicial: **12 meses de inatividade**, sujeita a validação jurídica e necessidades reais).
10. Preparar procedimento de resposta a incidentes e avaliar comunicações à ANPD e aos titulares, quando aplicáveis, em prazo regulamentar.

## 5. Transparência e base legal

- A política pública está em `/privacidade/` e `/en/privacy/`.
- Antes do cadastro, apresentar em linguagem clara quem é o responsável, o motivo da coleta, os dados necessários e o acesso a esta política.
- Definir e documentar a base legal apropriada para receber e responder cada pedido (consentimento não é a única base possível).
- Caso se utilize consentimento para notícias e ofertas, ele deverá ser específico, opcional e comprovável, nunca marcado previamente. Permitir descadastramento.
- Atender acesso, correção, oposição, exclusão quando aplicável e demais direitos da LGPD por canal direto, com verificação de titularidade antes de revelar informações.
- Prever canal de contato e identificação adequada do controlador antes do go-live; não publicar CPF, endereço pessoal ou credenciais no portal.

## 6. Prestadores, responsabilidade e retenção

- Vercel: hospedagem e analytics.
- OpenAI: processamento de mensagens ao assistente San, por solicitação do usuário; não misturar conteúdo das conversas com cadastro.
- WhatsApp: comunicação iniciada pelo próprio interessado.
- Supabase e Google: **participarão somente após implementação do cadastro**. Revisar localização regional, transferências internacionais, contratos e retenção de cada fornecedor.
- Dados vinculados a interesses deverão ser eliminados quando não forem mais necessários, resguardadas obrigações de conservação. Documentar retenção antes de iniciar coleta.

## 7. Fluxo de incidentes

1. Registrar e conter o incidente, revogar credenciais suspeitas e interromper o acesso indevido.
2. Avaliar categorias e quantidade de dados afetados, natureza, riscos e impacto.
3. Corrigir a causa, preservar evidências seguras e documentar medidas.
4. Se houver risco ou dano relevante, comunicar ANPD e titulares no prazo aplicável (regra geral de três dias úteis, conforme Resolução CD/ANPD 15/2024, observadas exceções previstas).
5. Revisar controles e registrar providências.

## 8. Restrições operacionais e de custos

A organização Supabase atualmente contém dois projetos: um ativo e outro inativo, ambos reservados para outras iniciativas. **Não reutilizar nem modificar nenhum deles.**

A documentação Supabase permite até **dois projetos gratuitos ativos**; projetos pausados não contam durante a pausa. Portanto, ativar um projeto TechEdu enquanto o outro estiver pausado pode caber no plano gratuito, mas a reativação futura de todos os três simultaneamente **poderá exigir plano pago**. Confirmar custo e qual organização receberá o projeto novo antes de criá-lo.

Não criar uma nova conta Google OAuth, serviço de e-mail transacional ou qualquer mecanismo pago sem avaliação de custos e autorização.

## 9. Documentos de referência

- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- ANPD, guia sobre legítimo interesse: https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-lanca-guia-orientativo-sobre-legitimo-interesse
- ANPD, comunicação de incidentes: https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis
- Supabase, Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase, Sign in with Google: https://supabase.com/docs/guides/auth/social-sign-in/auth-google
- Supabase, limite de projetos gratuitos: https://supabase.com/docs/guides/platform/billing-on-supabase

**Nota:** política operacional e texto público devem ser revisados antes de iniciar a coleta de dados, inclusive por responsável jurídico quando necessário.
