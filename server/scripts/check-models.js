const db = require('./models');
const { sequelize } = db;

console.log("=== VERIFICAÇÃO DE MODELOS DO SEQUELIZE ===");

// Listar todos os modelos disponíveis
console.log("\nModelos definidos:");
const modelos = Object.keys(db);
modelos.forEach((modelo, index) => {
  if (modelo !== 'sequelize' && modelo !== 'Sequelize') {
    console.log(`${index+1}. ${modelo}`);
  }
});

// Tentar conectar ao banco de dados
console.log("\nVerificando conexão com o banco de dados...");
sequelize.authenticate()
  .then(() => {
    console.log("✓ Conexão estabelecida com sucesso!");
    
    // Listar tabelas no banco de dados
    console.log("\nListando tabelas existentes no banco de dados...");
    return sequelize.getQueryInterface().showAllTables();
  })
  .then(tabelas => {
    console.log("Tabelas encontradas:", tabelas);
    console.log("\n=== VERIFICAÇÃO CONCLUÍDA ===");
    process.exit(0);
  })
  .catch(err => {
    console.error("✗ Erro ao conectar ou verificar tabelas:", err.message);
    console.log("\n=== VERIFICAÇÃO FALHOU ===");
    process.exit(1);
  }); 