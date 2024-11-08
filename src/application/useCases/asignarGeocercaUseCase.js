class AsignarGeocercaAJefe {
    constructor(geocercaRepository) {
      this.geocercaRepository = geocercaRepository;
    }
  
    async execute(geocercaId, jefeId) {
      return await this.geocercaRepository.assignToJefe(geocercaId, jefeId);
    }
  }
  
  module.exports = AsignarGeocercaAJefe;
  