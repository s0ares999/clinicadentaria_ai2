module.exports = (sequelize, DataTypes) => {
  const Consulta = sequelize.define("Consulta", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medico_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duracao: {
      type: DataTypes.INTEGER,
      defaultValue: 30 // em minutos
    },
    estado: {
      type: DataTypes.STRING(20),
      defaultValue: 'agendada'
    },
    observacoes: {
      type: DataTypes.TEXT
    },
    tratamento_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'Consultas',
    timestamps: true,
    indexes: [
      {
        name: 'idx_consultas_data',
        fields: ['data_hora']
      }
    ]
  });

  Consulta.associate = function(models) {
    Consulta.belongsTo(models.Utilizador, {
      foreignKey: 'cliente_id',
      as: 'cliente'
    });
    
    Consulta.belongsTo(models.Utilizador, {
      foreignKey: 'medico_id',
      as: 'medico'
    });
    
    if (models.Tratamento) {
      Consulta.belongsTo(models.Tratamento, {
        foreignKey: 'tratamento_id',
        as: 'tratamento'
      });
    }
    
    if (models.Pagamento) {
      Consulta.hasOne(models.Pagamento, {
        foreignKey: 'consulta_id',
        as: 'pagamento'
      });
    }
  };

  return Consulta;
}; 