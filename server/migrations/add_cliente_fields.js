module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Clientes', 'morada', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('Clientes', 'nif', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Clientes', 'morada');
    await queryInterface.removeColumn('Clientes', 'nif');
  }
}; 