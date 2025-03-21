module.exports = (sequelize, DataTypes) => {
  const Disponibilidade = sequelize.define("Disponibilidade", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    medico_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fim: {
      type: DataTypes.TIME,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Disponibilidade',
    timestamps: true
  });

  Disponibilidade.associate = (models) => {
    Disponibilidade.belongsTo(models.Utilizador, {
      foreignKey: 'medico_id',
      as: 'medico'
    });
    
    Disponibilidade.belongsTo(models.DisponibilidadeStatus, {
      foreignKey: 'status_id',
      as: 'status'
    });
  };

  return Disponibilidade;
}; 