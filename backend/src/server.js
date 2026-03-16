const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// Rotas
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

        process.on('SIGTERM', async () => {
            console.log('Encerrando servidor...');
            await sequelize.close();
            process.exit(0);
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
    }
};

startServer();