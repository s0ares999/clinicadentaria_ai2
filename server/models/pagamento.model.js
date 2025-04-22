module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define("Pagamento", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    consulta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'Pagamentos',
    timestamps: true
  });

  Pagamento.associate = (models) => {
    Pagamento.belongsTo(models.Consulta, {
      foreignKey: 'consulta_id',
      as: 'consulta'
    });
    
    Pagamento.belongsTo(models.PagamentoStatus, {
      foreignKey: 'status_id',
      as: 'status',
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
    
    Pagamento.belongsToMany(models.Fatura, {
      through: models.FaturaPagamento,
      foreignKey: 'pagamento_id',
      otherKey: 'fatura_id',
      as: 'faturas'
    });
  };

  return Pagamento;
}; 