module.exports = (sequelize, DataTypes) => {
  const NotificacaoStatus = sequelize.define("NotificacaoStatus", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'NotificacaoStatus',
    timestamps: false
  });

  NotificacaoStatus.associate = (models) => {
    NotificacaoStatus.hasMany(models.Notificacao, {
      foreignKey: 'status_id',
      as: 'notificacoes'
    });
  };

  return NotificacaoStatus;
}; 