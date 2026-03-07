const express = require('express');
const sequelize = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// --- ROTA DE TESTE (LISTAR PRODUTOS) ---
app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category, as: 'category', attributes: ['name'] }]
        }); 
        res.json(products);
    } catch (error) {
    console.error("DETALHE DO ERRO:", error);
    res.status(500).json({ error: error.message });
    }
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
    }
};

startServer();