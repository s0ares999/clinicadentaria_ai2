'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Buscar todos os utilizadores do tipo médico que não têm registro na tabela Medicos
      const [medicos] = await queryInterface.sequelize.query(`
        SELECT u.* 
        FROM "Utilizadores" u 
        LEFT JOIN "Medicos" m ON u.id = m.utilizador_id 
        INNER JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id 
        WHERE t.nome = 'medico' AND m.id IS NULL
      `);

      // Criar registros na tabela Medicos para cada médico encontrado
      for (const medico of medicos) {
        await queryInterface.sequelize.query(`
          INSERT INTO "Medicos" (
            utilizador_id, 
            especialidade_id, 
            crm, 
            created_at, 
            updated_at
          ) VALUES (
            :utilizador_id,
            1,
            'PENDENTE',
            NOW(),
            NOW()
          )
        `, {
          replacements: {
            utilizador_id: medico.id
          }
        });
      }
    } catch (error) {
      console.error('Erro na migração:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Não é necessário desfazer esta migração
  }
}; 