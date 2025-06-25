require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Importar o Sequelize diretamente para debug
const { Sequelize } = require('sequelize');
const db = require('./models');
const dbInit = require('./config/db.init');

// Verificar o que foi importado
console.log("Objetos importados do ./models:", Object.keys(db));

const app = express();
const PORT = process.env.PORT || 8000;

console.log("Configurando rotas...");

// Configurar CORS para permitir solicitações do frontend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:8080',
    'https://clinicadentaria-front.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  credentials: true
}));

// Parse requests de content-type: application/json
app.use(bodyParser.json());

// Parse requests de content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para debug das requisições
app.use((req, res, next) => {
  console.log('\n=== Nova Requisição ===');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Função melhorada para carregar rotas
function loadRoutes() {
  console.log("Configurando rotas...");
  
  const routesDir = path.join(__dirname, "routes");
  
  // Mapeamento de arquivos para caminhos de API
  const routeMapping = {
    'auth.routes.js': '/api/auth',
    'cliente.routes.js': '/api/clientes',
    'consulta.routes.js': '/api/consultas',
    'utilizador.routes.js': '/api/utilizador',
    'fatura.routes.js': '/api/faturas',
    'especialidade.routes.js': '/api/especialidades',
    'medico.routes.js': '/api/medicos',
    'disponibilidade.routes.js': '/api/disponibilidades',
    'pagamento.routes.js': '/api/pagamentos',
    'estatisticas.routes.js': '/api/estatisticas',
    'servico.route.js': '/api/servico'
  };

  fs.readdirSync(routesDir).forEach(file => {
    if (file.indexOf(".routes.js") !== -1) {
      try {
        const routePath = `./routes/${file}`;
        const routeModule = require(routePath);
        
        // CORREÇÃO: Verificação mais simples e correta para routers do Express
        if (routeModule && typeof routeModule === 'function') {
          // Usar o mapeamento definido ou criar um padrão
          const apiPath = routeMapping[file] || `/api/${file.replace(".routes.js", "")}`;
          app.use(apiPath, routeModule);
          console.log(`✅ Rota carregada: ${file} => ${apiPath}`);
        } else {
          console.log(`⚠️ Ignorando ${file}: não parece ser um roteador Express válido`);
          console.log(`   Tipo do módulo: ${typeof routeModule}`);
          console.log(`   Conteúdo:`, routeModule);
        }
      } catch (error) {
        console.error(`❌ Erro ao carregar rota ${file}:`, error);
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

// Configurar middleware de logs apenas para desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  // Adicione um log para verificar as rotas carregadas
  console.log("\n=== ROTAS REGISTRADAS ===");
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      // Rotas registradas diretamente
      console.log(`${Object.keys(middleware.route.methods).join(', ')} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Rotas registradas via router
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          console.log(`${Object.keys(handler.route.methods).join(', ')} ${middleware.regexp} ${handler.route.path}`);
        }
      });
    }
  });
}

// Iniciar servidor
const startServer = async () => {
  try {
    console.log("🔄 Iniciando servidor...");
    
    // 1. Primeiro, testar a conexão
    console.log("🔄 Testando conexão com o banco de dados...");
    await db.sequelize.authenticate();
    console.log("✅ Conexão com banco de dados estabelecida!");
    
    // 2. Sincronizar as tabelas (criar se não existem)
    console.log("🔄 Sincronizando modelos com o banco de dados...");
    await db.sequelize.sync({ alter: true });
    console.log("✅ Modelos sincronizados!");
    
    // 3. Inicializar dados básicos APÓS as tabelas estarem criadas
    console.log("🔄 Inicializando dados básicos...");
    await dbInit.initializeBasicData();
    
    // 4. Inicializar utilizadores de seed
    console.log("🔄 Inicializando utilizadores de seed...");
    await dbInit.initUtilizadoresSeed();
    
    console.log("✅ Base de dados inicializada com sucesso!");
    
  } catch (error) {
    console.error("❌ Erro ao inicializar base de dados:", error.message);
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


