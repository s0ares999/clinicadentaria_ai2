module.exports = (sequelize, DataTypes) => {
  const FaturaServico = sequelize.define("FaturaServico", {
    fatura_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Faturas',
        key: 'id'
      }
    },
    servico_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Servicos',
        key: 'id'
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'Preço do serviço no momento da fatura'
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: 'quantidade * preco_unitario'
    }
  }, {
    tableName: 'FaturaServico',
    timestamps: false,
    hooks: {
      beforeCreate: (faturaServico) => {
        faturaServico.subtotal = faturaServico.quantidade * faturaServico.preco_unitario;
      },
      beforeUpdate: (faturaServico) => {
        faturaServico.subtotal = faturaServico.quantidade * faturaServico.preco_unitario;
      }
    }
  });

  FaturaServico.associate = (models) => {
    FaturaServico.belongsTo(models.Fatura, { foreignKey: 'fatura_id', as: 'fatura' });
    FaturaServico.belongsTo(models.Servico, { foreignKey: 'servico_id', as: 'servico' });
  };

  return FaturaServico;
};
