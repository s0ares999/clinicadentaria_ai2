const db = require('../models');
const { sequelize } = db;
const bcrypt = require('bcryptjs');

/**
 * Sincroniza senhas entre tabelas Users e Utilizadores
 */
async function syncPasswords() {
  try {
    console.log("=== SINCRONIZANDO SENHAS ENTRE TABELAS ===");
    
    // 1. Verificar se ambas as tabelas existem
    let usersExist = false;
    let utilizadoresExist = false;
    
    try {
      await sequelize.query(`SELECT 1 FROM "Users" LIMIT 1`);
      usersExist = true;
    } catch (err) {
      console.log("Tabela Users não encontrada");
    }
    
    try {
      await sequelize.query(`SELECT 1 FROM "Utilizadores" LIMIT 1`);
      utilizadoresExist = true;
    } catch (err) {
      console.log("Tabela Utilizadores não encontrada");
    }
    
    if (!usersExist || !utilizadoresExist) {
      console.log("Ambas as tabelas precisam existir para sincronização");
      return false;
    }
    
    // 2. De Users para Utilizadores
    console.log("Sincronizando senhas de Users para Utilizadores...");
    const users = await sequelize.query(`SELECT * FROM "Users"`, {
      type: sequelize.QueryTypes.SELECT
    });
    
    for (const user of users) {
      try {
        await sequelize.query(`
          UPDATE "Utilizadores" SET senha = ?
          WHERE email = ?
        `, {
          replacements: [user.password, user.email]
        });
        console.log(`✓ Sincronizada senha para ${user.email}`);
      } catch (err) {
        console.error(`❌ Erro ao sincronizar senha para ${user.email}:`, err.message);
      }
    }
    
    // 3. De Utilizadores para Users
    console.log("\nSincronizando usuários de Utilizadores para Users...");
    const utilizadores = await sequelize.query(`
      SELECT u.*, t.nome as tipo 
      FROM "Utilizadores" u
      JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id
    `, {
      type: sequelize.QueryTypes.SELECT
    });
    
    for (const utilizador of utilizadores) {
      try {
        // Verificar se já existe na tabela Users
        const [existingUser] = await sequelize.query(`
          SELECT * FROM "Users" WHERE email = ?
        `, {
          replacements: [utilizador.email],
          type: sequelize.QueryTypes.SELECT
        });
        
        if (existingUser) {
          continue; // Já sincronizado anteriormente
        }
        
        // Definir o papel com base no tipo de utilizador
        let role = 'cliente';
        if (utilizador.tipo === 'admin') role = 'admin';
        if (utilizador.tipo === 'medico') role = 'medico';
        
        // Inserir na tabela Users
        await sequelize.query(`
          INSERT INTO "Users" (username, email, password, role, "createdAt", "updatedAt")
          VALUES (?, ?, ?, ?, NOW(), NOW())
        `, {
          replacements: [
            utilizador.nome,
            utilizador.email,
            utilizador.senha,
            role
          ]
        });
        
        console.log(`✓ Criado usuário na tabela Users para ${utilizador.email}`);
      } catch (err) {
        console.error(`❌ Erro ao criar usuário para ${utilizador.email}:`, err.message);
      }
    }
    
    console.log("\n=== SINCRONIZAÇÃO CONCLUÍDA ===");
    return true;
  } catch (error) {
    console.error("ERRO FATAL:", error);
    return false;
  }
}

// Executar diretamente
if (require.main === module) {
  syncPasswords()
    .then(success => {
      if (success) {
        console.log("\n✅ Sincronização concluída com sucesso!");
        process.exit(0);
      } else {
        console.error("\n⚠️ Sincronização concluída com problemas!");
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("\n❌ ERRO FATAL:", err);
      process.exit(1);
    });
} else {
  module.exports = { syncPasswords };
} 