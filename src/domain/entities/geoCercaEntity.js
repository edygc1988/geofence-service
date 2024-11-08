class GeoCerca {
    constructor({ id, name, polygon, jefes }) {
      this.id = id;
      this.name = name;
      this.polygon = polygon;  // Array de coordenadas
      this.jefes = jefes || [];
    }
  }
  
  module.exports = GeoCerca;
  