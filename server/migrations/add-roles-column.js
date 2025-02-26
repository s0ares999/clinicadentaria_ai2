const { Sequelize } = require('sequelize');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dialect: 'postgres'
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

async function addRolesColumn() {
  try {
    await sequelize.query(`
      ALTER TABLE "Users" 
      ADD COLUMN IF NOT EXISTS "roles" JSON DEFAULT '[]'::json;
    `);
    console.log('Coluna "roles" adicionada com sucesso à tabela "Users"');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao adicionar coluna "roles":', error);
    process.exit(1);
  }
}

addRolesColumn();
