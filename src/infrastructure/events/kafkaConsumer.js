const { Kafka } = require('kafkajs');

// Importa los casos de uso
const RegistrarJefe = require('../../application/useCases/registrarJefe');

// Importa los repositorios
const JefeRepository = require('../../domain/repositories/jefeRepository');

// Importa los modelos de base de datos
const { Jefes } = require('../database');


// Configuración de Kafka
const kafkaConfig = {
  clientId: 'geofences-service',
  brokers: ['localhost:29092'], // Configuración de servidor Kafka
};

// Instancia los repositorios
const jefeRepository = new JefeRepository( {Jefes} );

// Instancia los casos de uso
const registerJefeUseCase = new RegistrarJefe(jefeRepository);

class KafkaConsumerService {
  constructor() {
    this.kafka = new Kafka(kafkaConfig);
    this.consumer = this.kafka.consumer({ groupId: 'geofences-group' });
    this.registerJefeUseCase = registerJefeUseCase;
  }

  async start() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'jefe-events', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        const data = JSON.parse(message.value.toString());
        console.log(data);
        if (topic === 'jefe-events') {
          await this.processJefeEvent(data);
        }
      }
    });
  }

  async processJefeEvent(data) {
    await this.registerJefeUseCase.execute(data);
  }

  async stop() {
    await this.consumer.disconnect();
  }
}

module.exports = KafkaConsumerService;
