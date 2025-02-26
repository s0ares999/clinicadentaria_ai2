module.exports = (sequelize, DataTypes) => {
  const Agendamento = sequelize.define("Agendamento", {
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    horaFim: {
      type: DataTypes.TIME,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('agendado', 'concluido', 'cancelado'),
      defaultValue: 'agendado'
    },
    observacoes: {
      type: DataTypes.TEXT
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
