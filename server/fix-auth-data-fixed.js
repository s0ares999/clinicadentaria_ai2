const db = require('./models');
const bcrypt = require('bcryptjs');
const { sequelize } = db;

// Função para criptografar senhas
const hashPassword = (senha) => bcrypt.hashSync(senha, 8);

/**
 * Script para corrigir dados de autenticação nas tabelas de usuários
 */
async function fixAuthData() {
  console.log("=== CORRIGINDO DADOS DE AUTENTICAÇÃO NAS TABELAS ===");
  
  try {
    // Testar conexão
    await sequelize.authenticate();
    console.log("✓ Conexão com PostgreSQL estabelecida");
    
    // 1. Verificar estrutura das tabelas
    console.log("\nVerificando estrutura das tabelas...");
    
    const tablesStructure = {};
    
    // Verificar tabela Users (provável tabela usada para autenticação)
    try {
      const usersColumns = await sequelize.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'Users'
      `, { type: sequelize.QueryTypes.SELECT });
      
      tablesStructure.Users = usersColumns.map(col => col.column_name);
      console.log("Colunas em Users:", tablesStructure.Users.join(", "));
    } catch (err) {
      console.log("Tabela Users não encontrada ou erro ao verificar estrutura");
    }
    
    // 2. Adicionar dados de usuários na tabela Users
    console.log("\nAdicionando dados de autenticação na tabela Users...");
    
    try {
      // Obter utilizadores existentes
      const utilizadores = await sequelize.query(`
        SELECT * FROM "Utilizadores"
      `, { type: sequelize.QueryTypes.SELECT });
      
      console.log(`Encontrados ${utilizadores.length} utilizadores para migrar`);
      
      // Inserir cada utilizador na tabela Users se ela existir
      if (tablesStructure.Users) {
        // Verificar se Users tem username, email e password
        const hasRequiredColumns = 
          tablesStructure.Users.includes('username') && 
          tablesStructure.Users.includes('email') && 
          tablesStructure.Users.includes('password');
        
        if (hasRequiredColumns) {
          for (const user of utilizadores) {
            try {
              // Definir o papel com base no tipo_utilizador_id
              let role = 'cliente';
              if (user.tipo_utilizador_id === 2) role = 'admin';
              if (user.tipo_utilizador_id === 3) role = 'medico';
              
              await sequelize.query(`
                INSERT INTO "Users" (username, email, password, role, "createdAt", "updatedAt")
                VALUES (?, ?, ?, ?, NOW(), NOW())
                ON CONFLICT (email) DO UPDATE 
                SET password = EXCLUDED.password, username = EXCLUDED.username
              `, { 
                replacements: [
                  user.nome,
                  user.email,
                  user.senha,
                  role
                ]
              });
              console.log(`✓ Usuário ${user.email} adicionado/atualizado na tabela Users`);
            } catch (err) {
              console.error(`❌ Erro ao adicionar ${user.email} na tabela Users:`, err.message);
            }
          }
        } else {
          console.log("Tabela Users não tem as colunas necessárias");
        }
      }
      
      // 3. Criar contas de teste adicionais para cada tipo
      console.log("\nCriando contas de teste...");
      
      // Criar usuário de teste Cliente
      try {
        const clienteSenha = hashPassword("cliente123");
        
        // Inserir em Utilizadores
        await sequelize.query(`
          INSERT INTO "Utilizadores" (nome, email, senha, telefone, tipo_utilizador_id, "createdAt", "updatedAt")
          VALUES (?, ?, ?, ?, 1, NOW(), NOW())
          ON CONFLICT (email) DO UPDATE SET senha = ?
        `, { 
          replacements: ['Cliente Teste', 'cliente@teste.com', clienteSenha, '910000000', clienteSenha] 
        });
        
        // Obter ID do utilizador inserido
        const [clienteUser] = await sequelize.query(`
          SELECT id FROM "Utilizadores" WHERE email = ?
        `, { 
          replacements: ['cliente@teste.com'],
          type: sequelize.QueryTypes.SELECT 
        });
        
        if (clienteUser) {
          // Inserir em Clientes
          await sequelize.query(`
            INSERT INTO "Clientes" (utilizador_id, nome, email, telefone)
            VALUES (?, ?, ?, ?)
            ON CONFLICT (utilizador_id) DO NOTHING
          `, { 
            replacements: [clienteUser.id, 'Cliente Teste', 'cliente@teste.com', '910000000'] 
          });
          
          console.log("✓ Conta de teste Cliente criada");
        }
        
        // Se a tabela Users existir, também adicionar lá
        if (tablesStructure.Users) {
          await sequelize.query(`
            INSERT INTO "Users" (username, email, password, role, "createdAt", "updatedAt")
            VALUES (?, ?, ?, 'cliente', NOW(), NOW())
            ON CONFLICT (email) DO UPDATE SET password = ?
          `, { 
            replacements: ['Cliente Teste', 'cliente@teste.com', clienteSenha, clienteSenha] 
          });
        }
      } catch (err) {
        console.error("❌ Erro ao criar conta de teste Cliente:", err.message);
      }
      
      // Criar usuário de teste Médico
      try {
        const medicoSenha = hashPassword("medico123");
        
        // Inserir em Utilizadores
        await sequelize.query(`
          INSERT INTO "Utilizadores" (nome, email, senha, telefone, tipo_utilizador_id, "createdAt", "updatedAt")
          VALUES (?, ?, ?, ?, 3, NOW(), NOW())
          ON CONFLICT (email) DO UPDATE SET senha = ?
        `, { 
          replacements: ['Médico Teste', 'medico@teste.com', medicoSenha, '920000000', medicoSenha] 
        });
        
        // Obter ID do utilizador inserido
        const [medicoUser] = await sequelize.query(`
          SELECT id FROM "Utilizadores" WHERE email = ?
        `, { 
          replacements: ['medico@teste.com'],
          type: sequelize.QueryTypes.SELECT 
        });
        
        if (medicoUser) {
          // Inserir em Médicos
          await sequelize.query(`
            INSERT INTO "Medicos" (utilizador_id, especialidade_id, crm)
            VALUES (?, 1, 'CRM-TESTE')
            ON CONFLICT (utilizador_id) DO NOTHING
          `, { 
            replacements: [medicoUser.id] 
          });
          
          console.log("✓ Conta de teste Médico criada");
        }
        
        // Se a tabela Users existir, também adicionar lá
        if (tablesStructure.Users) {
          await sequelize.query(`
            INSERT INTO "Users" (username, email, password, role, "createdAt", "updatedAt")
            VALUES (?, ?, ?, 'medico', NOW(), NOW())
            ON CONFLICT (email) DO UPDATE SET password = ?
          `, { 
            replacements: ['Médico Teste', 'medico@teste.com', medicoSenha, medicoSenha] 
          });
        }
      } catch (err) {
        console.error("❌ Erro ao criar conta de teste Médico:", err.message);
      }
      
      // Criar usuário de teste Admin
      try {
        const adminSenha = hashPassword("admin123");
        
        // Inserir em Utilizadores
        await sequelize.query(`
          INSERT INTO "Utilizadores" (nome, email, senha, telefone, tipo_utilizador_id, "createdAt", "updatedAt")
          VALUES (?, ?, ?, ?, 2, NOW(), NOW())
          ON CONFLICT (email) DO UPDATE SET senha = ?
        `, { 
          replacements: ['Admin Teste', 'admin@teste.com', adminSenha, '930000000', adminSenha] 
        });
        
        // Obter ID do utilizador inserido
        const [adminUser] = await sequelize.query(`
          SELECT id FROM "Utilizadores" WHERE email = ?
        `, { 
          replacements: ['admin@teste.com'],
          type: sequelize.QueryTypes.SELECT 
        });
        
        if (adminUser) {
          // Inserir em Admins
          await sequelize.query(`
            INSERT INTO "Admins" (utilizador_id, nivel_acesso)
            VALUES (?, 'master')
            ON CONFLICT (utilizador_id) DO NOTHING
          `, { 
            replacements: [adminUser.id] 
          });
          
          console.log("✓ Conta de teste Admin criada");
        }
        
        // Se a tabela Users existir, também adicionar lá
        if (tablesStructure.Users) {
          await sequelize.query(`
            INSERT INTO "Users" (username, email, password, role, "createdAt", "updatedAt")
            VALUES (?, ?, ?, 'admin', NOW(), NOW())
            ON CONFLICT (email) DO UPDATE SET password = ?
          `, { 
            replacements: ['Admin Teste', 'admin@teste.com', adminSenha, adminSenha] 
          });
        }
      } catch (err) {
        console.error("❌ Erro ao criar conta de teste Admin:", err.message);
      }
      
    } catch (err) {
      console.error("❌ Erro ao processar utilizadores:", err.message);
    }
    
    console.log("\n=== CORREÇÃO DE DADOS DE AUTENTICAÇÃO CONCLUÍDA ===");
    console.log("\nContas de teste criadas:");
    console.log("- Cliente: email: cliente@teste.com, senha: cliente123");
    console.log("- Médico: email: medico@teste.com, senha: medico123");
    console.log("- Admin: email: admin@teste.com, senha: admin123");
    
    return true;
  } catch (error) {
    console.error("ERRO FATAL:", error);
    return false;
  }
}

// Executar diretamente
if (require.main === module) {
  fixAuthData()
    .then(success => {
      if (success) {
        console.log("\n✅ Correção de dados concluída!");
        process.exit(0);
      } else {
        console.error("\n⚠️ Correção de dados concluída com problemas!");
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("\n❌ ERRO FATAL:", err);
      process.exit(1);
    });
} else {
  module.exports = { fixAuthData };
} 