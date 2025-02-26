const db = require('../models');
const Agendamento = db.Agendamento;
const Cliente = db.Cliente;
const User = db.User;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Criar e salvar um novo agendamento
exports.create = async (req, res) => {
  try {
    // Obter o token do cabeçalho
    const token = req.headers['x-access-token'] || req.headers.authorization;
    
    let tokenValue = token;
    if (tokenValue && tokenValue.startsWith('Bearer ')) {
      tokenValue = tokenValue.slice(7, tokenValue.length);
    }

    if (!tokenValue) {
      return res.status(403).json({ message: "Nenhum token fornecido!" });
    }
    
    // Verificar o token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    // Buscar o usuário
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    
    // Buscar o cliente pelo email
    const cliente = await Cliente.findOne({
      where: { email: user.email }
    });
    
    if (!cliente) {
      return res.status(404).json({ message: "Perfil de cliente não encontrado!" });
    }

    // Validar requisição
    if (!req.body.dataHora || !req.body.servico) {
      return res.status(400).json({
        message: "Data/hora e serviço são obrigatórios!"
      });
    }

    // Criar um agendamento
    const agendamento = {
      dataHora: req.body.dataHora,
      servico: req.body.servico,
      observacoes: req.body.observacoes,
      estado: 'Pendente', // Forçar o estado como Pendente
      clienteId: cliente.id
    };

    console.log('Criando agendamento:', agendamento);

    // Salvar o agendamento no banco de dados
    const data = await Agendamento.create(agendamento);
    
    // Atualizar o histórico do cliente
    const historicoAtual = cliente.historico || [];
    const novoHistorico = [...historicoAtual, {
      data: new Date().toISOString(),
      tipo: 'Agendamento',
      descricao: `Agendamento de ${req.body.servico} para ${new Date(req.body.dataHora).toLocaleString('pt-PT')}`
    }];
    
    await Cliente.update(
      { historico: novoHistorico },
      { where: { id: cliente.id } }
    );
    
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao criar o agendamento."
    });
  }
};

// Buscar todos os agendamentos
exports.findAll = async (req, res) => {
  try {
    const data = await Agendamento.findAll({
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar os agendamentos."
    });
  }
};

// Buscar os agendamentos do cliente autenticado
exports.findByClienteAutenticado = async (req, res) => {
  try {
    // Obter o token do cabeçalho
    const token = req.headers['x-access-token'] || req.headers.authorization;
    
    let tokenValue = token;
    if (tokenValue && tokenValue.startsWith('Bearer ')) {
      tokenValue = tokenValue.slice(7, tokenValue.length);
    }

    if (!tokenValue) {
      return res.status(403).json({ message: "Nenhum token fornecido!" });
    }
    
    // Verificar o token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    // Buscar o usuário
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    
    // Buscar o cliente pelo email
    const cliente = await Cliente.findOne({
      where: { email: user.email }
    });
    
    if (!cliente) {
      return res.status(404).json({ message: "Perfil de cliente não encontrado!" });
    }

    const data = await Agendamento.findAll({
      where: { clienteId: cliente.id },
      order: [['dataHora', 'DESC']]
    });
    
    console.log('Agendamentos encontrados:', data.length, data.map(a => ({ id: a.id, estado: a.estado, servico: a.servico })));
    
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar os agendamentos."
    });
  }
};

// Buscar os agendamentos de um cliente específico
exports.findByCliente = async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const data = await Agendamento.findAll({
      where: { clienteId: clienteId },
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Erro ao buscar agendamentos do cliente com id=${clienteId}.`
    });
  }
};

// Buscar agendamentos por data
exports.findByData = async (req, res) => {
  const data = req.params.data;

  try {
    const agendamentos = await Agendamento.findAll({
      where: { data: data },
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    res.status(200).json(agendamentos);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Erro ao buscar agendamentos da data ${data}.`
    });
  }
};

// Buscar um único agendamento pelo id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Agendamento.findByPk(id, {
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `Agendamento com id=${id} não encontrado.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao buscar agendamento com id=${id}`
    });
  }
};

// Atualizar um agendamento pelo id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Agendamento.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Agendamento atualizado com sucesso."
      });
    } else {
      res.status(404).json({
        message: `Não foi possível atualizar o agendamento com id=${id}. Agendamento não encontrado ou corpo da requisição vazio!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao atualizar agendamento com id=${id}`
    });
  }
};

