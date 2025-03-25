module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define("Fatura", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    consulta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Consultas',
        key: 'id'
      }
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
    
    Fatura.belongsTo(models.Consulta, {
      foreignKey: 'consulta_id',
      as: 'consulta'
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
