const express = require('express');
const sequelize = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Rota para listar todos os produtos ou por id
app.use('/products', productRoutes);

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