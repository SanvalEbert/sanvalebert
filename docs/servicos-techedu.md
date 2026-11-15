# TechEdu — Serviços e captação de interessados

## Piloto de cadastro com Google (novembro de 2026)

Um protótipo controlado está disponível na rota pública \`https://techedu.sanvalebert.com.br/servicos/?cadastro=teste\`. O catálogo normal continua com WhatsApp como canal de contato até a verificação do Google OAuth por conta de teste autorizada e posterior abertura geral da Google Auth Platform.

- Projeto Supabase **TechEdu** dedicado: \`rkmhpgyybawtmaeyvyva\`, região \`sa-east-1\` (São Paulo); os projetos anteriores não foram alterados.
- Tabela \`public.interests\`: campos \`id\`, \`user_id\`, \`service_key\`, \`created_at\`, sem nome/e-mail duplicados. Nome e e-mail são tratados pelo Supabase Auth.
- RLS com políticas separadas de leitura, inserção e exclusão de interesses próprios; nenhum acesso \`anon\`; nenhuma permissão de alteração de registros por usuários comuns. Verificar acesso cruzado com dois usuários reais antes de liberar publicamente.
- A interface de teste exibe um modal com finalidade, dados mínimos e link para a política de privacidade antes de iniciar Google Login. Implementa \`flowType: 'pkce'\`, \`scopes:'email profile'\`, \`sessionStorage\` e retorno fixo à URL de produção já autorizada.
- A biblioteca oficial Supabase JS está **pinada na versão 2.119.0** e é carregada do jsDelivr **somente no acesso piloto**, não nas visitas públicas ao catálogo. Na abertura geral, preferir mover a dependência para o bundle de build com arquivo de lock versionado, evitando uma dependência CDN em tempo de execução.
- Usuário pode consultar, apagar interesses próprios e sair da conta. A exclusão da conta de identidade Supabase Auth requer solicitação pelo canal de privacidade, pois usuários não recebem privilégio de apagar a própria conta Auth.
- Cada par (usuário, modalidade) tem apenas um registro de interesse, impedindo duplicação involuntária.
- Não existe painel administrativo, marketing automático nem cursos pagos. Prazo de retenção objetivo e regras de limpeza devem ser aprovados antes da abertura ao público.

**Importante:** passar nos testes de interface não comprova o OAuth real. Antes de habilitar os botões para todo o público, validar o consentimento no Google Cloud, a inclusão de um usuário de teste e uma inscrição e exclusão reais no Supabase.

## Objetivo

A primeira fase cria o catálogo bilíngue em `/servicos/` e `/en/services/`, preservando as páginas atuais em `/palestras/` e `/en/talks/`. O item principal de navegação passa a ser **Serviços / Services**.

Quatro modalidades são apresentadas: palestras, treinamentos, minicursos e workshops. Não há preços, datas, turmas ou disponibilidade fictícios. Os links atuais de interesse abrem contato pelo WhatsApp com a modalidade no texto pré-preenchido. **Este catálogo não afirma que há login ou cadastro ativo e não persiste dados pessoais.**

## Integração posterior: Google Login e leads

A coleta via Google depende de uma base dedicada ao TechEdu e de configuração de OAuth no provedor. Conexões existentes não devem ser reaproveitadas sem verificar finalidade, políticas de acesso, ownership e custos. Os projetos Supabase existentes ainda não foram designados para o TechEdu.

### Percurso planejado

1. Navegação pública: visitantes exploram modalidades sem autenticação.
2. Manifestação de interesse: visitante escolhe serviço e clica em `Tenho interesse`.
3. Login Google com escopos mínimos `openid email profile` (nome, e-mail e identificador, quando fornecidos), somente após explicação sobre a coleta.
4. Formulário de interesse: `serviço`, `objetivo`, `perfil`, `instituição` (opcional), `telefone` (opcional) e data prevista (opcional). A origem de marketing só pode ser registrada de maneira transparente.
5. Registro privado com data, usuário autenticado e status; tela de confirmação, opção de exclusão do cadastro e canal para solicitar correção.
6. Painel administrativo protegido para acompanhar interessados e organizar propostas.

O Google **não** fornece automaticamente telefone, instituição ou cargo. Esses campos dependerão de preenchimento voluntário. O login não é autorização para e-mails comerciais: comunicações promocionais precisam de fundamento jurídico apropriado e, quando adotado consentimento, opção específica e não marcada por padrão.

### Arquitetura sugerida

- Site público: Astro estático + Vercel (baixo custo).
- Identidade: Supabase Auth / Google OAuth em projeto explicitamente dedicado ao TechEdu, com `redirectTo` restrito aos domínios aprovados (`https://techedu.sanvalebert.com.br`, e uma prévia controlada quando necessário).
- Banco: PostgreSQL dedicado, tabelas conceituais `profiles`, `service_offerings`, `interests`, `interest_events` e `admin_memberships`.
- RLS: autenticados podem consultar e manter apenas os próprios interesses; administrador tem acesso somente mediante autorização de função/serviço no servidor. Não usar `user_metadata` para permissões, não expor `service_role` ao navegador. Dados sensíveis fora de logs e da telemetria.
- Segurança: CSRF/OAuth state, validação de sessão, políticas RLS para cada operação, proteção anti-spam, controle de rate-limit, exportação e exclusão de dados, histórico de consentimento e política de retenção.
- Painel: autenticação separada por privilégios, visualização limitada e trilha de alterações. Nunca confiar em qualquer e-mail digitado no cliente como autorização de administrador.
- Futuro: módulos de turmas, matrículas, pagamentos e integração SSO/AVA, sem vincular o perfil de um estudante apenas ao e-mail.

### Verificações antes de colocar Google Login em produção

- Selecionar ou criar a base do **TechEdu**, sem modificar silenciosamente outros projetos; validar plano/custo antes de criar infraestrutura.
- Configurar credenciais OAuth no Google Cloud e ativar o provedor de Google no projeto Supabase escolhido. Segredos ficam só nos respectivos painéis, nunca no GitHub nem no frontend.
- Revisar aviso de privacidade, finalidade e retenção conforme LGPD; preparar mecanismos de acesso e exclusão de dados.
- Criar tabelas com RLS habilitada; testar acesso negado sem login, isolamento entre usuários e autorização real do administrador.
- Testar o login, falhas de autenticação, proteção contra redirects indevidos, continuidade após login, desistência e exclusão.
- Testar desktop e celular, analytics com dados agregados e custo.
- Somente depois substituir CTA WhatsApp por `Tenho interesse → Continuar com Google`, abrindo o cadastro funcional.

## Publicação

O catálogo pode ser avaliado em prévia sem alterações no fluxo de dados pessoais. Não publicar como funcionalidade de login pronta enquanto a autenticação e o armazenamento não estiverem validados.
