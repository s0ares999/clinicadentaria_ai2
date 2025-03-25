// Script para adicionar a coluna consulta_id à tabela Faturas
const db = require('../models');
const sequelize = db.sequelize;

async function addConsultaIdColumn() {
  try {
    console.log('Iniciando adição da coluna consulta_id à tabela Faturas...');
    
    // Verificar se a coluna já existe
    const [checkResults] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'Faturas' AND column_name = 'consulta_id'
    `);
    
    if (checkResults.length > 0) {
      console.log('A coluna consulta_id já existe na tabela Faturas.');
      return;
    }
    
    // Adicionar a coluna consulta_id
    await sequelize.query(`
      ALTER TABLE "Faturas" 
      ADD COLUMN "consulta_id" INTEGER NOT NULL REFERENCES "Consultas"(id)
    `);
    
    console.log('Coluna consulta_id adicionada com sucesso à tabela Faturas!');
  } catch (error) {
    console.error('Erro ao adicionar coluna consulta_id:', error);
  } finally {
    process.exit();
  }
}

// Executar a função
addConsultaIdColumn(); 