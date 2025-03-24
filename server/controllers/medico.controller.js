exports.updatePerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { utilizador: utilizadorData, medico: medicoData } = req.body;

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