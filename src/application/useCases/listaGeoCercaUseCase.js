class ListaGeocerca {
    constructor(geocercaRepository) {
      this.geocercaRepository = geocercaRepository;
    }
  
    async execute() {
      return await this.geocercaRepository.findAll();
    }
  }
  
  module.exports = ListaGeocerca;
  