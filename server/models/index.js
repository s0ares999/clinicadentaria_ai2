'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const basename = path.basename(__filename);

// Corrigir aqui: importar as configurações e criar a instância
const dbConfig = require('../config/db.config.js');
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    dialectOptions: dbConfig.dialectOptions
  }
);

const db = {};

console.log("====== INICIALIZANDO CONEXÃO SEQUELIZE ======");

// Testar a conexão e mostrar mensagem
sequelize.authenticate()
  .then(() => console.log("Conexão ao banco de dados validada com sucesso"))
  .catch(err => console.error("Erro ao conectar ao banco de dados:", err));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Carregar todos os modelos do diretório
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    console.log(`Carregando modelo: ${file}`);
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize);
      db[model.name.charAt(0).toUpperCase() + model.name.slice(1)] = model;
    } catch (error) {
      console.error(`Erro ao carregar modelo ${file}:`, error);
    }
  });

// Executar as associações para cada modelo
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log(`Configurando associações para o modelo: ${modelName}`);
    try {
      db[modelName].associate(db);
    } catch (error) {
      console.error(`Erro ao configurar associações para ${modelName}:`, error);
    }
  }
});

module.exports = db;
