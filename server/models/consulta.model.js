module.exports = (sequelize, Sequelize) => {
  const Consulta = sequelize.define("Consulta", {
    utilizador_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Utilizadores',
        key: 'id'
      }
    },
    data_hora: {
      type: Sequelize.DATE,
      allowNull: false
    },
    observacoes: {
      type: Sequelize.TEXT
    },
    status_id: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    tem_fatura: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
      foreignKey: 'utilizador_id',
      as: 'utilizador'
    });
    
    Consulta.belongsTo(models.ConsultaStatus, {
      foreignKey: 'status_id',
      as: 'status'
    });
    
    if (models.Pagamento) {
      Consulta.hasOne(models.Pagamento, {
        foreignKey: 'consulta_id',
        as: 'pagamento'
      });
    }
    
    if (models.Fatura) {
      Consulta.hasOne(models.Fatura, {
        foreignKey: 'consulta_id',
        as: 'fatura'
      });
    }
  };

  return Consulta;
}; 