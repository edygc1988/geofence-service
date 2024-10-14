// src/infrastructure/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error + ' Not authorized' });
  }
};
