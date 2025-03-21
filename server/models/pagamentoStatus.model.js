module.exports = (sequelize, DataTypes) => {
  const PagamentoStatus = sequelize.define("PagamentoStatus", {
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
    tableName: 'PagamentoStatus',
    timestamps: false
  });

  PagamentoStatus.associate = (models) => {
    PagamentoStatus.hasMany(models.Pagamento, {
      foreignKey: 'status_id',
      as: 'pagamentos'
    });
  };

  return PagamentoStatus;
}; 