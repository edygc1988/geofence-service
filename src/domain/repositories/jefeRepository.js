class JefeRepository {
  constructor({ Jefes }) {
    this.Jefes = Jefes;
  }

  async crearJefe(jefeData) {
    const jefe = await this.Jefes.upsert(jefeData);
    return jefe;
  }
}

module.exports = JefeRepository;
