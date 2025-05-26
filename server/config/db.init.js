const db = require('../models');

/**
 * Inicializar dados básicos no banco de dados
 */
const initializeBasicData = async () => {
  console.log("🔄 Inicializando dados básicos...");
  
  const resultados = {
    tipoUtilizador: false,
    consultaStatus: false,
    disponibilidadeStatus: false,
    faturaStatus: false,
    pagamentoStatus: false
  };
  
  try {
    // Inicializar tipos de utilizador, se necessário
    resultados.tipoUtilizador = await initTipoUtilizador();
    
    // Inicializar status de consulta
    resultados.consultaStatus = await initConsultaStatus();
    
    // Inicializar status de disponibilidade
    resultados.disponibilidadeStatus = await initDisponibilidadeStatus();
    
    // Inicializar status de fatura
    resultados.faturaStatus = await initFaturaStatus();
    
    // Inicializar status de pagamento
    resultados.pagamentoStatus = await initPagamentoStatus();
    
    // Verificar se houve alguma falha
    const falhas = Object.entries(resultados)
      .filter(([_, sucesso]) => !sucesso)
      .map(([nome]) => nome);
    
    if (falhas.length > 0) {
      console.warn(`⚠️ Algumas inicializações falharam: ${falhas.join(', ')}`);
    } else {
      console.log("✅ Todos os dados básicos inicializados com sucesso!");
    }
    
    return resultados;
  } catch (error) {
    console.error("❌ Erro ao inicializar dados básicos:", error);
    return resultados;
  }
};

/**
 * Inicializa os tipos de utilizador (se não existirem)
 */
