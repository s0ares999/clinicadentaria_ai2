// Script para adicionar a coluna observacoes à tabela Faturas
const db = require('../models');
const sequelize = db.sequelize;

async function addObservacoesColumn() {
  try {
    console.log('Iniciando adição da coluna observacoes à tabela Faturas...');
    
    // Verificar se a coluna já existe
    const [checkResults] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Faturas' AND column_name = 'observacoes'
    `);
    
    if (checkResults.length > 0) {
      console.log('A coluna observacoes já existe na tabela Faturas.');
      return;
    }
    
    // Adicionar a coluna observacoes
    await sequelize.query(`
      ALTER TABLE "Faturas" 
      ADD COLUMN "observacoes" TEXT
    `);
    
    console.log('Coluna observacoes adicionada com sucesso à tabela Faturas!');
  } catch (error) {
    console.error('Erro ao adicionar coluna observacoes:', error);
  } finally {
    process.exit();
  }
}

// Executar a função
addObservacoesColumn(); 