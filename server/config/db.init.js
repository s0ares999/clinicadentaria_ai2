const db = require('../models');
const Especialidade = db.Especialidade;

/**
 * Inicializa as especialidades padrão (se não existirem)
 */
const initEspecialidade = async () => {
  try {
    console.log("🔄 Inicializando especialidades...");
    const count = await Especialidade.count();
    if (count > 0) {
      console.log(`✓ Tabela Especialidade já possui ${count} registros.`);
      return true;
    }
    const especialidadesPadrao = [
      { id: 1, nome: 'Odontologia Geral', descricao: 'Cuidados odontológicos gerais e prevenção' },
      { id: 2, nome: 'Ortodontia', descricao: 'Correção da posição dos dentes e da mandíbula' },
      { id: 3, nome: 'Periodontia', descricao: 'Tratamento das gengivas e estruturas de suporte dos dentes' },
      { id: 4, nome: 'Implantodontia', descricao: 'Colocação de implantes dentários' },
      { id: 5, nome: 'Odontopediatria', descricao: 'Cuidados dentários para crianças' }
    ];
    await Especialidade.bulkCreate(especialidadesPadrao);
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar especialidades:", error);
    return false;
  }
};

/**
 * Inicializa os serviços padrão (se não existirem)
 */
const initServicos = async () => {
  try {
    console.log("🔄 Inicializando serviços...");
    const Servico = db.Servico;
    if (!Servico) {
      console.error("❌ Modelo Servico não encontrado!");
      return false;
    }
    const count = await Servico.count();
    if (count > 0) {
      console.log(`✓ Tabela Servico já possui ${count} registros.`);
      return true;
    }
    const servicosPadrao = [
      { 
        id: 1, 
        nome: 'Limpeza Dentária', 
        descricao: 'Limpeza profissional para remoção de tártaro e placa bacteriana',
        preco: 50.00,
        ativo: true
      },
      { 
        id: 2, 
        nome: 'Consulta de Rotina', 
        descricao: 'Consulta de acompanhamento e avaliação oral',
        preco: 30.00,
        ativo: true
      },
      { 
        id: 3, 
        nome: 'Tratamento de Canal', 
        descricao: 'Tratamento endodôntico para eliminação de infecções',
        preco: 200.00,
        ativo: true
      },
      { 
        id: 4, 
        nome: 'Branqueamento', 
        descricao: 'Procedimento para clarear os dentes',
        preco: 150.00,
        ativo: true
      },
      { 
        id: 5, 
        nome: 'Extração Dentária', 
        descricao: 'Remoção de dente danificado ou problemático',
        preco: 80.00,
        ativo: true
      }
    ];
    await Servico.bulkCreate(servicosPadrao);
    console.log("✅ Serviços inicializados com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar serviços:", error);
    return false;
  }
};

/**
 * Inicializar dados básicos no banco de dados (tipos, status, especialidades, etc)
 */
const initializeBasicData = async () => {
  console.log("🔄 Inicializando dados básicos...");
  
  const resultados = {
    especialidades: false,
    servicos: false,
    tipoUtilizador: false,
    consultaStatus: false,
    faturaStatus: false,
    pagamentoStatus: false
  };
  
  try {
    resultados.especialidades = await initEspecialidade();
    resultados.servicos = await initServicos();
    resultados.tipoUtilizador = await initTipoUtilizador();
    resultados.consultaStatus = await initConsultaStatus();
    resultados.faturaStatus = await initFaturaStatus();
    resultados.pagamentoStatus = await initPagamentoStatus();
    
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
    if (!TipoUtilizador) {
      console.error("❌ Modelo TipoUtilizador não encontrado!");
      return false;
    }
    const count = await TipoUtilizador.count();
    if (count > 0) {
      console.log(`✓ Tabela TipoUtilizador já possui ${count} registros.`);
      return true;
    }
    const tiposPadrao = [
      { id: 1, nome: 'cliente' },
      { id: 2, nome: 'admin' },
      { id: 3, nome: 'medico' }
    ];
    await TipoUtilizador.bulkCreate(tiposPadrao);
    return true;
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
    if (!ConsultaStatus) {
      console.error("❌ Modelo ConsultaStatus não encontrado!");
      return false;
    }
    const count = await ConsultaStatus.count();
    if (count > 0) {
      console.log(`✓ Tabela ConsultaStatus já possui ${count} registros.`);
      return true;
    }
    const statusPadrao = [
      { id: 1, nome: 'Pendente', descricao: null },
      { id: 2, nome: 'Confirmada', descricao: null },
      { id: 3, nome: 'Concluída', descricao: null },
      { id: 4, nome: 'Cancelada', descricao: null }
    ];
    await ConsultaStatus.bulkCreate(statusPadrao);
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar status de consulta:", error);
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
    if (!FaturaStatus) {
      console.error("❌ Modelo FaturaStatus não encontrado!");
      return false;
    }
    const count = await FaturaStatus.count();
    if (count > 0) {
      console.log(`✓ Tabela FaturaStatus já possui ${count} registros.`);
      return true;
    }
    const statusPadrao = [
      { id: 1, nome: 'emitida' },
      { id: 2, nome: 'paga' },
      { id: 3, nome: 'cancelada' }
    ];
    await FaturaStatus.bulkCreate(statusPadrao);
    return true;
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
    if (!PagamentoStatus) {
      console.error("❌ Modelo PagamentoStatus não encontrado!");
      return false;
    }
    const count = await PagamentoStatus.count();
    if (count > 0) {
      console.log(`✓ Tabela PagamentoStatus já possui ${count} registros.`);
      return true;
    }
    const statusPadrao = [
      { id: 1, nome: 'pendente' },
      { id: 2, nome: 'pago' },
      { id: 3, nome: 'cancelado' },
      { id: 4, nome: 'estornado' }
    ];
    await PagamentoStatus.bulkCreate(statusPadrao);
    return true;
  } catch (error) {
    console.error("❌ Erro ao inicializar status de pagamento:", error);
    return false;
  }
};

// Executa a inicialização ao importar este módulo (ou chame manualmente)
initializeBasicData().catch(err => console.error("Erro geral na inicialização:", err));

module.exports = {
  initEspecialidade,
  initServicos,
  initializeBasicData,
  initTipoUtilizador,
  initConsultaStatus,
  initFaturaStatus,
  initPagamentoStatus
};