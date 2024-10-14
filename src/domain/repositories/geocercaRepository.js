class GeocercaRepository {
    constructor(GeocercaModel, empleadoModel) {
      this.GeocercaModel = GeocercaModel;
      this.empleadoModel = empleadoModel;
    }
  
    async create(geocercaData) {
      const geocerca = await this.GeocercaModel.create(geocercaData, {
        include: [this.empleadoModel]
      });

      // Si geocercaData contiene empleados, asigna la geocerca a esos empleados
      if (geocercaData.employees && geocercaData.employees.length > 0) {
        // Usa el método addEmpleados para establecer la relación muchos a muchos
        await geocerca.addEmpleados(geocercaData.employees);
      }

      return geocerca;
    }
  
    async findAll() {
      return await this.GeocercaModel.findAll({ include: [this.empleadoModel] });
    }
  
    async assignToEmpleado(geocercaId, empleadoId) {
      const geocerca = await this.GeocercaModel.findByPk(geocercaId);
      const empleado = await this.empleadoModel.findByPk(empleadoId);
      if (geocerca && empleado) {
        await geocerca.addEmpleado(empleado);
        return geocerca;
      }
      throw new Error('Geocerca o empleado no encontrado');
    }
  }
  
  module.exports = GeocercaRepository;
  