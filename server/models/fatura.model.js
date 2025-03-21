module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define("Fatura", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Faturas',
    timestamps: true
  });

  Fatura.associate = (models) => {
    Fatura.belongsTo(models.FaturaStatus, {
      foreignKey: 'status_id',
      as: 'status'
    });
    
    Fatura.belongsToMany(models.Pagamento, {
      through: models.FaturaPagamento,
      foreignKey: 'fatura_id',
      otherKey: 'pagamento_id',
      as: 'pagamentos'
    });
  };

  return Fatura;
};
