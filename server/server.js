require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Importar o Sequelize diretamente para debug
const { Sequelize } = require('sequelize');
const db = require('./models');

// Verificar o que foi importado
console.log("Objetos importados do ./models:", Object.keys(db));

const app = express();
const PORT = process.env.PORT || 8000;

console.log("Configurando rotas...");

// Configurar CORS para permitir solicitações do frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  credentials: true
}));

// Parse requests de content-type: application/json
app.use(bodyParser.json());

// Parse requests de content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para debug das requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Função melhorada para carregar rotas
function loadRoutes() {
  console.log("Configurando rotas...");
  
  const routesDir = path.join(__dirname, "routes");
  
  fs.readdirSync(routesDir).forEach(file => {
    if (file.indexOf(".routes.js") !== -1) {
      try {
        const routePath = `./routes/${file}`;
        const routeModule = require(routePath);
        
        // Verificar se o arquivo exporta um roteador Express
        if (routeModule && typeof routeModule === 'function' && routeModule.stack) {
          // Extrair o nome base para a rota
          const basePath = file.replace(".routes.js", "");
          app.use(`/api/${basePath}`, routeModule);
          console.log(`Rota carregada: ${file}`);
        } else {
          console.log(`Ignorando ${file}: não parece ser um roteador Express válido`);
        }
      } catch (error) {
        console.error(`Erro ao carregar rota ${file}:`, error);
      }
    }
  });
}

// Carregar rotas dinamicamente
loadRoutes();

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: "Bem-vindo à API da Clínica Dentária",
    status: "online",
    timestamp: new Date().toISOString()
  });
});

// Gerenciamento da conexão com o banco de dados
const initializeDatabase = async () => {
  try {
    console.log("🔄 Tentando conectar ao banco de dados...");
    console.log("Configuração de conexão:", {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'clinica_dentaria',
      username: process.env.DB_USER || 'postgres',
      port: process.env.DB_PORT || 5432
    });
    
    await db.sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
    
    // Sincroniza o banco de dados (somente em ambiente de desenvolvimento)
    if (process.env.NODE_ENV !== 'production') {
      console.log("🔄 Sincronizando modelos com o banco de dados...");
      await db.sequelize.sync({ alter: false });
      console.log("✅ Banco de dados sincronizado com sucesso!");
    }
    
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar base de dados:", error.message);
    
    if (error.original && error.original.code) {
      console.error("Código do erro:", error.original.code);
      console.error("Dica de solução:",
        error.original.code === 'ECONNREFUSED' ? 'Verifique se o PostgreSQL está rodando e a porta está correta' :
        error.original.code === '28P01' ? 'Senha incorreta para o PostgreSQL' :
        error.original.code === '3D000' ? 'Banco de dados clinica_dentaria não existe' :
        'Verifique as configurações do banco de dados no .env'
      );
    }
    
    return false;
  }
};

// Importar rotas
const authRoutes = require('./routes/auth.routes');
const clienteRoutes = require('./routes/cliente.routes');
const consultaRoutes = require('./routes/consulta.routes');
const utilizadorRoutes = require('./routes/utilizador.routes');

// Definir rotas
app.use('/api/auth', authRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/consulta', consultaRoutes);
app.use('/api/utilizador', utilizadorRoutes);

// Rota raiz para verificação de API
app.get('/api', (req, res) => {
  res.json({ message: 'API da Clínica Dentária está funcionando!' });
});

// Após a definição das rotas, SUBSTITUA este código:
if (process.env.NODE_ENV === 'development') {
  // Lista de rotas simplificada sem dependência externa
  console.log("\n📋 Rotas disponíveis na API:");
  console.log(" - POST /api/auth/signin - Login de utilizador");
  console.log(" - POST /api/auth/signup - Registro de utilizador");
  console.log(" - GET /api/auth/verify - Verificação de token");
  console.log(" - GET /api - Status da API");
  console.log("\n");
}

// Iniciar servidor
const startServer = async () => {
  const dbInitialized = await initializeDatabase();
  
  if (!dbInitialized) {
    console.warn("⚠️ Servidor iniciando sem conexão com o banco de dados!");
  }
  
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`📡 API disponível em: http://localhost:${PORT}/api`);
  });
};

// Tratar erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

startServer();


