// Arquivo central para exportar todos os middlewares

const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');

module.exports = {
  authJwt,
  verifySignUp
}; 