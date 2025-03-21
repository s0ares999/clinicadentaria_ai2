// Configuração do JWT para autenticação
module.exports = {
  // Segredo para assinatura do token JWT
  secret: process.env.JWT_SECRET || "clinica-dentaria-segredo-do-jwt",
  
  // Tempo de expiração do token (24 horas em segundos)
  jwtExpiration: 86400,
  
  // Configurações opcionais para refresh token
  jwtRefreshExpiration: 604800, // 7 dias
  
  // Algoritmo de assinatura
  algorithm: "HS256"
}; 