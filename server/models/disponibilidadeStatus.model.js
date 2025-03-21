module.exports = (sequelize, DataTypes) => {
  const DisponibilidadeStatus = sequelize.define("DisponibilidadeStatus", {
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
    tableName: 'DisponibilidadeStatus',
    timestamps: false
  });

  DisponibilidadeStatus.associate = (models) => {
    DisponibilidadeStatus.hasMany(models.Disponibilidade, {
      foreignKey: 'status_id',
      as: 'disponibilidades'
    });
  };

  return DisponibilidadeStatus;
}; 