class GeocercaRepository {
    constructor(Geocercas, Jefes) {
      this.Geocercas = Geocercas;
      this.Jefes = Jefes;
    }
  
    async create(geocercaData) {
      const geocerca = await this.Geocercas.create(geocercaData, {
        include: [this.Jefes]
      });

      // Si geocercaData contiene jefes, asigna la geocerca a esos jefes
      if (geocercaData.employees && geocercaData.employees.length > 0) {
        // Usa el método addJefes para establecer la relación muchos a muchos
        await geocerca.addJefes(geocercaData.employees);
      }

      return geocerca;
    }
  
    async findAll() {
      return await this.Geocercas.findAll({ include: [this.Jefes] });
    }
  
    async assignToJefe(geocercaId, jefeId) {
      const geocerca = await this.Geocercas.findByPk(geocercaId);
      const jefe = await this.Jefes.findByPk(jefeId);
      if (geocerca && jefe) {
        await geocerca.addJefe(jefe);
        return geocerca;
      }
      throw new Error('Geocerca o jefe no encontrado');
    }
  }
  
  module.exports = GeocercaRepository;