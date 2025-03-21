module.exports = (sequelize, DataTypes) => {
  const Especialidade = sequelize.define("Especialidade", {
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
    }
  }, {
    tableName: 'Especialidades',
    timestamps: false
  });

  Especialidade.associate = (models) => {
    Especialidade.hasMany(models.Medico, {
      foreignKey: 'especialidade_id',
      as: 'medicos'
    });
  };

  return Especialidade;
}; 