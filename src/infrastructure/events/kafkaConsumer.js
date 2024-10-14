const { Kafka } = require('kafkajs');

// Importa los casos de uso
const RegistrarEmpleado = require('../../application/useCases/registrarEmpleado');

// Importa los repositorios
const EmpleadoRepository = require('../../domain/repositories/empleadoRepository');

// Importa los modelos de base de datos
const { Empleados } = require('../database');


// Configuración de Kafka
const kafkaConfig = {
  clientId: 'geofences-service',
  brokers: ['localhost:29092'], // Configuración de servidor Kafka
};

// Instancia los repositorios
const empleadoRepository = new EmpleadoRepository({ Empleados });

// Instancia los casos de uso
const registerEmpleadoUseCase = new RegistrarEmpleado(empleadoRepository);

class KafkaConsumerService {
  constructor() {
    this.kafka = new Kafka(kafkaConfig);
    this.consumer = this.kafka.consumer({ groupId: 'geofences-group' });
    this.registerEmpleadoUseCase = registerEmpleadoUseCase;
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'jefe-events', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(data);
        if (topic === 'jefe-events') {
          await this.processEmpleadoEvent(data);
        }
      }
    });
  }

  async processEmpleadoEvent(data) {
    await this.registerEmpleadoUseCase.execute(data);
  }

  async stop() {
    await this.consumer.disconnect();
  }
}

module.exports = KafkaConsumerService;
