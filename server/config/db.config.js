// Carregar variáveis de ambiente
require('dotenv').config();

// Arquivo de configuração do banco de dados
module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "postgres",
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
