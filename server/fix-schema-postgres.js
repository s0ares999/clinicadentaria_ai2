const db = require('./models');
const { sequelize } = db;
const { QueryTypes } = require('sequelize');

async function fixSchema() {
  console.log("=== VERIFICANDO E CORRIGINDO ESQUEMA DO BANCO DE DADOS ===");
  
  try {
    // Verificar conexão
    await sequelize.authenticate();
    console.log("✓ Conexão estabelecida com o banco de dados");
    
    // Obter informações do banco
    const dbName = sequelize.config.database;
    const dialect = sequelize.options.dialect;
    
    console.log(`\nBanco de dados: ${dbName}`);
    console.log(`Dialeto: ${dialect}`);
    
    // Listar todas as tabelas
    let tables = [];
    
    if (dialect === 'postgres') {
      console.log("Consultando tabelas no PostgreSQL...");
      const result = await sequelize.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
        { type: QueryTypes.SELECT }
      );
      
      console.log("Resultado bruto:", JSON.stringify(result));
      
      // Verificar se os resultados têm a estrutura esperada
      if (result && result.length > 0) {
        tables = result.map(r => r.table_name).filter(name => name !== null && name !== undefined);
        console.log("Tabelas extraídas:", tables);
      } else {
        console.log("Nenhuma tabela encontrada no banco de dados");
      }
    } else if (dialect === 'mysql') {
      const result = await sequelize.query(
        `SHOW TABLES FROM \`${dbName}\``,
        { type: QueryTypes.SELECT }
      );
      tables = result.map(r => Object.values(r)[0]).filter(Boolean);
    } else if (dialect === 'sqlite') {
      const result = await sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table'",
        { type: QueryTypes.SELECT }
      );
      tables = result.map(r => r.name).filter(name => name !== 'sqlite_sequence' && Boolean(name));
    }
    
    console.log(`\nTabelas encontradas (${tables.length}):`);
    if (tables.length > 0) {
      tables.forEach(table => console.log(`- ${table}`));
    } else {
      console.log("Nenhuma tabela encontrada");
    }
    
    // Lista de tabelas esperadas (nomes em minúsculas para PostgreSQL)
    const expectedTables = dialect === 'postgres' 
      ? [
          'tipoutilizador',
          'especialidade',
          'consultastatus',
          'disponibilidadestatus',
          'pagamentostatus',
          'faturastatus',
          'notificacaostatus',
          'utilizador',
          'cliente',
          'medico',
          'admin',
          'disponibilidade',
          'consulta',
          'pagamento',
          'fatura',
          'faturapagamento',
          'notificacao'
        ]
      : [
          'TipoUtilizador',
          'Especialidade',
          'ConsultaStatus',
          'DisponibilidadeStatus',
          'PagamentoStatus',
          'FaturaStatus',
          'NotificacaoStatus',
          'Utilizador',
          'Cliente',
          'Medico',
          'Admin',
          'Disponibilidade',
          'Consulta',
          'Pagamento',
          'Fatura',
          'FaturaPagamento',
          'Notificacao'
        ];
    
    // Verificar quais tabelas estão faltando
    const missingTables = expectedTables.filter(
      expected => !tables.some(actual => 
        actual && actual.toLowerCase() === expected.toLowerCase()
      )
    );
    
    if (missingTables.length > 0) {
      console.log(`\n⚠️ Tabelas ausentes (${missingTables.length}):`);
      missingTables.forEach(table => console.log(`- ${table}`));
      
      // Sincronizar apenas as tabelas ausentes
      console.log("\nSincronizando tabelas ausentes...");
      
      // Mapear nomes de tabelas para nomes de modelos
      const modelMap = {
        'tipoutilizador': 'TipoUtilizador',
        'especialidade': 'Especialidade',
        'consultastatus': 'ConsultaStatus',
        'disponibilidadestatus': 'DisponibilidadeStatus',
        'pagamentostatus': 'PagamentoStatus',
        'faturastatus': 'FaturaStatus',
        'notificacaostatus': 'NotificacaoStatus',
        'utilizador': 'Utilizador',
        'cliente': 'Cliente',
        'medico': 'Medico',
        'admin': 'Admin',
        'disponibilidade': 'Disponibilidade',
        'consulta': 'Consulta',
        'pagamento': 'Pagamento',
        'fatura': 'Fatura',
        'faturapagamento': 'FaturaPagamento',
        'notificacao': 'Notificacao'
      };
      
      for (const tableName of missingTables) {
        // Obter o nome do modelo correspondente
        const modelName = dialect === 'postgres' ? modelMap[tableName] : tableName;
        
        if (db[modelName]) {
          try {
            console.log(`Sincronizando tabela ${tableName} (modelo ${modelName})...`);
            await db[modelName].sync({ force: false });
            console.log(`✓ Tabela ${tableName} sincronizada`);
          } catch (err) {
            console.error(`✗ Erro ao sincronizar ${tableName} (${modelName}):`, err.message);
          }
        } else {
          console.error(`✗ Modelo ${modelName} não encontrado no Sequelize`);
        }
      }
    } else {
      console.log("\n✓ Todas as tabelas esperadas estão presentes!");
    }
    
    // Listar modelos disponíveis no Sequelize
    console.log("\nModelos disponíveis no Sequelize:");
    const availableModels = Object.keys(db)
      .filter(key => key !== 'sequelize' && key !== 'Sequelize');
    
    availableModels.forEach(model => console.log(`- ${model}`));
    
    // Verificar estrutura das tabelas existentes
    if (tables.length > 0) {
      console.log("\nVerificando estrutura das tabelas existentes...");
      
      // Selecionar algumas tabelas para verificar
      const tablesToCheck = tables.slice(0, Math.min(5, tables.length));
      
      for (const table of tablesToCheck) {
        try {
          console.log(`\nVerificando estrutura da tabela: ${table}`);
          
          let columns = [];
          if (dialect === 'postgres') {
            const result = await sequelize.query(
              `SELECT column_name, data_type FROM information_schema.columns 
               WHERE table_name = '${table}'`,
              { type: QueryTypes.SELECT }
            );
            columns = result.map(r => `${r.column_name} (${r.data_type})`);
          }
          
          console.log(`Colunas (${columns.length}):`);
          columns.forEach(col => console.log(`- ${col}`));
        } catch (err) {
          console.error(`Erro ao verificar estrutura da tabela ${table}:`, err.message);
        }
      }
    }
    
    console.log("\n=== VERIFICAÇÃO DE ESQUEMA CONCLUÍDA ===");
    return true;
  } catch (error) {
    console.error("ERRO DURANTE VERIFICAÇÃO:", error);
    return false;
  }
}

// Executar diretamente
if (require.main === module) {
  fixSchema()
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
  module.exports = { fixSchema };
} 