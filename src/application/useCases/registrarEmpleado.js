class RegistrarEmpleado {
    constructor(empleadoRepository) {
      this.empleadoRepository = empleadoRepository;
    }
  
    async execute(empleadoData) {
      return await this.empleadoRepository.crearEmpleado(empleadoData.empleado);
      //return await this.empleadoRepository.crearEmpleado({id: empleadoData.empleado.id, nombre: empleadoData.empleado.nombre, tipo: empleadoData.tipo});
    }
  }

  
  module.exports = RegistrarEmpleado;
  