const initTipoUtilizador = async () => {
  try {
    console.log("🔄 Inicializando tipos de utilizador...");
    const TipoUtilizador = db.TipoUtilizador;
    
    // Verificar se o modelo existe
    if (!TipoUtilizador) {
      console.error("❌ Modelo TipoUtilizador não encontrado!");
      return false;
    }
    
    // Verificar se já existem dados
    const count = await TipoUtilizador.count();
    console.log(`Contagem atual de TipoUtilizador: ${count}`);
    
    if (count > 0) {
      console.log(`✓ Tabela TipoUtilizador já possui ${count} registros.`);
      
      // Mostrar os registros existentes para debug
      const tiposExistentes = await TipoUtilizador.findAll({ raw: true });
      console.log("Tipos de utilizador existentes:");
      console.table(tiposExistentes);
      
      return true;
    }
    
    // Criar tipos padrão
    const tiposPadrao = [
      { id: 1, nome: 'cliente' },
      { id: 2, nome: 'admin' },
      { id: 3, nome: 'medico' }
    ];
    
    console.log(`Tentando inserir ${tiposPadrao.length} tipos de utilizador...`);
    
    // Usar bulkCreate para inserir todos de uma vez
    await TipoUtilizador.bulkCreate(tiposPadrao);
    
    // Verificar se foram criados
    const verificacao = await TipoUtilizador.findAll({ raw: true });
    console.log("Tipos de utilizador após criação:");
    console.table(verificacao);
    
    if (verificacao.length > 0) {
      console.log("✅ Tipos de utilizador inicializados com sucesso!");
      return true;
    } else {
      console.error("❌ Falha ao criar tipos de utilizador - nenhum registro encontrado após criação");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar tipos de utilizador:", error);
    return false;
  }
};

/**
 * Inicializa os status de consulta (se não existirem)
 */
const initConsultaStatus = async () => {
  try {
    console.log("🔄 Inicializando status de consulta...");
    const ConsultaStatus = db.ConsultaStatus;
    
    // Verificar se o modelo existe
    if (!ConsultaStatus) {
      console.error("❌ Modelo ConsultaStatus não encontrado!");
      return false;
    }
    
    // Verificar se já existem dados
    const count = await ConsultaStatus.count();
    console.log(`Contagem atual de ConsultaStatus: ${count}`);
    
    if (count > 0) {
      console.log(`✓ Tabela ConsultaStatus já possui ${count} registros.`);
      
      // Mostrar os registros existentes para debug
      const statusExistentes = await ConsultaStatus.findAll({ raw: true });
      console.log("Status de consulta existentes:");
      console.table(statusExistentes);
      
      return true;
    }
    
    // Criar status padrão
    const statusPadrao = [
      { id: 1, nome: 'Pendente', descricao: null },
      { id: 2, nome: 'Confirmada', descricao: null },
      { id: 3, nome: 'Concluída', descricao: null },
      { id: 4, nome: 'Cancelada', descricao: null }
    ];
    
    console.log(`Tentando inserir ${statusPadrao.length} status de consulta...`);
    
    // Usar bulkCreate para inserir todos de uma vez
    await ConsultaStatus.bulkCreate(statusPadrao);
    
    // Verificar se foram criados
    const verificacao = await ConsultaStatus.findAll({ raw: true });
    console.log("Status de consulta após criação:");
    console.table(verificacao);
    
    if (verificacao.length > 0) {
      console.log("✅ Status de consulta inicializados com sucesso!");
      return true;
    } else {
      console.error("❌ Falha ao criar status de consulta - nenhum registro encontrado após criação");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar status de consulta:", error);
    return false;
  }
};

/**
 * Inicializa os status de disponibilidade (se não existirem)
 */
const initDisponibilidadeStatus = async () => {
  try {
    console.log("🔄 Inicializando status de disponibilidade...");
    const DisponibilidadeStatus = db.DisponibilidadeStatus;
    
    // Verificar se o modelo existe
    if (!DisponibilidadeStatus) {
      console.error("❌ Modelo DisponibilidadeStatus não encontrado!");
      return false;
    }
    
    // Verificar se já existem dados
    const count = await DisponibilidadeStatus.count();
    console.log(`Contagem atual de DisponibilidadeStatus: ${count}`);
    
    if (count > 0) {
      console.log(`✓ Tabela DisponibilidadeStatus já possui ${count} registros.`);
      
      // Mostrar os registros existentes para debug
      const statusExistentes = await DisponibilidadeStatus.findAll({ raw: true });
      console.log("Status de disponibilidade existentes:");
      console.table(statusExistentes);
      
      return true;
    }
    
    // Criar status padrão
    const statusPadrao = [
      { id: 1, nome: 'ativo' },
      { id: 2, nome: 'inativo' },
      { id: 3, nome: 'ocupado' }
    ];
    
    console.log(`Tentando inserir ${statusPadrao.length} status de disponibilidade...`);
    
    // Usar bulkCreate para inserir todos de uma vez
    await DisponibilidadeStatus.bulkCreate(statusPadrao);
    
    // Verificar se foram criados
    const verificacao = await DisponibilidadeStatus.findAll({ raw: true });
    console.log("Status de disponibilidade após criação:");
    console.table(verificacao);
    
    if (verificacao.length > 0) {
      console.log("✅ Status de disponibilidade inicializados com sucesso!");
      return true;
    } else {
      console.error("❌ Falha ao criar status de disponibilidade - nenhum registro encontrado após criação");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar status de disponibilidade:", error);
    return false;
  }
};

/**
 * Inicializa os status de fatura (se não existirem)
 */
const initFaturaStatus = async () => {
  try {
    console.log("🔄 Inicializando status de fatura...");
    const FaturaStatus = db.FaturaStatus;
    
    // Verificar se o modelo existe
    if (!FaturaStatus) {
      console.error("❌ Modelo FaturaStatus não encontrado!");
      return false;
    }
    
    // Verificar se já existem dados
    const count = await FaturaStatus.count();
    console.log(`Contagem atual de FaturaStatus: ${count}`);
    
    if (count > 0) {
      console.log(`✓ Tabela FaturaStatus já possui ${count} registros.`);
      
      // Mostrar os registros existentes para debug
      const statusExistentes = await FaturaStatus.findAll({ raw: true });
      console.log("Status de fatura existentes:");
      console.table(statusExistentes);
      
      return true;
    }
    
    // Criar status padrão
    const statusPadrao = [
      { id: 1, nome: 'emitida' },
      { id: 2, nome: 'paga' },
      { id: 3, nome: 'cancelada' }
    ];
    
    console.log(`Tentando inserir ${statusPadrao.length} status de fatura...`);
    
    // Usar bulkCreate para inserir todos de uma vez
    await FaturaStatus.bulkCreate(statusPadrao);
    
    // Verificar se foram criados
    const verificacao = await FaturaStatus.findAll({ raw: true });
    console.log("Status de fatura após criação:");
    console.table(verificacao);
    
    if (verificacao.length > 0) {
      console.log("✅ Status de fatura inicializados com sucesso!");
      return true;
    } else {
      console.error("❌ Falha ao criar status de fatura - nenhum registro encontrado após criação");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar status de fatura:", error);
    return false;
  }
};

/**
 * Inicializa os status de pagamento (se não existirem)
 */
const initPagamentoStatus = async () => {
  try {
    console.log("🔄 Inicializando status de pagamento...");
    const PagamentoStatus = db.PagamentoStatus;
    
    // Verificar se o modelo existe
    if (!PagamentoStatus) {
      console.error("❌ Modelo PagamentoStatus não encontrado!");
      return false;
    }
    
    // Verificar se já existem dados
    const count = await PagamentoStatus.count();
    console.log(`Contagem atual de PagamentoStatus: ${count}`);
    
    if (count > 0) {
      console.log(`✓ Tabela PagamentoStatus já possui ${count} registros.`);
      
      // Mostrar os registros existentes para debug
      const statusExistentes = await PagamentoStatus.findAll({ raw: true });
      console.log("Status de pagamento existentes:");
      console.table(statusExistentes);
      
      return true;
    }
    
    // Criar status padrão
    const statusPadrao = [
      { id: 1, nome: 'pendente' },
      { id: 2, nome: 'pago' },
      { id: 3, nome: 'cancelado' },
      { id: 4, nome: 'estornado' }
    ];
    
    console.log(`Tentando inserir ${statusPadrao.length} status de pagamento...`);
    
    // Usar bulkCreate para inserir todos de uma vez
    await PagamentoStatus.bulkCreate(statusPadrao);
    
    // Verificar se foram criados
    const verificacao = await PagamentoStatus.findAll({ raw: true });
    console.log("Status de pagamento após criação:");
    console.table(verificacao);
    
    if (verificacao.length > 0) {
      console.log("✅ Status de pagamento inicializados com sucesso!");
      return true;
    } else {
      console.error("❌ Falha ao criar status de pagamento - nenhum registro encontrado após criação");
      return false;
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar status de pagamento:", error);
    return false;
  }
};

// Exporta as funções
module.exports = {
  initializeBasicData,
  initTipoUtilizador,
  initConsultaStatus,
  initFaturaStatus,
  initDisponibilidadeStatus,
  initPagamentoStatus
}; 