const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Definindo os caminhos e ligando aos métodos do Controller
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create);

module.exports = router;