const { Fatura } = require('../models');

const criarFatura = async (req, res) => {
  try {
    const { consulta_id, valor_total, observacoes, status_id } = req.body;

    if (!consulta_id || !valor_total) {
      return res.status(400).json({ error: 'consulta_id e valor_total são obrigatórios' });
    }

    const novaFatura = await Fatura.create({
      consulta_id,
      valor_total,
      observacoes,
      status_id: status_id || 1
    });

    return res.status(201).json(novaFatura);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = { criarFatura };
