# Ajuste mobile e idioma do Quiz Aula Magna

## Implementação
- Compactar somente a abertura mobile de `/quiz-aula-magna`, priorizando 390×700 e 390×760, mantendo foto, logo, textos e botão na hierarquia atual.
- Preservar integralmente a apresentação desktop e todo o funcionamento das sete perguntas, resultados, CTA e analytics.
- Definir o idioma do documento como `pt-BR` e proteger a headline aprovada com `translate="no"`.

## Validação e publicação
- Validar compilação e TypeScript.
- Conferir visualmente 390×700, 390×760 e 1440×900, incluindo enquadramento da foto, legibilidade da logo, botão completo e ausência de sobreposições.
- Confirmar headline, atributo de tradução, idioma no HTML e HTTP 200 no quiz e painel.
- Publicar a versão validada e informar URL, commit, arquivos alterados, testes e custo.

## Escopo técnico
- Alterar apenas `src/routes/quiz-aula-magna.css`, `src/routes/quiz-aula-magna.tsx` e `src/routes/__root.tsx`.
- Não alterar banco, migrations, senha, painel ou qualquer outra página.
