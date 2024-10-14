const express = require('express');
const cors = require('cors');  // Importa el paquete CORS
const bodyParser = require('body-parser');
const { Geocercas, Empleados } = require('../database');
const GeocercaRepository = require('../../domain/repositories/geocercaRepository');
const GeocercaController = require('../webserver/controllers/geocercaController');
const crearGeocerca = require('../../application/useCases/crearGeocercaUseCase');
const listarGeocerca = require('../../application/useCases/listaGeoCercaUseCase');
const asignarGeocercaAEmpleado = require('../../application/useCases/asignarGeocercaUseCase');
const geocercaRoutes = require('../webserver/routes/geocercaRoutes');

const KafkaController = require('../../infrastructure/events/kafkaConsumer');

// Crear instancia del controlador de Kafka
const KafkaConsumerService = new KafkaController();

const app = express();
// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(bodyParser.json());

const geocercaRepository = new GeocercaRepository(Geocercas, Empleados);
const geocercaController = new GeocercaController({
  crearGeocerca: new crearGeocerca(geocercaRepository),
  listarGeocerca: new listarGeocerca(geocercaRepository),
  asignarGeocercaAEmpleado: new asignarGeocercaAEmpleado(geocercaRepository),
});

app.use('/api/v1/geocerca', geocercaRoutes(geocercaController));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log('Server is running on port ' + PORT);
  await KafkaConsumerService.start();
});
