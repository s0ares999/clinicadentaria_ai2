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
      allowNull: true, // <- Agora pode ser nulo, será calculado depois
      comment: 'Valor total calculado automaticamente baseado nos serviços'
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
    timestamps: true,
    hooks: {
      afterCreate: async (fatura, options) => {
        await fatura.calcularValorTotal();
      }
    }
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

    Fatura.belongsToMany(models.Servico, {
      through: models.FaturaServico,
      foreignKey: 'fatura_id',
      otherKey: 'servico_id',
      as: 'servicos'
    });
  };

  Fatura.prototype.calcularValorTotal = async function () {
    const faturaServicos = await this.sequelize.models.FaturaServico.findAll({
      where: { fatura_id: this.id }
    });

    const total = faturaServicos.reduce((sum, item) => {
      return sum + parseFloat(item.subtotal); // Para precisão, considere usar Decimal.js aqui
    }, 0);

    this.valor_total = total;
    await this.save();

    return total;
  };

  return Fatura;
};
