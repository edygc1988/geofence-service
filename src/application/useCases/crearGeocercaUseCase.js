class CrearGeocerca {
    constructor(geocercaRepository) {
      this.geocercaRepository = geocercaRepository;
    }
  
    async execute(geocercaData) {
      const geocerca = await this.geocercaRepository.create(geocercaData);
      return geocerca;
    }
  }
  
  module.exports = CrearGeocerca;
  