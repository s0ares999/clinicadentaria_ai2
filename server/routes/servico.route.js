const express = require('express');
const router = express.Router();
const db = require('../models');
const Servico = db.Servico;

// Listar todos os serviços ativos
router.get('/', async (req, res) => {
  try {
    const servicos = await Servico.findAll({
      where: { ativo: true },
      order: [['nome', 'ASC']]
    });
    
    res.json({
      success: true,
      data: servicos
    });
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Buscar serviço por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const servico = await Servico.findByPk(id);
    
    if (!servico) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado'
      });
    }
    
    res.json({
      success: true,
      data: servico
    });
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Criar novo serviço
router.post('/', async (req, res) => {
  try {
    const { nome, descricao, preco, ativo = true } = req.body;
    
    // Validações básicas
    if (!nome || !preco) {
      return res.status(400).json({
        success: false,
        message: 'Nome e preço são obrigatórios'
      });
    }
    
    if (preco <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Preço deve ser maior que zero'
      });
    }
    
    const novoServico = await Servico.create({
      nome,
      descricao,
      preco: parseFloat(preco),
      ativo
    });
    
    res.status(201).json({
      success: true,
      message: 'Serviço criado com sucesso',
      data: novoServico
    });
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Já existe um serviço com este nome'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Atualizar serviço
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, ativo } = req.body;
    
    const servico = await Servico.findByPk(id);
    
    if (!servico) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado'
      });
    }
    
    // Validação do preço se fornecido
    if (preco !== undefined && preco <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Preço deve ser maior que zero'
      });
    }
    
    await servico.update({
      nome: nome || servico.nome,
      descricao: descricao !== undefined ? descricao : servico.descricao,
      preco: preco !== undefined ? parseFloat(preco) : servico.preco,
      ativo: ativo !== undefined ? ativo : servico.ativo
    });
    
    res.json({
      success: true,
      message: 'Serviço atualizado com sucesso',
      data: servico
    });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'Já existe um serviço com este nome'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Desativar serviço (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const servico = await Servico.findByPk(id);
    
    if (!servico) {
      return res.status(404).json({
        success: false,
        message: 'Serviço não encontrado'
      });
    }
    
    await servico.update({ ativo: false });
    
    res.json({
      success: true,
      message: 'Serviço desativado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao desativar serviço:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Listar serviços mais utilizados
router.get('/estatisticas/mais-utilizados', async (req, res) => {
  try {
    const servicosMaisUtilizados = await db.sequelize.query(`
      SELECT 
        s.id,
        s.nome,
        s.preco,
        COUNT(fs.servico_id) as total_utilizacoes,
        SUM(fs.subtotal) as receita_total
      FROM "Servicos" s
      LEFT JOIN "FaturaServico" fs ON s.id = fs.servico_id
      WHERE s.ativo = true
      GROUP BY s.id, s.nome, s.preco
      ORDER BY total_utilizacoes DESC, receita_total DESC
      LIMIT 10
    `, {
      type: db.Sequelize.QueryTypes.SELECT
    });
    
    res.json({
      success: true,
      data: servicosMaisUtilizados
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas de serviços:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

module.exports = router;