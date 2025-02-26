module.exports = (sequelize, DataTypes) => {
  const Agendamento = sequelize.define("Agendamento", {
    dataHora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    servico: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('Pendente', 'Confirmado', 'Concluído', 'Cancelado'),
      defaultValue: 'Pendente'
    },
    observacoes: {
      type: DataTypes.TEXT
    },
    dentista: {
      type: DataTypes.STRING
    }
  });

  Agendamento.associate = (models) => {
    Agendamento.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      as: 'cliente'
    });
  };

  return Agendamento;
};
