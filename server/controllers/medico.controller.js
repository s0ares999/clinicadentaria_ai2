const db = require('../models');
const Utilizador = db.Utilizador;
const Medico = db.Medico;
const Especialidade = db.Especialidade;

// Obter perfil do médico
exports.getPerfil = async (req, res) => {
  try {
    console.log("\n=== BUSCANDO PERFIL DO MÉDICO ===");
    const userId = req.userId; // ID do usuário autenticado
    console.log("👤 ID do utilizador:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Utilizador não autenticado"
      });
    }

    // Buscar dados do utilizador incluindo dados específicos do médico
    console.log("🔍 Buscando dados do utilizador com ID:", userId);
    const utilizador = await Utilizador.findOne({
      where: { id: userId },
      include: [
        {
          model: Medico,
          as: 'medico',
          include: [
            {
              model: Especialidade,
              as: 'especialidade'
            }
          ]
        }
      ],
      attributes: { exclude: ['senha'] }
    });

    if (!utilizador) {
      console.log("❌ Utilizador não encontrado!");
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado"
      });
    }

    console.log("✅ Utilizador encontrado:", utilizador.nome);

    // Verificar se o registro de médico existe
    if (!utilizador.medico) {
      console.log("⚠️ Registro de médico não encontrado. Criando um novo...");
      
      try {
        // Criar um registro para o médico automaticamente
        const medicoNovo = await Medico.create({
          utilizador_id: userId,
          especialidade_id: 1, // ID padrão para Odontologia Geral
          crm: 'PENDENTE'
        });
        
        console.log("✅ Novo registro de médico criado:", medicoNovo.utilizador_id);
        
        // Buscar novamente com o registro criado
        const utilizadorAtualizado = await Utilizador.findOne({
          where: { id: userId },
          include: [
            {
              model: Medico,
              as: 'medico',
              include: [
                {
                  model: Especialidade,
                  as: 'especialidade'
                }
              ]
            }
          ],
          attributes: { exclude: ['senha'] }
        });
        
        console.log("📤 Enviando resposta atualizada para o cliente");
        
        return res.status(200).json({
          success: true,
          data: utilizadorAtualizado
        });
      } catch (error) {
        console.error("❌ Erro ao criar registro de médico:", error);
        // Continuar e retornar dados mesmo sem o registro de médico
      }
    }

    console.log("📤 Enviando resposta para o cliente");
    
    res.status(200).json({
      success: true,
      data: utilizador
    });
  } catch (error) {
    console.error('❌ Erro ao buscar perfil do médico:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Erro ao buscar perfil do médico"
    });
  }
};

exports.updatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { utilizador: utilizadorData, medico: medicoData } = req.body;

    console.log('Dados recebidos para atualização:', {
      utilizador: utilizadorData,
      medico: medicoData
    });

    // Atualizar dados do utilizador
    await Utilizador.update(utilizadorData, {
      where: { id }
    });

    // Atualizar ou criar dados do médico
    const [medico] = await Medico.findOrCreate({
      where: { utilizador_id: id },
      defaults: {
        ...medicoData,
        utilizador_id: id
      }
    });

    if (medico) {
      await medico.update(medicoData);
    }

    res.status(200).json({
      success: true,
      message: "Perfil atualizado com sucesso"
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Erro ao atualizar perfil"
    });
  }
};

exports.corrigirRegistrosMedicos = async (req, res) => {
  try {
    // Buscar todos os utilizadores do tipo médico que não têm registro na tabela Medicos
    const [medicos] = await db.sequelize.query(`
      SELECT u.* 
      FROM "Utilizadores" u 
      LEFT JOIN "Medicos" m ON u.id = m.utilizador_id 
      INNER JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id 
      WHERE t.nome = 'medico' AND m.utilizador_id IS NULL
    `);

    console.log(`Encontrados ${medicos.length} médicos sem registro`);

    // Criar registros na tabela Medicos apenas com as colunas necessárias
    for (const medico of medicos) {
      await db.Medico.create({
        utilizador_id: medico.id,
        especialidade_id: 1, // ID padrão da especialidade
        crm: 'PENDENTE'
      });
    }

    res.status(200).json({
      success: true,
      message: `${medicos.length} registros de médicos foram corrigidos`
    });
  } catch (error) {
    console.error('Erro ao corrigir registros:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 