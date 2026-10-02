# Exemplos Práticos de Uso

## Cenário 1: Primeiro acesso do funcionário

1. Abrir `index.html`.
2. Ir em **Registrar** e criar conta.
3. Fazer login.
4. No `student-dashboard.html`, filtrar treinamentos por departamento.
5. Abrir um treinamento e iniciar o vídeo.

## Cenário 2: Supervisor publicando treinamento

1. Login com `admin@camarasepeneus.com.br` / `admin123`.
2. Acessar `supervisor-dashboard.html`.
3. Preencher formulário “Novo treinamento”.
4. Salvar e confirmar mensagem de sucesso.
5. Funcionários recebem notificação automática.

## Cenário 3: Funcionário concluindo trilha completa

1. Assistir vídeo em `training-view.html`.
2. Comentar dúvida com timestamp.
3. Abrir `quiz.html`.
4. Atingir nota >= 70%.
5. Visualizar certificado em `certificates.html` e imprimir.

## Cenário 4: Supervisor analisando evolução

1. Abrir dashboard supervisor.
2. Ver card de taxa de conclusão.
3. Avaliar gráfico por departamento.
4. Conferir tabela de funcionários (treinamentos x certificados).

## Cenário 5: Personalização rápida

- Alterar cores no `:root` de `css/style.css`.
- Mudar logo na área `.brand` de cada página.
- Atualizar perguntas base no método `getOrCreateQuiz()` em `js/api.js`.

## Boas práticas

- Revisar URL de vídeos antes de publicar.
- Padronizar nomes de treinamentos por departamento.
- Usar avaliações objetivas e alinhadas aos procedimentos reais.
- Revisar mensalmente estatísticas de conclusão.
