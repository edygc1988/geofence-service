class RegistrarJefe {
    constructor(jefeRepository) {
      this.jefeRepository = jefeRepository;
    }
  
    async execute(jefeData) {
      return await this.jefeRepository.crearJefe(jefeData);
      //return await this.jefeRepository.crearJefe({id: jefeData.jefe.id, nombre: jefeData.jefe.nombre, tipo: jefeData.tipo});
    }
  }

  
  module.exports = RegistrarJefe;
  