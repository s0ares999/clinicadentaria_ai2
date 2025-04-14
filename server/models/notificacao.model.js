module.exports = (sequelize, DataTypes) => {
  const Notificacao = sequelize.define("Notificacao", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    data_envio: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Notificacoes',
    timestamps: true
  });

  Notificacao.associate = (models) => {
    Notificacao.belongsTo(models.Utilizador, {
      foreignKey: 'utilizador_id',
      as: 'utilizador',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    
    Notificacao.belongsTo(models.NotificacaoStatus, {
      foreignKey: 'status_id',
      as: 'status',
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  };

  return Notificacao;
}; 