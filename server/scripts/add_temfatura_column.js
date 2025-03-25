// Script para adicionar a coluna tem_fatura à tabela Consultas
const db = require('../models');
const sequelize = db.sequelize;

async function addTemFaturaColumn() {
  try {
    console.log('Iniciando adição da coluna tem_fatura à tabela Consultas...');
    
    // Verificar se a coluna já existe
    const [checkResults] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Consultas' AND column_name = 'tem_fatura'
    `);
    
    if (checkResults.length > 0) {
      console.log('A coluna tem_fatura já existe na tabela Consultas.');
      return;
    }
    
    // Adicionar a coluna tem_fatura
    await sequelize.query(`
      ALTER TABLE "Consultas" 
      ADD COLUMN "tem_fatura" BOOLEAN DEFAULT false
    `);
    
    console.log('Coluna tem_fatura adicionada com sucesso à tabela Consultas!');
    
    // Atualizar consultas que já têm faturas
    const [faturas] = await sequelize.query(`
      SELECT consulta_id FROM "Faturas"
    `);
    
    if (faturas.length > 0) {
      const consultaIds = faturas.map(f => f.consulta_id).join(',');
      await sequelize.query(`
        UPDATE "Consultas"
        SET "tem_fatura" = true
        WHERE "id" IN (${consultaIds})
      `);
      console.log(`Atualizadas ${faturas.length} consultas existentes que já possuem faturas.`);
    }
    
  } catch (error) {
    console.error('Erro ao adicionar coluna tem_fatura:', error);
  } finally {
    process.exit();
  }
}

// Executar a função
addTemFaturaColumn(); 