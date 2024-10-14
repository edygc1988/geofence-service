class GeocercaController {
    constructor({ crearGeocerca, listarGeocerca, asignarGeocercaAEmpleado }) {
      this.crearGeocerca = crearGeocerca;
      this.listarGeocerca = listarGeocerca;
      this.asignarGeocercaAEmpleado = asignarGeocercaAEmpleado;
    }
  
    async create(req, res) {
      try {
        const geocerca = await this.crearGeocerca.execute(req.body);
        res.status(201).json(geocerca);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async getAll(req, res) {
      try {
        const geocercas = await this.listarGeocerca.execute();
        res.status(200).json(geocercas);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async assignToEmpleado(req, res) {
      try {
        const { geocercaId, empleadoId } = req.body;
        const result = await this.asignarGeocercaAEmpleado.execute(geocercaId, empleadoId);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = GeocercaController;
  