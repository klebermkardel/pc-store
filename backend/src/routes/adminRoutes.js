const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const AdminController = require('../controllers/AdminController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');

router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard
router.get('/dashboard', AdminController.getDashboard);

// Usuários
router.get('/users', AdminController.getUsers);
router.delete('/users/:id', AdminController.deleteUser);

// Produtos
router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getById);
router.post('/products', ProductController.create);
router.put('/products/:id', ProductController.update);
router.delete('/products/:id', ProductController.delete);

// Categorias
router.get('/categories', CategoryController.getAll);
router.get('/categories/:id', CategoryController.getById);
router.post('/categories', CategoryController.create);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;