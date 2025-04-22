module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define("Fatura", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    consulta_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    observacoes: {
      type: DataTypes.TEXT
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'Faturas',
    timestamps: true
  });

  Fatura.associate = (models) => {
    Fatura.belongsTo(models.FaturaStatus, {
      foreignKey: 'status_id',
      as: 'status',
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
    
    Fatura.belongsTo(models.Consulta, {
      foreignKey: 'consulta_id',
      as: 'consulta',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
