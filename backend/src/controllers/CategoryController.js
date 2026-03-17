const Category = require('../models/Category');
const Product = require('../models/Product');

const CategoryController = {
    async getAll(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            return res.status(500).json({ error: 'Erro interno ao buscar categorias' });
        }
    },

    async getById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const category = await Category.findByPk(id, {
                include: [{ model: Product, as: 'products' }]
            });

            if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });
            return res.json(category);
        } catch (error) {
            console.error('Erro ao buscar categoria:', error);
            return res.status(500).json({ error: 'Erro ao buscar a categoria' });
        }
    },

    async create(req, res) {
        try {
            const { name, slug } = req.body;
            if (!name || !slug) {
                return res.status(400).json({ error: 'Nome e slug são obrigatórios' });
            }

            const existing = await Category.findOne({ where: { slug } });
            if (existing) {
                return res.status(409).json({ error: 'Já existe uma categoria com esse slug' });
            }

            const category = await Category.create({ name, slug });
            return res.status(201).json(category);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            return res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    },

    async update(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const category = await Category.findByPk(id);
            if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

            await category.update(req.body);
            return res.json(category);
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            return res.status(500).json({ error: 'Erro ao atualizar categoria' });
        }
    },

    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const category = await Category.findByPk(id);
            if (!category) return res.status(404).json({ error: 'Categoria não encontrada' });

            await category.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
            return res.status(500).json({ error: 'Erro ao excluir categoria' });
        }
    }
};

module.exports = CategoryController;