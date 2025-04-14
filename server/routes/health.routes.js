const express = require("express");
const router = express.Router();
const dbInit = require('../config/db.init');
const db = require('../models');

// Rota para verificar o estado da API
router.get("/", (req, res) => {
  res.status(200).json({
    message: 'API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota para inicializar dados do banco de dados
router.post('/init-db', async (req, res) => {
  try {
    console.log("🔄 Inicializando dados do banco de dados...");
    const result = await dbInit.initializeBasicData();
    
    res.status(200).json({
      success: result,
      message: result 
        ? 'Dados do banco de dados inicializados com sucesso!' 
        : 'Erro ao inicializar dados do banco de dados. Veja os logs para mais detalhes.'
    });
  } catch (error) {
    console.error("❌ Erro ao inicializar dados do banco de dados:", error);
    res.status(500).json({
      success: false,
      message: 'Erro ao inicializar dados do banco de dados.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Rota para verificar os dados iniciais
router.get("/check-data", async (req, res) => {
    try {
        const result = {
            status: "OK",
            timestamp: new Date().toISOString(),
            message: "Verificação de dados iniciais",
            dados: {}
        };

        // Verificar TipoUtilizador
        if (db.TipoUtilizador) {
            const tiposUtilizador = await db.TipoUtilizador.findAll();
            result.dados.tiposUtilizador = {
                count: tiposUtilizador.length,
                items: tiposUtilizador.map(tipo => ({ id: tipo.id, nome: tipo.nome }))
            };
        } else {
            result.dados.tiposUtilizador = { error: "Modelo não encontrado" };
        }

        // Verificar ConsultaStatus
        if (db.ConsultaStatus) {
            const consultaStatus = await db.ConsultaStatus.findAll();
            result.dados.consultaStatus = {
                count: consultaStatus.length,
                items: consultaStatus.map(status => ({ id: status.id, nome: status.nome }))
            };
        } else {
            result.dados.consultaStatus = { error: "Modelo não encontrado" };
        }

        // Verificar DisponibilidadeStatus
        if (db.DisponibilidadeStatus) {
            const disponibilidadeStatus = await db.DisponibilidadeStatus.findAll();
            result.dados.disponibilidadeStatus = {
                count: disponibilidadeStatus.length,
                items: disponibilidadeStatus.map(status => ({ id: status.id, nome: status.nome }))
            };
        } else {
            result.dados.disponibilidadeStatus = { error: "Modelo não encontrado" };
        }

        // Verificar FaturaStatus
        if (db.FaturaStatus) {
            const faturaStatus = await db.FaturaStatus.findAll();
            result.dados.faturaStatus = {
                count: faturaStatus.length,
                items: faturaStatus.map(status => ({ id: status.id, nome: status.nome }))
            };
        } else {
            result.dados.faturaStatus = { error: "Modelo não encontrado" };
        }

        // Verificar PagamentoStatus
        if (db.PagamentoStatus) {
            const pagamentoStatus = await db.PagamentoStatus.findAll();
            result.dados.pagamentoStatus = {
                count: pagamentoStatus.length,
                items: pagamentoStatus.map(status => ({ id: status.id, nome: status.nome }))
            };
        } else {
            result.dados.pagamentoStatus = { error: "Modelo não encontrado" };
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Erro ao verificar dados iniciais:", error);
        res.status(500).json({
            status: "ERROR",
            message: "Erro ao verificar dados iniciais",
            error: error.message
        });
    }
});

// Rota para forçar a inicialização de DisponibilidadeStatus
router.post('/init-disponibilidade-status', async (req, res) => {
  try {
    console.log("🔄 Forçando inicialização de DisponibilidadeStatus...");
    
    // Log dos modelos disponíveis para debug
    console.log("Modelos disponíveis:", Object.keys(db));
    console.log("DisponibilidadeStatus existe?", !!db.DisponibilidadeStatus);
    
    // Tentativa de criar status de disponibilidade sem depender da função dbInit
    if (db.DisponibilidadeStatus) {
      // Verificar se já existem dados
      const count = await db.DisponibilidadeStatus.count();
      console.log(`Contagem de registros em DisponibilidadeStatus: ${count}`);
      
      if (count === 0) {
        // Criar status padrão
        const statusPadrao = [
          { id: 1, nome: 'Disponível', descricao: 'Horário disponível para agendamento' },
          { id: 2, nome: 'Ocupado', descricao: 'Horário ocupado (não disponível)' },
          { id: 3, nome: 'Reservado', descricao: 'Horário temporariamente reservado, aguardando confirmação' }
        ];
        
        for (const status of statusPadrao) {
          await db.DisponibilidadeStatus.create(status);
          console.log(`Status de disponibilidade criado: ${status.nome} (ID: ${status.id})`);
        }
        
        // Verificar se foram criados
        const statusCriados = await db.DisponibilidadeStatus.findAll({ raw: true });
        console.log("Status criados:", statusCriados);
        
        res.status(200).json({
          success: true,
          message: 'Status de disponibilidade criados com sucesso!',
          data: statusCriados
        });
      } else {
        const statusExistentes = await db.DisponibilidadeStatus.findAll({ raw: true });
        res.status(200).json({
          success: true,
          message: `Já existem ${count} status de disponibilidade.`,
          data: statusExistentes
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Modelo DisponibilidadeStatus não encontrado'
      });
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar DisponibilidadeStatus:", error);
    res.status(500).json({
      success: false,
      message: 'Erro ao inicializar DisponibilidadeStatus',
      error: error.message,
      stack: error.stack
    });
  }
});

// Rota para forçar a inicialização de PagamentoStatus
router.post('/init-pagamento-status', async (req, res) => {
  try {
    console.log("🔄 Forçando inicialização de PagamentoStatus...");
    
    // Log dos modelos disponíveis para debug
    console.log("Modelos disponíveis:", Object.keys(db));
    console.log("PagamentoStatus existe?", !!db.PagamentoStatus);
    
    // Tentativa de criar status de pagamento sem depender da função dbInit
    if (db.PagamentoStatus) {
      // Verificar se já existem dados
      const count = await db.PagamentoStatus.count();
      console.log(`Contagem de registros em PagamentoStatus: ${count}`);
      
      if (count === 0) {
        // Criar status padrão
        const statusPadrao = [
          { id: 1, nome: 'Pendente', descricao: 'Pagamento pendente de processamento' },
          { id: 2, nome: 'Pago', descricao: 'Pagamento realizado com sucesso' },
          { id: 3, nome: 'Cancelado', descricao: 'Pagamento cancelado' },
          { id: 4, nome: 'Recusado', descricao: 'Pagamento recusado pela operadora' }
        ];
        
        for (const status of statusPadrao) {
          await db.PagamentoStatus.create(status);
          console.log(`Status de pagamento criado: ${status.nome} (ID: ${status.id})`);
        }
        
        // Verificar se foram criados
        const statusCriados = await db.PagamentoStatus.findAll({ raw: true });
        console.log("Status criados:", statusCriados);
        
        res.status(200).json({
          success: true,
          message: 'Status de pagamento criados com sucesso!',
          data: statusCriados
        });
      } else {
        const statusExistentes = await db.PagamentoStatus.findAll({ raw: true });
        res.status(200).json({
          success: true,
          message: `Já existem ${count} status de pagamento.`,
          data: statusExistentes
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Modelo PagamentoStatus não encontrado'
      });
    }
  } catch (error) {
    console.error("❌ Erro ao inicializar PagamentoStatus:", error);
    res.status(500).json({
      success: false,
      message: 'Erro ao inicializar PagamentoStatus',
      error: error.message,
      stack: error.stack
    });
  }
});

// Rota para verificar nomes dos modelos disponíveis
router.get('/models', (req, res) => {
  try {
    const modelNames = Object.keys(db).filter(key => 
      typeof db[key] === 'function' || 
      (db[key] && typeof db[key].findAll === 'function')
    );
    
    res.status(200).json({
      success: true,
      modelNames,
      allKeys: Object.keys(db)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao obter nomes dos modelos',
      error: error.message
    });
  }
});

module.exports = router; 