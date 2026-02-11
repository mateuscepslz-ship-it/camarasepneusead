# Plataforma EAD - Câmaras e Pneus

Plataforma EAD completa para treinamento de funcionários e supervisores, com autenticação, dashboards, player de vídeo, quizzes, certificados, comentários e notificações.

## Estrutura do projeto

- `index.html`: login e cadastro.
- `student-dashboard.html`: painel do funcionário.
- `supervisor-dashboard.html`: painel do supervisor.
- `training-view.html`: player de treinamento + comentários.
- `quiz.html`: avaliação por múltipla escolha.
- `certificates.html`: visualização e impressão de certificados.
- `css/style.css`: identidade visual vermelho/preto e componentes responsivos.
- `js/api.js`: API RESTful simulada (localStorage) e regras de negócio.
- `js/auth.js`: login, sessão, proteção de páginas e logout.
- `database/schema.sql`: estrutura SQL com 9 tabelas e dados iniciais.

## Funcionalidades implementadas

### Autenticação
- Login por email/senha.
- Cadastro de funcionários.
- Controle por perfil (`student` e `supervisor`).
- Sessão persistente com opção “lembrar de mim”.

### Funcionário
- Dashboard com estatísticas e filtros.
- Player de vídeo HTML5 com rastreio de progresso.
- Sistema de comentários com timestamp.
- Quiz com nota mínima de 70%.
- Certificados automáticos após aprovação.

### Supervisor
- Dashboard com KPIs e gráficos Chart.js.
- Cadastro de treinamentos por departamento.
- Tabela de progresso dos funcionários.
- Notificações automáticas para novos treinamentos.

## Banco de dados (modelo)

A plataforma usa localStorage para execução instantânea front-end, com modelo relacional espelhado em `database/schema.sql`:

1. `users`
2. `departments`
3. `trainings`
4. `progress`
5. `quizzes`
6. `quiz_results`
7. `certificates`
8. `comments`
9. `notifications`

## Credenciais padrão

- **Supervisor**
  - Email: `admin@camarasepeneus.com.br`
  - Senha: `admin123`

## Como executar

1. Abra `index.html` no navegador.
2. Faça login com o supervisor padrão ou registre um funcionário.
3. Navegue pelos fluxos de treinamento, quiz e certificado.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- Chart.js
- Font Awesome
- LocalStorage (simulando API e persistência)

## Próximos passos sugeridos

- Upload de vídeo por arquivo no painel do supervisor.
- Exportação de relatórios em PDF/Excel.
- Módulo de chat interno.
- Integração com backend real (Node.js, Java, .NET etc.).
