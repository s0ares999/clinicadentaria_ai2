const { Pool } = require('pg');
const db = require('./models');
const { sequelize } = db;

async function checkPostgresTables() {
  console.log("=== VERIFICANDO TABELAS POSTGRESQL ===");
  
  try {
    // Obter credenciais do sequelize
    const config = sequelize.config;
    console.log("Conectando ao banco de dados:", config.database);
    
    // Criar conexão direta com postgres para verificação
    const pool = new Pool({
      user: config.username,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port || 5432
    });
    
    console.log("Conexão estabelecida, verificando tabelas...");
    
    // Listar todas as tabelas no schema público
    const { rows: tables } = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    
    console.log(`\nTabelas encontradas no banco (${tables.length}):`);
    tables.forEach(({ table_name }, index) => {
      console.log(`${index+1}. ${table_name}`);
    });
    
    // Para cada tabela, verificar suas colunas
    console.log("\n=== DETALHES DAS TABELAS ===");
    
    for (const { table_name } of tables) {
      const { rows: columns } = await pool.query(
        `SELECT column_name, data_type, is_nullable 
         FROM information_schema.columns 
         WHERE table_schema = 'public' AND table_name = $1
         ORDER BY ordinal_position`,
        [table_name]
      );
      
      console.log(`\nTabela: ${table_name} (${columns.length} colunas)`);
      columns.forEach(({ column_name, data_type, is_nullable }) => {
        console.log(`- ${column_name}: ${data_type} ${is_nullable === 'YES' ? '(nullable)' : ''}`);
      });
      
      // Verificar alguns dados (apenas para tabelas pequenas)
      if (['tipoutilizador', 'especialidades', 'consultastatus'].includes(table_name)) {
        const { rows: data } = await pool.query(`SELECT * FROM "${table_name}" LIMIT 5`);
        console.log(`Amostra de dados (${data.length}):`);
        console.log(data);
      }
    }
    
    // Fechar a conexão
    await pool.end();
    
    console.log("\n=== VERIFICAÇÃO CONCLUÍDA ===");
    return true;
  } catch (error) {
    console.error("ERRO:", error.message);
    return false;
  }
}

// Executar diretamente
if (require.main === module) {
  checkPostgresTables()
    .then(success => {
      if (success) {
        console.log("\n✅ Verificação concluída com sucesso!");
        process.exit(0);
      } else {
        console.error("\n⚠️ Verificação concluída com problemas!");
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("\n❌ ERRO FATAL:", err);
      process.exit(1);
    });
} else {
  module.exports = { checkPostgresTables };
} 