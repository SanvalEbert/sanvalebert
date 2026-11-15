# TechEdu — Serviços, autenticação e registro mínimo de interesse

Atualizado em 15/11/2026.

## Experiência desejada

Ao clicar em **Serviços**, o visitante encontra uma tela com "Continuar com Google" e um aviso resumido de privacidade. O catálogo de palestras, treinamentos, minicursos e workshops é **mostrado na interface somente após uma sessão Google validada pelo Supabase**.

Após o login, a página mostra o nome e e-mail da pessoa conectada, oferece quatro modalidades e solicita uma confirmação explícita antes de registrar interesse. A pessoa pode visualizar os próprios interesses, excluir registros e sair da conta. Não há coleta de CPF, telefone, endereço, instituição ou histórico de navegação na tabela de interesses. Solicitações de proposta podem ser feitas separadamente pelo WhatsApp.

As páginas de Política de Privacidade, Sobre, Pesquisa, Resultados e Contato permanecem acessíveis publicamente. A lista de Serviços é conteúdo não confidencial presente no HTML estático; a ocultação do catálogo é uma **barreira de interface**, não autorização de segurança de conteúdo no servidor. A proteção dos dados pessoais é realizada por autenticação Supabase e políticas de Row Level Security.

## Tecnologias implementadas

- Site Astro na Vercel. Rotas `/servicos/` e `/en/services/` com tela de acesso e catálogo após login.
- Supabase Auth + Google OAuth em projeto exclusivo `rkmhpgyybawtmaeyvyva` (São Paulo). OAuth PKCE, sessão por aba via `sessionStorage`, redirecionamento fixo para `https://techedu.sanvalebert.com.br/servicos/`.
- SDK Supabase JS 2.119.0 carregado por jsDelivr. O projeto utiliza chave pública `sb_publishable_`; segredos OAuth não ficam no site nem no GitHub.
- Tabela `public.interests` com `user_id`, `service_key` e `created_at` (além do UUID técnico). Nome e e-mail permanecem no Supabase Auth e não são duplicados nessa tabela.
- RLS: cada usuário autenticado pode criar, consultar e excluir **apenas seus próprios registros**; anônimos não recebem acesso. A tabela restringe a modalidade a quatro valores e impede duplicação de serviço por usuário.
- O painel administrativo de interessados **ainda não existe**. Não há marketing automático, envio de newsletter nem venda de cursos.

## Bloqueador confirmado em log — não publicar a porta de acesso até corrigir

O Supabase registrou em 15/11/2026 às 22:20:01Z uma falha no retorno do Google:
`oauth2: "invalid_client" "The provided client secret is invalid."`.

Por isso a autenticação do primeiro usuário não foi concluída. A contagem no banco segue com 0 usuários e 0 interesses. A correção deve ser feita **no painel Supabase Authentication → Providers → Google**, usando o Client ID e o novo Client Secret do **mesmo** cliente OAuth existente no Google Cloud. A chave antiga exposta deve continuar revogada.

Depois de corrigir, testar em `https://techedu.sanvalebert.com.br/servicos/` quando a versão de autenticação-primeiro for publicada: login, nome no cabeçalho, registro de interesse e exclusão. Enquanto o Google Auth Platform estiver em `Testing`, permitir conta como usuário de teste. Não expor segredos ou tokens em capturas.

## Critérios para lançamento

1. Google OAuth retorna com sessão válida ao domínio de produção e exibe nome/e-mail.
2. Um interesse real aparece na base e é removível pela própria pessoa.
3. Usuários diferentes não conseguem acessar nem excluir interesses uns dos outros.
4. Política pública de Privacidade e Segurança e base legal aplicável revisadas; definir prazo objetivo para retenção dos registros e canal de exclusão da identidade do Auth.
5. Confirmar comportamento responsivo e WCAG, testes automatizados e deploy Vercel.
6. Para reduzir dependência externa, avaliar empacotar o SDK oficial no build com lockfile antes de abrir o portal a público amplo.

O PR desta evolução deve permanecer sem publicação na branch principal até que as credenciais OAuth sejam corrigidas ou o operador aceite explicitamente publicar um portal de acesso ainda indisponível.
