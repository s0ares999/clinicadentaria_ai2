const axios = require('axios');
const baseURL = 'http://localhost:8000/api'; // Ajuste para a porta correta do seu servidor

// Função para testar login
async function testLogin(email, password) {
  try {
    console.log(`\n=== Testando login com ${email} ===`);
    const response = await axios.post(`${baseURL}/auth/signin`, {
      email,
      password
    });
    
    console.log('Status:', response.status);
    console.log('Dados:', response.data);
    
    return response.data.accessToken;
  } catch (error) {
    console.error('Erro:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Função para verificar token
async function verifyToken(token) {
  try {
    console.log('\n=== Verificando token ===');
    const response = await axios.get(`${baseURL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Status:', response.status);
    console.log('Dados:', response.data);
  } catch (error) {
    console.error('Erro:', error.response ? error.response.data : error.message);
  }
}

// Testar todas as contas
async function runTests() {
  console.log('=== TESTE DO SISTEMA DE AUTENTICAÇÃO ===');
  
  // Testar cliente
  const clienteToken = await testLogin('cliente@teste.com', 'cliente123');
  if (clienteToken) {
    await verifyToken(clienteToken);
  }
  
  // Testar médico
  const medicoToken = await testLogin('medico@teste.com', 'medico123');
  if (medicoToken) {
    await verifyToken(medicoToken);
  }
  
  // Testar admin
  const adminToken = await testLogin('admin@teste.com', 'admin123');
  if (adminToken) {
    await verifyToken(adminToken);
  }
  
  console.log('\n=== TESTES CONCLUÍDOS ===');
}

// Executar testes
runTests()
  .then(() => {
    console.log('Testes finalizados.');
  })
  .catch(err => {
    console.error('Erro nos testes:', err);
  }); 