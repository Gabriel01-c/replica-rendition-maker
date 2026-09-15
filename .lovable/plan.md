# Plano: Quiz Aula Magna

## Objetivo
Criar a nova página independente `/quiz-aula-magna` reproduzindo fielmente o ZIP aprovado, sem alterar `/quiz-imersao-hpp` nem qualquer outra página.

## Implementação
- Converter o quiz do ZIP para uma página React integrada ao roteamento atual.
- Preservar exatamente as 8 perguntas, respostas, correções, faixas de resultado, textos e eventos de acompanhamento do quiz.
- Preservar o CTA final para `https://anestesiotrends.com/aula-magna/`, repassando `utm_*`, `gclid` e `fbclid`.
- Reproduzir o layout aprovado para desktop e celular, incluindo faixa animada, foto, tipografia, progresso, estados de resposta e resultado.
- Usar somente a foto clara do Dr. Francisco e a fonte efetivamente usadas pela página; manter as versões 480 px e 800 px para carregamento responsivo.
- Isolar todos os estilos sob um contêiner exclusivo da nova página, evitando interferência no restante do projeto.

## Detalhes técnicos
- Adicionar apenas `src/routes/quiz-aula-magna.tsx`, seu CSS isolado e os ponteiros dos recursos necessários.
- Incluir metadados próprios da nova rota.
- Não editar manualmente a árvore de rotas; ela poderá receber automaticamente apenas a nova rota.
- Validar abertura direta sem 404, fluxo completo do quiz, resultado/CTA, parâmetros de campanha e visual em desktop e celular.
- Conferir a compilação e os registros da prévia. Não publicar.
