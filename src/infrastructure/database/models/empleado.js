module.exports = (sequelize, DataTypes) => {
    const Empleados = sequelize.define('Empleados', {
      nombre: DataTypes.STRING,
      tipo: DataTypes.STRING,
    });
  
    Empleados.associate = (models) => {
      Empleados.belongsToMany(models.Geocercas, { through: 'GeocercasEmpleados' });
    };
  
    return Empleados;
  };
  