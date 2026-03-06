const sequelize = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('--- Banco resetado para o Seed ---');

        const c1 = await Category.create({ name: 'Processadores', slug: 'processadores' });
        const c2 = await Category.create({ name: 'Placas de Vídeo', slug: 'placas-de-video' });

        await Product.create({
            name: 'Intel Core i9-13900K',
            description: 'Processador de alta performance com 24 núcleos.',
            price: 3500.00,
            stock_quantity: 10,
            category_id: c1.id,
            specifications: { socket: 'LGA1700', tdp: '125W', cores: 24}
        });

        await Product.create({
            name: 'NVIDIA RT 4080',
            description: 'Placa de vídeo com Ray Tracing e 16GB GDDR6X.',
            price: 8200.00,
            stock_quantity: 5,
            category_id: c2.id,
            specifications: { memory: '16GB', vram_type: 'GDDR6X', interface: 'PCIe 4.0' }
        });

        console.log('Dados semeados com sucesso!');
        process.exit();
    } catch (error) {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
    }
};

seed();