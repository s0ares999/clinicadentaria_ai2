module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primeiro verificar se a coluna já existe
    const tableInfo = await queryInterface.describeTable('Clientes');
    
    if (!tableInfo.id) {
      // Adicionar coluna ID
      await queryInterface.addColumn('Clientes', 'id', {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      });
      
      // Definir utilizador_id como chave única, não primária
      await queryInterface.changeColumn('Clientes', 'utilizador_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'Utilizadores',
          key: 'id'
        }
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clientes', 'id');
  }
}; 