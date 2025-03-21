const fs = require('fs');
const path = require('path');

console.log("=== DIAGNÓSTICO DE ROTAS E CONTROLLERS ===");

// Verificar controllers
const controllersDir = path.join(__dirname, 'controllers');
console.log(`\nVerificando controllers em: ${controllersDir}`);
const controllers = fs.readdirSync(controllersDir);

controllers.forEach(file => {
  if (file.endsWith('.controller.js')) {
    try {
      const controller = require(path.join(controllersDir, file));
      console.log(`\n- Controller: ${file}`);
      console.log(`  Métodos exportados: ${Object.keys(controller).join(', ')}`);
    } catch (error) {
      console.error(`  ERRO ao carregar controller ${file}:`, error.message);
    }
  }
});

// Verificar rotas
const routesDir = path.join(__dirname, 'routes');
console.log(`\nVerificando rotas em: ${routesDir}`);
const routes = fs.readdirSync(routesDir);

routes.forEach(file => {
  if (file.endsWith('.routes.js')) {
    console.log(`- Rota: ${file}`);
    try {
      // Não vamos executar, apenas verificar a sintaxe
      const routeContent = fs.readFileSync(path.join(routesDir, file), 'utf8');
      
      // Verificações básicas
      const hasExport = routeContent.includes('module.exports');
      const hasRouter = routeContent.includes('const router');
      const hasApp = routeContent.includes('app.use');
      
      console.log(`  Exporta módulo: ${hasExport ? 'Sim' : 'Não'}`);
      console.log(`  Define router: ${hasRouter ? 'Sim' : 'Não'}`);
      console.log(`  Usa app: ${hasApp ? 'Sim' : 'Não'}`);
    } catch (error) {
      console.error(`  ERRO ao analisar arquivo ${file}:`, error.message);
    }
  }
});

console.log("\n=== FIM DO DIAGNÓSTICO ==="); 