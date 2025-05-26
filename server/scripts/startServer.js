require('dotenv').config();
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Verificar se o diretório de logs existe
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Arquivo de log para a saída
const logFile = path.join(logDir, `server-${new Date().toISOString().replace(/:/g, '-')}.log`);
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

console.log(`Iniciando servidor... Logs serão salvos em ${logFile}`);

// Verificar se a porta 8080 está em uso
const checkPort = exec('npx detect-port 8080');

checkPort.stdout.on('data', (data) => {
  const port = data.trim();
  
  if (port === '8080') {
    console.log('A porta 8080 está disponível. Iniciando servidor...');
    
    // Iniciar o servidor
    const server = exec('node server.js');
    
    server.stdout.on('data', (data) => {
      console.log(data);
      logStream.write(`[STDOUT] ${data}`);
    });
    
    server.stderr.on('data', (data) => {
      console.error(`[ERROR] ${data}`);
      logStream.write(`[STDERR] ${data}`);
    });
    
    server.on('close', (code) => {
      console.log(`Servidor encerrado com código ${code}`);
      logStream.end();
    });
  } else {
    console.error(`A porta 8080 está em uso! Porta disponível: ${port}`);
    console.log('Por favor, encerre o processo que está usando a porta 8080 ou altere a porta do servidor.');
    logStream.end();
  }
});

checkPort.stderr.on('data', (data) => {
  console.error(`Erro ao verificar porta: ${data}`);
  logStream.write(`[ERROR] Erro ao verificar porta: ${data}`);
  logStream.end();
}); 