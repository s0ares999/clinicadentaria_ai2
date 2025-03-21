module.exports = (sequelize, DataTypes) => {
  const TipoUtilizador = sequelize.define("TipoUtilizador", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'TipoUtilizador',
    timestamps: false
  });

  TipoUtilizador.associate = (models) => {
    TipoUtilizador.hasMany(models.Utilizador, {
      foreignKey: 'tipo_utilizador_id',
      as: 'utilizadores'
    });
  };

  return TipoUtilizador;
}; 