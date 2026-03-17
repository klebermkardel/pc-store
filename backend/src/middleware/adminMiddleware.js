const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user || !user.is_admin) {
            return res.status(403).json({ error: 'Acesso restrito a administradores' });
        }
        next();
    } catch (error) {
        console.error('Erro no middleware de admin:', error);
        return res.status(500).json({ error: 'Erro ao verificar permissões' });
    }
};

module.exports = adminMiddleware;