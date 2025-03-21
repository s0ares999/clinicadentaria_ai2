const { Sequelize } = require('sequelize');
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

async function createBasicTables() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');

    // Criar tabelas básicas
    await sequelize.query(`
      -- Tabela de Tipos de Utilizador
      CREATE TABLE IF NOT EXISTS "TipoUtilizador" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE
      );

      -- Tabela de Especialidades
      CREATE TABLE IF NOT EXISTS "Especialidades" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao TEXT
      );

      -- Outras tabelas de status
      CREATE TABLE IF NOT EXISTS "ConsultaStatus" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS "DisponibilidadeStatus" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS "PagamentoStatus" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS "FaturaStatus" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS "NotificacaoStatus" (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL UNIQUE
      );
    `);

    console.log('Tabelas básicas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  } finally {
    await sequelize.close();
  }
}

createBasicTables(); 