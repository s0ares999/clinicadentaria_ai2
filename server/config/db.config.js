// Carregar variáveis de ambiente
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Arquivo de configuração do banco de dados
module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "postgres", // Senha padrão se não houver na env
  DB: process.env.DB_NAME || "clinica_dentaria",
  PORT: process.env.DB_PORT || 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // Log de queries apenas em desenvolvimento
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
};

// Log para debug
console.log("Configurações de BD carregadas:", {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "postgres",
  // Senha omitida por segurança
  DB: process.env.DB_NAME || "clinica_dentaria",
  PORT: process.env.DB_PORT || 5432
});

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // ou true para debug
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Render exige SSL
    }
  }
});

module.exports = { sequelize, Sequelize };
