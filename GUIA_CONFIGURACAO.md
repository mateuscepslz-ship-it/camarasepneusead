# Guia de Configuração - Plataforma EAD Câmaras e Pneus

## 1) Configuração inicial

1. Garanta que todos os arquivos do projeto estejam na mesma pasta raiz.
2. Abra `index.html` no navegador.
3. O banco simulado é iniciado automaticamente em `localStorage`.

### Executando a partir do Git

```bash
git clone <URL_DO_REPOSITORIO>
cd camarasepneusead
python3 -m http.server 3000
```

Acesse:

```text
http://localhost:3000/index.html
```

Credenciais padrão do supervisor:
- Email: `admin@camarasepeneus.com.br`
- Senha: `admin123`

## 2) Personalização de identidade visual

Edite `css/style.css` no bloco `:root`:
- `--color-primary`: vermelho principal.
- `--color-dark`: preto principal.
- `--font-primary`: tipografia (se desejar substituir).

## 3) Cadastro de usuários

- Acesse a aba **Registrar** em `index.html`.
- Selecione departamento e conclua o cadastro.
- Novos usuários são criados como `student`.

## 4) Acesso supervisor

Credenciais padrão:
- Email: `admin@camarasepeneus.com.br`
- Senha: `admin123`

No dashboard do supervisor, é possível:
- Cadastrar novos treinamentos.
- Visualizar gráficos e tabela de progresso.

## 5) Treinamentos

### Adicionar treinamento
Preencha no formulário:
- Título
- URL do vídeo
- Duração em minutos
- Departamento
- Descrição

Ao salvar, o sistema cria notificações para funcionários.

## 6) Quiz e certificados

- O quiz é criado automaticamente por treinamento quando acessado.
- Nota mínima para aprovação: **70%**.
- Ao aprovar, certificado é emitido com código único.

## 7) Banco de dados relacional (referência)

Use `database/schema.sql` para criar estrutura equivalente em SQLite/MySQL/PostgreSQL.

### Tabelas
- users
- departments
- trainings
- progress
- quizzes
- quiz_results
- certificates
- comments
- notifications

## 8) Backup e restauração

### Backup localStorage
No console do navegador:
```js
localStorage.getItem('cp_ead_db')
```

### Restaurar
```js
localStorage.setItem('cp_ead_db', 'JSON_AQUI')
```

## 9) Integração futura com backend

Troque a implementação de `js/api.js` para `fetch` em endpoints REST reais mantendo as mesmas funções públicas.
