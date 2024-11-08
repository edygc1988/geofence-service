const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

module.exports = (geocercaController) => {
  router.post('/', authMiddleware, (req, res) => geocercaController.create(req, res));
  router.get('/',authMiddleware, (req, res) => geocercaController.getAll(req, res));
  router.post('/assign', authMiddleware, (req, res) => geocercaController.assignToJefe(req, res));
  return router;
};
