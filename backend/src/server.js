const sequelize = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');

Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o MySQL estabelecida!');

        await sequelize.sync({ force: false });
        console.log('Tabelas sincronizadas com sucesso!');

        // Futuro: app.listen para o Express
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
    }
};

startServer();