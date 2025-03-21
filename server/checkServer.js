// Arquivo para verificar se o servidor está rodando corretamente
console.log("Verificando servidor...");

const http = require('http');

const options = {
  host: 'localhost',
  port: 8080,
  path: '/api/health',
  timeout: 2000
};

const request = http.get(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log("O servidor está rodando corretamente na porta 8080!");
  }
  res.on('data', () => {});
  res.on('end', () => {
    process.exit(0);
  });
});

request.on('error', (err) => {
  console.error(`Erro ao conectar: ${err.message}`);
  console.log(`
====== SOLUÇÃO DE PROBLEMAS DO SERVIDOR ======

1. Verifique se o servidor está rodando:
   - Execute 'npm start' ou 'node server.js' no diretório server

2. Verifique se a porta 8080 está em uso por outro processo:
   - Windows: 'netstat -ano | findstr :8080'
   - Linux/Mac: 'lsof -i :8080'

3. Verifique sua configuração de firewall

4. Verifique o arquivo .env para configurações específicas
`);
  process.exit(1);
}); 