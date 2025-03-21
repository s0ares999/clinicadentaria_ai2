const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Configuração da conexão
const sequelize = new Sequelize(
  process.env.DB_NAME || 'clinica_dentaria',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');

    // Adicionar as colunas à tabela Clientes
    console.log('Executando migração: Adicionando campos à tabela Clientes');
    
    try {
      await sequelize.query(`
        ALTER TABLE "Clientes" 
        ADD COLUMN IF NOT EXISTS "morada" VARCHAR(255),
        ADD COLUMN IF NOT EXISTS "nif" VARCHAR(50)
      `);
      console.log('✓ Migração executada com sucesso!');
    } catch (err) {
      console.error('Erro ao adicionar colunas:', err);
    }

  } catch (error) {
    console.error('Erro ao executar migração:', error);
  } finally {
    await sequelize.close();
  }
}

runMigration(); 