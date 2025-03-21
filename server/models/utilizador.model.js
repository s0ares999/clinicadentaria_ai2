module.exports = (sequelize, Sequelize) => {
  const Utilizador = sequelize.define("utilizador", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telefone: {
      type: Sequelize.STRING
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
    tableName: 'utilizadores',
    timestamps: true
  });

  // Método de associação para ser chamado após todos os modelos serem definidos
  Utilizador.associate = function(models) {
    // Corrigir: Verificar se os modelos existem antes de criar associações
    
    // Associação com TipoUtilizador
    if (models.TipoUtilizador) {
      Utilizador.belongsTo(models.TipoUtilizador, {
        foreignKey: 'tipo_utilizador_id',
        as: 'tipoUtilizador'
      });
    }
    
    // Associação com Cliente
    if (models.Cliente) {
      Utilizador.hasOne(models.Cliente, {
        foreignKey: 'utilizador_id',
        as: 'cliente'
      });
    }
    
    // Associação com Medico
    if (models.Medico) {
      Utilizador.hasOne(models.Medico, {
        foreignKey: 'utilizador_id',
        as: 'medico'
      });
    }
    
    // Associação com Admin
    if (models.Admin) {
      Utilizador.hasOne(models.Admin, {
        foreignKey: 'utilizador_id',
        as: 'admin'
      });
    }
    
    // Associação com Notificacao
    if (models.Notificacao) {
      Utilizador.hasMany(models.Notificacao, {
        foreignKey: 'utilizador_id',
        as: 'notificacoes'
      });
    }
  };

  return Utilizador;
}; 