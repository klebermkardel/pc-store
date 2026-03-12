const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');

const ProductController = {
    // Listar todos os produtos e listagem por filtros
    async getAll(req, res) {
        try {
            // 1. Adicione 'sort' à desestruturação
            const { category, min_price, max_price, sort } = req.query;

            let whereClause = {};
            let categoryWhere = {};
            
            let orderClause = [['id', 'ASC']]; 

            if (sort === 'price_asc') {
                orderClause = [['price', 'ASC']];
            } else if (sort === 'price_desc') {
                orderClause = [['price', 'DESC']];
            }

            if (category) {
                categoryWhere = { slug: category };
            }

            if (min_price || max_price) {
                whereClause.price = {};
                if (min_price) whereClause.price[Op.gte] = parseFloat(min_price);
                if (max_price) whereClause.price[Op.lte] = parseFloat(max_price);
            }

            const products = await Product.findAll({
                where: whereClause,
                order: orderClause, // 3. Aplique a ordenação aqui
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'slug'],
                    where: Object.keys(categoryWhere).length > 0 ? categoryWhere : null,
                    required: category ? true : false
                }]
            });

            return res.json(products);
        } catch (error) {
            console.error("Erro no Controller ao buscar produtos:", error);
            return res.status(500).json({ error: 'Erro interno ao buscar produtos' });
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
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({
                where: { id: id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
            }

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao excluir produto.' });
        }
    }
};

module.exports = ProductController;