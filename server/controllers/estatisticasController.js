const db = require('../models'); // ajuste o caminho conforme seu projeto
const { Cliente, Consulta, Fatura, Disponibilidade, ConsultaStatus, Sequelize } = db;
const { Op } = Sequelize;

const getEstatisticas = async (req, res) => {
  try {
    const totalClientes = await Cliente.count();
    const totalConsultas = await Consulta.count();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const totalFaturamento = await Fatura.sum('valor_total', {
      where: {
        createdAt: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      }
    });

    // Contar total de disponibilidades no mês atual e status "livre" (status_id=1)
    const totalDisponibilidades = await Disponibilidade.count({
      where: {
        status_id: 1,
        data: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      }
    });

    // Contar consultas no mês atual
    const totalConsultasNoMes = await Consulta.count({
      where: {
        data_hora: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      }
    });

    // Calcula taxa ocupação (evita divisão por zero)
    const taxaOcupacao = totalDisponibilidades > 0
      ? Math.round((totalConsultasNoMes / totalDisponibilidades) * 100)
      : 0;

    res.json({
      totalClientes,
      totalConsultas,
      totalFaturamento: parseFloat(totalFaturamento || 0),
      taxaOcupacao
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter estatísticas.', error: err.message });
  }
};

const getEstatisticasPorStatus = async (req, res) => {
  try {
    // Busca todos os status com a contagem de consultas associadas
    const statusComContagem = await ConsultaStatus.findAll({
      attributes: [
        'id',
        'nome',
        'descricao',
        // Contagem das consultas relacionadas
        [db.Sequelize.fn('COUNT', db.Sequelize.col('consultas.id')), 'quantidadeConsultas']
      ],
      include: [{
        model: Consulta,
        as: 'consultas',
        attributes: [], // não queremos trazer dados das consultas, só contar
      }],
      group: ['ConsultaStatus.id'],
      order: [['nome', 'ASC']]
    });

    // Formata o resultado para enviar só o que interessa
    const resultado = statusComContagem.map(status => ({
      id: status.id,
      nome: status.nome,
      descricao: status.descricao,
      quantidadeConsultas: parseInt(status.get('quantidadeConsultas'), 10),
    }));

    res.json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter estatísticas por status.' });
  }
};

module.exports = {
  getEstatisticas,
  getEstatisticasPorStatus
};
