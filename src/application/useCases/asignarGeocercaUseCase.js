class AsignarGeocercaAEmpleado {
    constructor(geocercaRepository) {
      this.geocercaRepository = geocercaRepository;
    }
  
    async execute(geocercaId, empleadoId) {
      return await this.geocercaRepository.assignToEmpleado(geocercaId, empleadoId);
    }
  }
  
  module.exports = AsignarGeocercaAEmpleado;
  