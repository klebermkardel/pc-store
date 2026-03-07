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
    },

    async create(req, res) {
        try {
            const { name, description, price, stock_quantity, category_id, image_url, specifications } = req.body;

            const category = await Category.findByPk(category_id);
            if(!category) {
                return res.status(400).json({ error: 'A categoria informada não existe' });
            }

            const newProduct = await Product.create({
                name,
                description,
                price,
                stock_quantity,
                category_id,
                image_url,
                specifications
            });

            return res.status(201).json(newProduct);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            return res.status(500).json({ error: 'Erro ao cadastrar o produto.' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Product.update(req.body, {
                where: { id: id }
            }); 

            if(!updated) {
                return res.status(404).json({ error: 'Produto não encontrado para atualização ' });
            }

            const updatedProduct = await Product.findByPk(id);
            return res.json(updatedProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar produto.' });
        }
    }
};

module.exports = ProductController;