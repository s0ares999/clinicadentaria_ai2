module.exports = (sequelize, DataTypes) => {
  const FaturaPagamento = sequelize.define("FaturaPagamento", {
    fatura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    pagamento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'FaturaPagamento',
    timestamps: false
  });

  return FaturaPagamento;
}; 