const Category = require('../models/Category');
const Product = require('../models/Product');

const CategoryController = {
    // Listar todas as categorias
    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            return res.status(500).json({ error: 'Erro interno ao buscar categorias' });
        }
    },

    // Buscar uma categoria específica e seus produtos
    async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id, {
                include: [{ model: Product, as: 'products' }]
            });

            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            return res.json(category);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar a categoria' });
        }
    }
};

module.exports = CategoryController;