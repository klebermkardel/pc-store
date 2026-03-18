const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');

const ProductController = {
    async getAll(req, res) {
        try {
            const { category, min_price, max_price, sort, name, page = 1, limit = 9 } = req.query;

            if (min_price && isNaN(parseFloat(min_price))) {
                return res.status(400).json({ error: 'O valor mínimo informado é inválido' });
            }
            if (max_price && isNaN(parseFloat(max_price))) {
                return res.status(400).json({ error: 'O valor máximo informado é inválido' });
            }

            let whereClause = {};
            let categoryWhere = {};
            let orderClause = [['id', 'ASC']];

            if (name) {
                whereClause.name = { [Op.like]: `%${name}%` };
            }

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

            const pageNum = Math.max(1, parseInt(page));
            const limitNum = Math.max(1, parseInt(limit));
            const offset = (pageNum - 1) * limitNum;

            const { count, rows } = await Product.findAndCountAll({
                where: whereClause,
                order: orderClause,
                limit: limitNum,
                offset,
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['name', 'slug'],
                    where: Object.keys(categoryWhere).length > 0 ? categoryWhere : null,
                    required: category ? true : false
                }]
            });

            return res.json({
                products: rows,
                total: count,
                page: pageNum,
                totalPages: Math.ceil(count / limitNum)
            });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return res.status(500).json({ error: 'Erro interno ao buscar produtos' });
        }
    },

    async getById(req, res) {
        try {
            // 1. Validação de ID numérico
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            const product = await Product.findByPk(id, {
                include: [{ model: Category, as: 'category', attributes: ['name'] }]
            });

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            return res.json(product);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            return res.status(500).json({ error: 'Erro ao buscar o produto' });
        }
    },

    async create(req, res) {
        try {
            const { name, description, price, stock_quantity, category_id, image_url, specifications } = req.body;

            // 2. Validação dos campos obrigatórios
            if (!name || !price || !category_id) {
                return res.status(400).json({ error: 'Os campos nome, preço e categoria são obrigatórios' });
            }

            const category = await Category.findByPk(category_id);
            if (!category) {
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
            console.error('Erro ao criar produto:', error);
            return res.status(500).json({ error: 'Erro ao cadastrar o produto' });
        }
    },

    async update(req, res) {
        try {
            // 1. Validação de ID numérico
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            const [updated] = await Product.update(req.body, {
                where: { id }
            });

            if (!updated) {
                return res.status(404).json({ error: 'Produto não encontrado para atualização' });
            }

            const updatedProduct = await Product.findByPk(id);
            return res.json(updatedProduct);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            return res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    },

    async delete(req, res) {
        try {
            // 1. Validação de ID numérico
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            const deleted = await Product.destroy({
                where: { id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Produto não encontrado para exclusão' });
            }

            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            return res.status(500).json({ error: 'Erro ao excluir produto' });
        }
    }
};

module.exports = ProductController;