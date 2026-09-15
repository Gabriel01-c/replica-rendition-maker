# Plano: Analytics e painel do Quiz Aula Magna

## Objetivo
Adicionar métricas anônimas somente ao `/quiz-aula-magna` e criar o painel privado `/painel-quiz-aula-magna`, sem alterar o visual, conteúdo, CTA ou demais páginas.

## Implementação
- Criar uma migration isolada com `quiz_sessions` e `quiz_answers`, índices mínimos, RLS sem leitura pública e RPCs validadas/idempotentes para início, resposta e conclusão.
- Gerar uma senha administrativa forte, armazenar somente seu hash no banco e expor apenas uma RPC de agregados que exige a senha.
- Instrumentar o quiz com um UUID anônimo em `sessionStorage`; falhas serão silenciosas e nunca bloquearão o fluxo nem os eventos atuais.
- Garantir que a conclusão registre a pontuação final incluindo o acerto da sétima pergunta.
- Adicionar o painel não divulgado com senha mantida apenas em `sessionStorage`, filtros de período, atualização, saída e estados de carregamento, vazio e erro.
- Exibir somente totais e percentuais; nenhuma resposta individual, identificador ou dado pessoal será retornado.

## Arquivos
- Modificar somente `src/routes/quiz-aula-magna.tsx`.
- Adicionar `src/routes/painel-quiz-aula-magna.tsx` e seu CSS específico.
- Adicionar uma migration em `supabase/migrations/` e atualizar tipos gerados apenas se necessário.
- Permitir somente a regeneração automática da árvore de rotas.

## Validação
- Aplicar a migration e testar início, resposta, conclusão e consulta agregada protegida.
- Remover exclusivamente os registros de teste criados para a validação.
- Validar TypeScript, compilação, acesso direto ao quiz e ao painel, fluxo com 7 perguntas e demais rotas.
- Não publicar. Ao final, informar arquivos alterados, testes, custo em créditos e a senha administrativa uma única vez.
