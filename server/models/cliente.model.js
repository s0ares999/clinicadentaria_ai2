module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define("Cliente", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: DataTypes.STRING
    },
    dataNascimento: {
      type: DataTypes.DATEONLY
    },
    morada: {
      type: DataTypes.STRING
    },
    nif: {
      type: DataTypes.STRING
    },
    historico: {
      type: DataTypes.TEXT
    }
  });

  return Cliente;
};
