class GeoCerca {
    constructor({ id, name, polygon, empleados }) {
      this.id = id;
      this.name = name;
      this.polygon = polygon;  // Array de coordenadas
      this.empleados = empleados || [];
    }
  }
  
  module.exports = GeoCercas;
  