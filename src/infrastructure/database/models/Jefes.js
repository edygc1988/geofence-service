module.exports = (sequelize, DataTypes) => {
  const Jefe = sequelize.define('Jefes', {
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
  });

    Jefe.associate = (models) => {
    Jefe.belongsToMany(models.Geocercas, { through: 'GeocercasJefes' });
  };

  return Jefe;
};
