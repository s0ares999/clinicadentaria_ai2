module.exports = (sequelize, DataTypes) => {
  const FaturaStatus = sequelize.define("FaturaStatus", {
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
    tableName: 'FaturaStatus',
    timestamps: false
  });

  FaturaStatus.associate = (models) => {
    FaturaStatus.hasMany(models.Fatura, {
      foreignKey: 'status_id',
      as: 'faturas'
    });
  };

  return FaturaStatus;
}; 