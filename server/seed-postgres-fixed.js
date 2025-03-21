const db = require('./models');

/**
 * Script adaptado para PostgreSQL considerando a estrutura real das tabelas
 * Removendo dados relacionados a utilizadores
 */
async function seedPostgres(sequelizeConnection) {
  console.log("=== INSERINDO DADOS BÁSICOS NO POSTGRESQL (SEM UTILIZADORES) ===");
  
  try {
    // Usar a conexão passada ou tentar obter do db
    const sequelize = sequelizeConnection || (db && db.sequelize);
    
    if (!sequelize) {
      throw new Error("Nenhuma conexão Sequelize válida foi fornecida");
    }
    
    // Testar conexão
    await sequelize.authenticate();
    console.log("✓ Conexão com PostgreSQL estabelecida");
    
    // Listar todas as tabelas para debug
    try {
      console.log("Listando todas as tabelas no banco de dados:");
      const [tables] = await sequelize.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      console.log("Tabelas disponíveis:", tables.map(t => t.table_name).join(', '));
    } catch (err) {
      console.error("❌ Erro ao listar tabelas:", err.message);
    }
    
    // IMPORTANTE: Não vamos recriar as tabelas, apenas inserir dados
    console.log("\nInserindo dados nas tabelas de referência...");
    
    // 1. Tipos de Utilizador
    try {
      await sequelize.query(`
        INSERT INTO "TipoUtilizador" (id, nome) VALUES
        (1, 'cliente'),
        (2, 'admin'),
        (3, 'medico')
        ON CONFLICT (id) DO NOTHING;
      `);
      console.log("✓ Tipos de utilizador inseridos");
    } catch (err) {
      console.error("❌ Erro ao inserir tipos de utilizador:", err.message);
    }
    
    // 2. Especialidades
    try {
      await sequelize.query(`
        INSERT INTO "Especialidades" (id, nome, descricao) VALUES
        (1, 'Odontologia Geral', 'Tratamentos dentários básicos'),
        (2, 'Ortodontia', 'Correção da posição dos dentes'),
        (3, 'Implantes Dentários', 'Substituição de dentes perdidos'),
        (4, 'Endodontia', 'Tratamento de canal'),
        (5, 'Estética Dental', 'Procedimentos estéticos'),
        (6, 'Odontopediatria', 'Tratamento para crianças')
        ON CONFLICT (id) DO NOTHING;
      `);
      console.log("✓ Especialidades inseridas");
    } catch (err) {
      console.error("❌ Erro ao inserir especialidades:", err.message);
    }
    
    // 3. Status
    try {
      await sequelize.query(`
        INSERT INTO "ConsultaStatus" (id, nome) VALUES
        (1, 'agendada'),
        (2, 'cancelada'),
        (3, 'concluida')
        ON CONFLICT (id) DO NOTHING;
      `);
      
      await sequelize.query(`
        INSERT INTO "DisponibilidadeStatus" (id, nome) VALUES
        (1, 'ativo'),
        (2, 'inativo'),
        (3, 'ocupado')
        ON CONFLICT (id) DO NOTHING;
      `);
      
      await sequelize.query(`
        INSERT INTO "PagamentoStatus" (id, nome) VALUES
        (1, 'pendente'),
        (2, 'pago'),
        (3, 'cancelado'),
        (4, 'estornado')
        ON CONFLICT (id) DO NOTHING;
      `);
      
      await sequelize.query(`
        INSERT INTO "FaturaStatus" (id, nome) VALUES
        (1, 'emitida'),
        (2, 'paga'),
        (3, 'cancelada')
        ON CONFLICT (id) DO NOTHING;
      `);
      
      await sequelize.query(`
        INSERT INTO "NotificacaoStatus" (id, nome) VALUES
        (1, 'enviada'),
        (2, 'lida'),
        (3, 'falha')
        ON CONFLICT (id) DO NOTHING;
      `);
      
      console.log("✓ Status inseridos");
    } catch (err) {
      console.error("❌ Erro ao inserir status:", err.message);
    }
    
    console.log("\n=== POPULAÇÃO DAS TABELAS DE REFERÊNCIA CONCLUÍDA ===");
    console.log("✓ Dados de utilizadores não foram inseridos conforme solicitado");
    return true;
  } catch (error) {
    console.error("ERRO FATAL:", error);
    return false;
  }
}

// Executar diretamente
if (require.main === module) {
  // Se executado diretamente, tenta usar a conexão do db
  const { sequelize } = db;
  
  if (!sequelize) {
    console.error("❌ Nenhuma conexão Sequelize disponível.");
    process.exit(1);
  }
  
  seedPostgres(sequelize)
    .then(success => {
      if (success) {
        console.log("\n✅ Dados inseridos com sucesso!");
        process.exit(0);
      } else {
        console.error("\n⚠️ Inserção de dados concluída com problemas!");
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("\n❌ ERRO FATAL:", err);
      process.exit(1);
    });
} else {
  module.exports = { seedPostgres };
} 