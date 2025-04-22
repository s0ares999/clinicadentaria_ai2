// Script para inicializar os status de fatura
const db = require('../models');

async function initFaturaStatus() {
  try {
    console.log('Verificando se já existem status de fatura...');
    const count = await db.FaturaStatus.count();
    
    if (count > 0) {
      console.log(`Já existem ${count} status de fatura no banco de dados.`);
      return;
    }
    
    console.log('Inserindo status de fatura no banco de dados...');
    
    // Inserir os status
    await db.FaturaStatus.bulkCreate([
      { id: 1, nome: 'Emitida' },
      { id: 2, nome: 'Paga' },
      { id: 3, nome: 'Cancelada' }
    ]);
    
    console.log('Status de fatura inseridos com sucesso!');
    
    // Verificar se foram inseridos
    const statusList = await db.FaturaStatus.findAll({ raw: true });
    console.log('Status inseridos:');
    console.table(statusList);
    
  } catch (error) {
    console.error('Erro ao inicializar status de fatura:', error);
  } finally {
    process.exit();
  }
}

// Executar a função
initFaturaStatus(); 