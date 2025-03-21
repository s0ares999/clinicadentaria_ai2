module.exports = (sequelize, DataTypes) => {
  const Medico = sequelize.define("Medico", {
    utilizador_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    especialidade_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    crm: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Medicos',
    timestamps: false
  });

  Medico.associate = (models) => {
    Medico.belongsTo(models.Utilizador, {
      foreignKey: 'utilizador_id',
      as: 'utilizador'
    });
    
    Medico.belongsTo(models.Especialidade, {
      foreignKey: 'especialidade_id',
      as: 'especialidade'
    });
  };

  return Medico;
}; 