module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("cliente", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    utilizador_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    nome: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    telefone: {
      type: Sequelize.STRING
    },
    dataNascimento: {
      type: Sequelize.DATEONLY,
      field: 'data_nascimento'
    },
    morada: {
      type: Sequelize.STRING
    },
    nif: {
      type: Sequelize.STRING
    },
    historico: {
      type: Sequelize.TEXT
    },
    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'clientes',
    timestamps: true
  });

  Cliente.associate = function(models) {
    if (models.Utilizador) {
      Cliente.belongsTo(models.Utilizador, {
        foreignKey: 'utilizador_id',
        as: 'utilizador'
      });
    }
    
    if (models.Consulta) {
      Cliente.hasMany(models.Consulta, {
        foreignKey: 'cliente_id',
        as: 'consultas'
      });
    }
    
    if (models.Pagamento) {
      Cliente.hasMany(models.Pagamento, {
        foreignKey: 'cliente_id',
        as: 'pagamentos'
      });
    }
  };

  return Cliente;
};
