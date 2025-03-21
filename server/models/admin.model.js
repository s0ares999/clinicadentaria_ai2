module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    utilizador_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nivel_acesso: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'geral'
    }
  }, {
    tableName: 'Admins',
    timestamps: false
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.Utilizador, {
      foreignKey: 'utilizador_id',
      as: 'utilizador'
    });
  };

  return Admin;
}; 