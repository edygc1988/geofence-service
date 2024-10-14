class EmpleadoRepository {
  constructor({ Empleados }) {
    this.Empleados = Empleados;
  }

  async crearEmpleado(empleadoData) {
    const empleado = await this.Empleados.upsert(empleadoData);
    return empleado;
  }
}

module.exports = EmpleadoRepository;
