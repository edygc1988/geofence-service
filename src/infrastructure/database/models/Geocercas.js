module.exports = (sequelize, DataTypes) => {
    const Geocerca = sequelize.define('Geocercas', {
      name: DataTypes.STRING,
      polygon: DataTypes.JSONB,  // Guardar el array de coordenadas como JSON
    });
  
    Geocerca.associate = (models) => {
      Geocerca.belongsToMany(models.Jefes, { through: 'GeocercasJefes' });
    };
  
    return Geocerca;
  };
  