const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');

const AdminController = {
    async getDashboard(req, res) {
        try {
            const [totalProducts, totalCategories, totalUsers] = await Promise.all([
                Product.count(),
                Category.count(),
                User.count({ where: { is_admin: false } })
            ]);

            const lowStock = await Product.findAll({
                where: { stock_quantity: 0 },
                attributes: ['id', 'name', 'stock_quantity'],
            });

            const recentUsers = await User.findAll({
                where: { is_admin: false },
                attributes: ['id', 'name', 'email', 'created_at'],
                order: [['created_at', 'DESC']],
                limit: 5
            });

            return res.json({
                totalProducts,
                totalCategories,
                totalUsers,
                lowStock,
                recentUsers
            });
        } catch (error) {
            console.error('Erro ao buscar métricas do dashboard:', error);
            return res.status(500).json({ error: 'Erro ao buscar métricas' });
        }
    },

    async getUsers(req, res) {
        try {
            const users = await User.findAll({
                where: { is_admin: false },
                attributes: ['id', 'name', 'email', 'created_at'],
                order: [['created_at', 'DESC']]
            });
            return res.json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    },

    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
            if (user.is_admin) return res.status(403).json({ error: 'Não é possível excluir um administrador' });

            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return res.status(500).json({ error: 'Erro ao excluir usuário' });
        }
    }
};

module.exports = AdminController;