module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define("Servico", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.TEXT
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Servicos',
    timestamps: true
  });

  Servico.associate = (models) => {
    // Associação com Fatura através de FaturaServico (many-to-many)
    Servico.belongsToMany(models.Fatura, {
      through: models.FaturaServico,
      foreignKey: 'servico_id',
      otherKey: 'fatura_id',
      as: 'faturas'
    });
  };

  return Servico;
};