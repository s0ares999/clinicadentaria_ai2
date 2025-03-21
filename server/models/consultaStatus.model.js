module.exports = (sequelize, DataTypes) => {
  const ConsultaStatus = sequelize.define("ConsultaStatus", {
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
    tableName: 'ConsultaStatus',
    timestamps: false
  });

  ConsultaStatus.associate = (models) => {
    ConsultaStatus.hasMany(models.Consulta, {
      foreignKey: 'status_id',
      as: 'consultas'
    });
  };

  return ConsultaStatus;
}; 