const Product = require('../models/Product');
const Category = require('../models/Category');

const ProductController = {
    // Listar todos os produtos
    async getAll(req, res) {
        try {
           const products = await Product.findAll({
            include: [{
                model: Category,
                as: 'category',
                atrtributes: ['name', 'slug']
            }]
           });
           return res.json(products);
        } catch (error) {
            console.error("Erro no Controller ao buscar produtos:", error);
            return res.status(500).json({ error: 'Erro interno ao buscar produtos '});
        }
    },

    // Buscar um produto específico por ID (Novo endpoint!)
    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id, {
                include: [{ model: Category, as: 'category', attributes: ['name'] }]
            });

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            return res.json(product);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o produto' });
        }
    }
};

module.exports = ProductController;