// Cancelar um agendamento pelo id
exports.cancelar = async (req, res) => {
  const id = req.params.id;

  try {
    // Verificar se o agendamento existe
    const agendamento = await Agendamento.findByPk(id);
    
    if (!agendamento) {
      return res.status(404).json({
        message: `Agendamento com id=${id} não encontrado.`
      });
    }
    
    // Verificar se o cliente que está cancelando é o dono do agendamento
    const token = req.headers['x-access-token'] || req.headers.authorization;
    
    let tokenValue = token;
    if (tokenValue && tokenValue.startsWith('Bearer ')) {
      tokenValue = tokenValue.slice(7, tokenValue.length);
    }

    if (!tokenValue) {
      return res.status(403).json({ message: "Nenhum token fornecido!" });
    }
    
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const user = await User.findByPk(userId);
    const cliente = await Cliente.findOne({
      where: { email: user.email }
    });
    
    if (cliente.id !== agendamento.clienteId) {
      return res.status(403).json({
        message: "Você não tem permissão para cancelar este agendamento."
      });
    }
    
    // Atualizar o estado do agendamento para cancelado
    await Agendamento.update(
      { estado: 'Cancelado' },
      { where: { id: id } }
    );
    
    // Atualizar o histórico do cliente
    const historicoAtual = cliente.historico || [];
    const novoHistorico = [...historicoAtual, {
      data: new Date().toISOString(),
      tipo: 'Cancelamento',
      descricao: `Cancelamento de agendamento de ${agendamento.servico} que estava marcado para ${new Date(agendamento.dataHora).toLocaleString('pt-PT')}`
    }];
    
    await Cliente.update(
      { historico: novoHistorico },
      { where: { id: cliente.id } }
    );
    
    res.status(200).json({
      message: "Agendamento cancelado com sucesso."
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || `Erro ao cancelar agendamento com id=${id}`
    });
  }
};

// Deletar um agendamento pelo id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Agendamento.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Agendamento excluído com sucesso!"
      });
    } else {
      res.status(404).json({
        message: `Não foi possível excluir o agendamento com id=${id}. Agendamento não encontrado!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao excluir agendamento com id=${id}`
    });
  }
};

// Solicitar agendamento (rota pública)
exports.solicitarAgendamento = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome || !req.body.email || !req.body.telefone || !req.body.servico || !req.body.dataPreferida || !req.body.horaPreferida) {
      return res.status(400).json({
        message: "Todos os campos obrigatórios devem ser preenchidos!"
      });
    }

    // Verificar se já existe um cliente com este email
    let cliente = await Cliente.findOne({
      where: { email: req.body.email }
    });

    // Se não existir, criar um novo cliente
    if (!cliente) {
      cliente = await Cliente.create({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        historico: [{
          data: new Date(),
          acao: 'Solicitação de Agendamento',
          detalhes: `Serviço: ${req.body.servico}, Data preferida: ${req.body.dataPreferida}, Horário: ${req.body.horaPreferida}`
        }]
      });
    } else {
      // Atualizar histórico do cliente existente
      const historicoAtual = cliente.historico || [];
      await cliente.update({
        historico: [
          ...historicoAtual,
          {
            data: new Date(),
            acao: 'Solicitação de Agendamento',
            detalhes: `Serviço: ${req.body.servico}, Data preferida: ${req.body.dataPreferida}, Horário: ${req.body.horaPreferida}`
          }
        ]
      });
    }

    // Enviar email para a clínica (simulado aqui)
    // Em produção, configurar o nodemailer corretamente
    /*
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'clinica@example.com',
      subject: 'Nova Solicitação de Agendamento',
      html: `
        <h2>Nova Solicitação de Agendamento</h2>
        <p><strong>Nome:</strong> ${req.body.nome}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Telefone:</strong> ${req.body.telefone}</p>
        <p><strong>Serviço:</strong> ${req.body.servico}</p>
        <p><strong>Data Preferida:</strong> ${req.body.dataPreferida}</p>
        <p><strong>Horário Preferido:</strong> ${req.body.horaPreferida}</p>
        <p><strong>Mensagem:</strong> ${req.body.mensagem || 'Nenhuma mensagem adicional'}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    */

    res.status(201).json({
      message: "Solicitação de agendamento recebida com sucesso! Entraremos em contato em breve."
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao processar a solicitação de agendamento."
    });
  }
};
