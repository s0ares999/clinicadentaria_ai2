const db = require('./models');
const dbInit = require('./config/db.init');

async function testarInicializacao() {
  try {
    console.log("🔄 Conectando ao banco de dados...");
    await db.sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados com sucesso!");

    // Verificar disponibilidade status antes
    let dispStatus = await db.DisponibilidadeStatus.findAll();
    console.log("Status de disponibilidade antes:", dispStatus.map(s => ({ id: s.id, nome: s.nome })));

    // Verificar pagamento status antes
    let pagStatus = await db.PagamentoStatus.findAll();
    console.log("Status de pagamento antes:", pagStatus.map(s => ({ id: s.id, nome: s.nome })));

    // Forçar a inicialização específica desses dois models
    console.log("\n🔄 Inicializando DisponibilidadeStatus...");
    await dbInit.initDisponibilidadeStatus();
    
    console.log("\n🔄 Inicializando PagamentoStatus...");
    await dbInit.initPagamentoStatus();

    // Verificar disponibilidade status depois
    dispStatus = await db.DisponibilidadeStatus.findAll();
    console.log("\nStatus de disponibilidade depois:", dispStatus.map(s => ({ id: s.id, nome: s.nome })));

    // Verificar pagamento status depois
    pagStatus = await db.PagamentoStatus.findAll();
    console.log("Status de pagamento depois:", pagStatus.map(s => ({ id: s.id, nome: s.nome })));

    console.log("\n✅ Teste concluído com sucesso!");
  } catch (error) {
    console.error("❌ Erro durante o teste:", error);
  } finally {
    // Fechar a conexão
    await db.sequelize.close();
  }
}

testarInicializacao(); 