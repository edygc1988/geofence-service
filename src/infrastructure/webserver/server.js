const express = require('express');
const cors = require('cors');  // Importa el paquete CORS
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { Geocercas, Jefes } = require('../database');
const GeocercaRepository = require('../../domain/repositories/geocercaRepository');
const GeocercaController = require('../webserver/controllers/geocercaController');
const crearGeocerca = require('../../application/useCases/crearGeocercaUseCase');
const listarGeocerca = require('../../application/useCases/listaGeoCercaUseCase');
const asignarGeocercaAJefe = require('../../application/useCases/asignarGeocercaUseCase');
const geocercaRoutes = require('../webserver/routes/geocercaRoutes');
const metricsRoutes = require('../webserver/routes/metricasRoutes');
const { collectDefaultMetrics } = require('prom-client');

const KafkaController = require('../../infrastructure/events/kafkaConsumer');

// Crear instancia del controlador de Kafka
const KafkaConsumerService = new KafkaController();

const app = express();
// Configura la recolección de métricas por defecto
collectDefaultMetrics();

// Configura Helmet para seguridad de cabeceras HTTP
app.use(helmet());

// Configura limitación de tasa
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limita cada IP a 100 solicitudes por ventana de 15 minutos
});
app.use(limiter);

// Habilitar CORS para todas las solicitudes
app.use(cors());
app.use(bodyParser.json());


const geocercaRepository = new GeocercaRepository(Geocercas, Jefes);
const geocercaController = new GeocercaController({
  crearGeocerca: new crearGeocerca(geocercaRepository),
  listarGeocerca: new listarGeocerca(geocercaRepository),
  asignarGeocercaAJefe: new asignarGeocercaAJefe(geocercaRepository),
});

app.use('/api/v1/geocerca', geocercaRoutes(geocercaController));
app.use('/', metricsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log('Server is running on port ' + PORT);
  await KafkaConsumerService.start();
});
