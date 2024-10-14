module.exports = (sequelize, DataTypes) => {
    const Geocercas = sequelize.define('Geocercas', {
      name: DataTypes.STRING,
      polygon: DataTypes.JSONB,  // Guardar el array de coordenadas como JSON
    });
  
    Geocercas.associate = (models) => {
      Geocercas.belongsToMany(models.Empleados, { through: 'GeocercasEmpleados' });
    };
  
    return Geocercas;
  };
  