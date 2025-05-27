module.exports = (sequelize, Sequelize) => {
  const Consulta = sequelize.define("Consulta", {
    utilizador_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    medico_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: 'ID do médico que aceitou a consulta'
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
      allowNull: false,
      defaultValue: 1,
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
      },
      {
        name: 'idx_consultas_status',
        fields: ['status_id']
      },
      {
        name: 'idx_consultas_medico',
        fields: ['medico_id']
      }
    ]
  });

  Consulta.associate = function(models) {
    // Associação com o utilizador (cliente)
    Consulta.belongsTo(models.Utilizador, {
      foreignKey: 'utilizador_id',
      as: 'utilizador'
    });

    // Associação com o médico
    Consulta.belongsTo(models.Utilizador, {
      foreignKey: 'medico_id',
      as: 'medico'
    });
    
    Consulta.belongsTo(models.ConsultaStatus, {
      foreignKey: 'status_id',
      as: 'status',
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
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