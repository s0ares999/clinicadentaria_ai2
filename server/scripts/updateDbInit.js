const db = require('./models');
const fs = require('fs');
const path = require('path');

/**
 * Script para extrair valores atuais da base de dados e atualizar db.init.js
 */
async function updateDbInit() {
  console.log("=== ATUALIZAÇÃO DO DB.INIT.JS COM VALORES ATUAIS ===");
  
  try {
    // Verificar a conexão com o banco de dados
    await db.sequelize.authenticate();
    console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
    
    // Tabelas a serem verificadas
    const tablesMap = [
      { name: 'TipoUtilizador', model: db.TipoUtilizador, varName: 'tiposPadrao' },
      { name: 'ConsultaStatus', model: db.ConsultaStatus, varName: 'statusPadrao' },
      { name: 'DisponibilidadeStatus', model: db.DisponibilidadeStatus, varName: 'statusPadrao' },
      { name: 'FaturaStatus', model: db.FaturaStatus, varName: 'statusPadrao' },
      { name: 'PagamentoStatus', model: db.PagamentoStatus, varName: 'statusPadrao' }
    ];
    
    // Extrair dados atuais da base de dados
    console.log("\n🔍 Extraindo dados atuais da base de dados...");
    
    const currentValues = {};
    for (const { name, model } of tablesMap) {
      try {
        if (!model) {
          console.log(`❌ Modelo ${name} não encontrado!`);
          continue;
        }
        
        const records = await model.findAll({ 
          order: [['id', 'ASC']],
          raw: true 
        });
        
        console.log(`\n== ${name} (${records.length} registros) ==`);
        
        if (records.length === 0) {
          console.log(`⚠️ Tabela ${name} está vazia!`);
        } else {
          console.table(records);
          currentValues[name] = records;
        }
      } catch (error) {
        console.error(`❌ Erro ao extrair dados de ${name}:`, error.message);
      }
    }
    
    // Gerar código para atualizar db.init.js
    console.log("\n📝 Gerando código para atualizar db.init.js...");
    
    let codeUpdates = {};
    
    for (const { name, varName } of tablesMap) {
      if (currentValues[name] && currentValues[name].length > 0) {
        // Gerar o código JavaScript para os valores
        const valuesCode = JSON.stringify(currentValues[name], null, 6)
          .replace(/\"([^\"]+)\":/g, '$1:'); // Remover aspas das chaves
        
        codeUpdates[name] = `// Criar ${name.toLowerCase()} padrão\n    const ${varName} = ${valuesCode};\n    `;
      }
    }
    
    // Ler o arquivo db.init.js atual
    const dbInitPath = path.join(__dirname, 'config', 'db.init.js');
    let dbInitContent = fs.readFileSync(dbInitPath, 'utf8');
    
    // Fazer as substituições
    let updated = false;
    for (const [name, codeSnippet] of Object.entries(codeUpdates)) {
      // Regex para encontrar o bloco específico para cada modelo
      const regex = new RegExp(`(// Criar ${name.toLowerCase()} padrão[\\s\\S]*?const ${tablesMap.find(t => t.name === name).varName} = \\[)[\\s\\S]*?(\\];)`, 'i');
      
      if (regex.test(dbInitContent)) {
        dbInitContent = dbInitContent.replace(regex, `$1${JSON.stringify(currentValues[name], null, 6).replace(/^\[/, '').replace(/\]$/, '').replace(/\"([^\"]+)\":/g, '$1:')}$2`);
        console.log(`✅ Atualizado bloco para ${name}`);
        updated = true;
      } else {
        console.log(`⚠️ Não foi possível encontrar o bloco para ${name}`);
        // Mostrar o código que deveria ser inserido manualmente
        console.log(`\nCódigo para ${name}:`);
        console.log(codeSnippet);
      }
    }
    
    if (updated) {
      // Backup do arquivo original
      const backupPath = `${dbInitPath}.backup-${Date.now()}`;
      fs.writeFileSync(backupPath, fs.readFileSync(dbInitPath));
      console.log(`✅ Backup do arquivo original criado em: ${backupPath}`);
      
      // Salvar o arquivo atualizado
      fs.writeFileSync(dbInitPath, dbInitContent);
      console.log(`✅ Arquivo db.init.js atualizado com sucesso!`);
    } else {
      console.log(`⚠️ Nenhuma atualização foi feita no arquivo.`);
    }
    
    return true;
  } catch (error) {
    console.error("❌ ERRO DURANTE ATUALIZAÇÃO:", error);
    return false;
  }
}

// Executar diretamente
if (require.main === module) {
  updateDbInit()
    .then(success => {
      if (success) {
        console.log("\n✅ Atualização concluída!");
        process.exit(0);
      } else {
        console.error("\n⚠️ Atualização concluída com problemas!");
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("\n❌ ERRO FATAL:", err);
      process.exit(1);
    });
} else {
  module.exports = { updateDbInit };
}