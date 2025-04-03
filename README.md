# 🦷 Sistema de Gestão para Clínica Dentária

Um sistema completo de gestão para clínicas dentárias que permite o agendamento e acompanhamento de consultas, emissão de faturas, e gestão de dados de clientes e médicos.

## ✨ Funcionalidades

### 👤 Para Clientes
- 📝 Cadastro e autenticação
- 📅 Agendamento de consultas
- 📋 Visualização do histórico de consultas
- 💰 Acesso às faturas
- ✅ Confirmação de pagamento

### 👨‍⚕️ Para Médicos
- 🔐 Autenticação
- 📊 Visualização da agenda de consultas
- ✓✗ Aprovação/rejeição de pedidos de consulta
- 🏁 Finalização de consultas
- 📄 Emissão de faturas

### 👑 Para Administradores
- 👥 Gestão completa de usuários
- 📈 Monitoramento de atividades

## 🛠️ Tecnologias Utilizadas

### 🖥️ Frontend
- ⚛️ React.js
- 🧭 React Router para navegação
- 💅 Styled Components para estilização
- 🎨 Material UI e Chakra UI para componentes
- 🔄 Axios para requisições HTTP
- 🔑 JWT para autenticação

### ⚙️ Backend
- 📦 Node.js com Express
- 🗃️ Sequelize ORM
- 🐘 PostgreSQL como banco de dados
- 🔒 JWT para autenticação
- 📧 Nodemailer para envio de emails
- 📝 PDFKit para geração de documentos

## 🚀 Instalação e Execução

### 📋 Pré-requisitos
- Node.js (v14 ou superior)
- PostgreSQL (v12 ou superior)

### ⚙️ Configuração do Backend
1. Clone o repositório
2. Navegue até a pasta do servidor:
   ```
   cd server
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis com suas configurações

5. Inicialize o banco de dados:
   ```
   node createTables.js
   node seed-postgres-fixed.js
   ```

6. Inicie o servidor:
   ```
   npm start
   ```
   O servidor será iniciado na porta 8000 por padrão.

### 🖥️ Configuração do Frontend
1. Navegue até a pasta do cliente:
   ```
   cd client
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env`:
   ```
   REACT_APP_API_URL=http://localhost:8000/api/
   ```

4. Inicie a aplicação:
   ```
   npm start
   ```
   A aplicação será iniciada na porta 3000 por padrão.

## 📁 Estrutura do Projeto

### ⚙️ Backend
- `/config` - Configurações do banco de dados
- `/controllers` - Controladores da aplicação
- `/middleware` - Middlewares de autenticação e validação
- `/models` - Modelos de dados
- `/routes` - Rotas da API
- `/utils` - Utilitários

### 🖥️ Frontend
- `/public` - Arquivos estáticos
- `/src/assets` - Imagens e outros recursos
- `/src/components` - Componentes reutilizáveis
- `/src/context` - Contextos React
- `/src/services` - Serviços para comunicação com a API
- `/src/views` - Componentes de página
- `/src/utils` - Funções utilitárias

## 👥 Usuários de Teste

### 👤 Cliente
- 📧 Email: cliente@exemplo.com
- 🔑 Senha: 123456

### 👨‍⚕️ Médico
- 📧 Email: medico@exemplo.com
- 🔑 Senha: 123456

### 👑 Administrador
- 📧 Email: admin@exemplo.com
- 🔑 Senha: 123456

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push para a branch: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
