module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define("Fatura", {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendente', 'paga', 'cancelada'),
      defaultValue: 'pendente'
    },
    descricao: {
      type: DataTypes.TEXT
    }
  });

  Fatura.associate = (models) => {
    Fatura.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      as: 'cliente'
    });
  };

  return Fatura;
};
