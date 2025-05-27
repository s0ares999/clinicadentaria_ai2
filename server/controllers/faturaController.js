const { Fatura, FaturaServico, Servico, Consulta } = require('../models');
const { Op } = require('sequelize');

class FaturaController {
  async criar(req, res) {
    const transaction = await Fatura.sequelize.transaction();

    try {
      const { consulta_id, observacoes, servicos, status_id } = req.body;

      if (!consulta_id || !servicos || !Array.isArray(servicos) || servicos.length === 0) {
        return res.status(400).json({ erro: 'Dados inválidos para criação da fatura' });
      }

      const consulta = await Consulta.findByPk(consulta_id);
      if (!consulta) {
        await transaction.rollback();
        return res.status(404).json({ erro: 'Consulta não encontrada' });
      }

      const faturaExistente = await Fatura.findOne({ where: { consulta_id } });
      if (faturaExistente) {
        await transaction.rollback();
        return res.status(400).json({ erro: 'Já existe uma fatura para esta consulta' });
      }

      const servicosIds = servicos.map(s => s.servico_id);
      const servicosValidos = await Servico.findAll({
        where: { id: { [Op.in]: servicosIds }, ativo: true }
      });

      if (servicosValidos.length !== servicosIds.length) {
        await transaction.rollback();
        return res.status(400).json({ erro: 'Serviços inválidos ou inativos' });
      }

      const novaFatura = await Fatura.create({
        consulta_id,
        observacoes,
        status_id: status_id || 1
      }, { transaction });

      const faturaServicos = [];
      for (const s of servicos) {
        const servico = servicosValidos.find(x => x.id === s.servico_id);
        if (!servico) continue;

        const quantidade = s.quantidade || 1;
        const preco = s.preco_unitario || servico.preco;
        if (quantidade <= 0 || preco <= 0) {
          throw new Error(`Quantidade e preço devem ser maiores que zero`);
        }

        const subtotal = quantidade * preco;

        const item = await FaturaServico.create({
          fatura_id: novaFatura.id,
          servico_id: servico.id,
          quantidade,
          preco_unitario: preco,
          subtotal
        }, { transaction });

        faturaServicos.push(item);
      }

      const total = faturaServicos.reduce((sum, i) => sum + parseFloat(i.subtotal), 0);
      novaFatura.valor_total = total;
      await novaFatura.save({ transaction });

      await transaction.commit();

      return res.status(201).json({ mensagem: 'Fatura criada com sucesso', fatura: novaFatura });

    } catch (error) {
      if (!transaction.finished) await transaction.rollback();
      console.error('Erro ao criar fatura:', error);
      return res.status(500).json({ erro: error.message });
    }
  }

  async listar(req, res) {
  try {
    const faturas = await Fatura.findAll({
      include: [
        {
          model: Consulta,
          as: 'consulta',
          include: [
            {
              model: require('../models').Utilizador,
              as: 'utilizador',
              attributes: ['id', 'nome', 'email']
            },
            {
              model: require('../models').Utilizador,
              as: 'medico',
              attributes: ['id', 'nome', 'email']
            },
            {
              model: require('../models').ConsultaStatus,
              as: 'status',
              attributes: ['id', 'nome']
            }
          ]
        },
        {
          model: require('../models').FaturaStatus,
          as: 'status',
          attributes: ['id', 'nome']
        },
        {
          model: Servico,
          as: 'servicos',
          through: {
            model: FaturaServico,
            attributes: ['quantidade', 'preco_unitario', 'subtotal']
          }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json({
      mensagem: 'Faturas listadas com sucesso',
      faturas
    });

  } catch (error) {
    console.error('Erro ao listar faturas:', error);
    return res.status(500).json({ erro: error.message });
  }
}

  async deletar(req, res) {
    const transaction = await Fatura.sequelize.transaction();

    try {
      const { id } = req.params;

      const fatura = await Fatura.findByPk(id);
      if (!fatura) {
        await transaction.rollback();
        return res.status(404).json({ erro: 'Fatura não encontrada' });
      }

      await FaturaServico.destroy({ where: { fatura_id: id }, transaction });
      await fatura.destroy({ transaction });

      await transaction.commit();

      return res.json({ mensagem: 'Fatura deletada com sucesso' });

    } catch (error) {
      if (!transaction.finished) await transaction.rollback();
      console.error('Erro ao deletar fatura:', error);
      return res.status(500).json({ erro: error.message });
    }
  }

  async listarPorUtilizador(req, res) {
  try {
    const utilizadorId = req.user?.id;

    if (!utilizadorId) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const faturas = await Fatura.findAll({
      include: [
        {
          model: Consulta,
          as: 'consulta',
          where: { utilizador_id: utilizadorId },
          include: [
            {
              model: require('../models').Utilizador,
              as: 'utilizador',
              attributes: ['id', 'nome', 'email']
            },
            {
              model: require('../models').Utilizador,
              as: 'medico',
              attributes: ['id', 'nome', 'email']
            },
            {
              model: require('../models').ConsultaStatus,
              as: 'status',
              attributes: ['id', 'nome']
            }
          ]
        },
        {
          model: require('../models').FaturaStatus,
          as: 'status',
          attributes: ['id', 'nome']
        },
        {
          model: Servico,
          as: 'servicos',
          through: {
            model: FaturaServico,
            attributes: ['quantidade', 'preco_unitario', 'subtotal']
          }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json({
      mensagem: 'Faturas do usuário listadas com sucesso',
      faturas
    });

  } catch (error) {
    console.error('Erro ao listar faturas do usuário:', error);
    return res.status(500).json({ erro: error.message });
  }
}


}



module.exports = new FaturaController();
