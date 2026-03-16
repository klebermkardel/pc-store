const sequelize = require('./config/database');
const Category = require('./models/Category');
const Product = require('./models/Product');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('--- Banco resetado para o Seed ---');

        // --- 1. CATEGORIAS ---
        const [c1, c2, c3, c4, c5] = await Category.bulkCreate([
            { name: 'Processadores', slug: 'processadores' },
            { name: 'Placas de Vídeo', slug: 'placas-de-video' },
            { name: 'Memória RAM', slug: 'memoria-ram' },
            { name: 'Armazenamento', slug: 'armazenamento' },
            { name: 'Periféricos', slug: 'perifericos' }
        ]);

        // --- 2. PRODUTOS ---
        await Product.bulkCreate([

            // Processadores
            {
                name: 'Intel Core i9-13900K',
                description: 'Processador de alta performance com 24 núcleos.',
                price: 3500.00,
                stock_quantity: 10,
                category_id: c1.id,
                image_url: "https://images.kabum.com.br/produtos/fotos/sync_mirakl/416602/xlarge/Processador-Intel-Core-I9-13900K-5-80GHz-Max-Turbo-Cache-36MB-Quad-Core-32-Threads-LGA-1700_1752001191.jpg",
                specifications: { socket: 'LGA1700', tdp: '125W', cores: 24 }
            },
            {
                name: 'AMD Ryzen 5 5600X',
                description: 'Excelente custo-benefício para jogos em 1080p.',
                price: 950.00,
                stock_quantity: 25,
                category_id: c1.id,
                image_url: "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-5-5600x.jpg",
                specifications: { socket: 'AM4', tdp: '65W', cores: 6 }
            },

            // Placas de Vídeo
            {
                name: 'NVIDIA RTX 4080',
                description: 'Placa de vídeo com Ray Tracing e 16GB GDDR6X.',
                price: 8200.00,
                stock_quantity: 5,
                category_id: c2.id,
                image_url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ_mvZOXFHX18UqNSEK1SH_6_r1H0eSyOBFkrANc45qofHkU1BuPjrVzibxPCNRBkX82qI4DeyrqAJ6qj4a4C6OFEn2fmSsR-kV08tNWeKayt3UdUWIoRqBo5l1Jy39mL7sWv7pfow&usqp=CAc",
                specifications: { memory: '16GB', vram_type: 'GDDR6X', interface: 'PCIe 4.0' }
            },
            {
                name: 'NVIDIA RTX 3060',
                description: 'Ideal para quem busca Ray Tracing com orçamento médio.',
                price: 1800.00,
                stock_quantity: 12,
                category_id: c2.id,
                image_url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTdN9kKJP1w4LpfM41oLRHfgDut-A0AbwslaJ1Fp4FQihRq5rbLpO-5j2l-iJuZh8MBacTAu222YJNDdsYPo8v5gRaw58EYLXyME1-MS8ZFtPOdb4cqr2-NzVw08NOT2KDFcOLN__I&usqp=CAc",
                specifications: { memory: '12GB', vram_type: 'GDDR6', interface: 'PCIe 4.0' }
            },

            // Memória RAM
            {
                name: 'Corsair Vengeance 16GB (2x8GB)',
                description: 'Memória DDR4 3200MHz com dissipador de alumínio.',
                price: 380.00,
                stock_quantity: 40,
                category_id: c3.id,
                image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRHVPxZF1xcsFqir8NgZ6ej8RPM4JF_fjgTV2VwgxuNwQwAMqECF_dGhImzwfLwBQKiHdZV86ejjYo847xJW_grPW9Ab3CrtOh8-AX2PBWn6tiQd-9KvBw-QsWA1G2_8EnxSoY89M&usqp=CAc",
                specifications: { type: 'DDR4', speed: '3200MHz', capacity: '16GB' }
            },
            {
                name: 'Kingston Fury Beast 32GB (2x16GB)',
                description: 'Alta velocidade DDR5 para sistemas modernos.',
                price: 980.00,
                stock_quantity: 15,
                category_id: c3.id,
                image_url: "https://images0.kabum.com.br/produtos/fotos/480530/memoria-kingston-fury-beast-rgb-32gb-2x16gb-3200mhz-ddr4-cl16-preto-kf432c16bb12ak2-32_1698350922_gg.jpg",
                specifications: { type: 'DDR5', speed: '5200MHz', capacity: '32GB' }
            },

            // Armazenamento
            {
                name: 'SSD Samsung 980 Pro 1TB',
                description: 'SSD NVMe M.2 Gen4 com velocidades extremas.',
                price: 750.00,
                stock_quantity: 20,
                category_id: c4.id,
                image_url: "https://images.kabum.com.br/produtos/fotos/163616/ssd-1-tb-samsung-980-pro-series-nvme-m-2-2280-pcie-4-0x4-leitura-7000mb-s-e-5000mb-s-mz-v8p1t0b-am_1673449032_gg.jpg",
                specifications: { format: 'M.2', interface: 'PCIe 4.0', read_speed: '7000MB/s' }
            },
            {
                name: 'HD WD Blue 2TB',
                description: 'Armazenamento confiável para arquivos e backups.',
                price: 320.00,
                stock_quantity: 30,
                category_id: c4.id,
                image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRCGLCpGVKsUYqFfSYyyD2NuJ7KnHo4oqhhzT1e745d8HwvvQwfGk_p6spM8AsZ6dsRiCA_J8rai8O-h5H-HVh7sjB9tSjnK0XTNGxKUEJkXUUkTFzr_S4FHn1QSJEcp91Ya9AHogs&usqp=CAc",
                specifications: { capacity: '2TB', speed: '7200RPM', cache: '256MB' }
            },

            // Periféricos
            {
                name: 'Mouse Logitech G Pro X Superlight',
                description: 'Mouse wireless ultra leve usado por pro players.',
                price: 650.00,
                stock_quantity: 18,
                category_id: c5.id,
                image_url: "https://m.media-amazon.com/images/I/61ykKLbddNL.jpg",
                specifications: { sensor: 'HERO 25K', weight: '63g', switch: 'Mechanical' }
            },
            {
                name: 'Teclado Razer BlackWidow V4',
                description: 'Teclado mecânico RGB com switches verdes táteis.',
                price: 1100.00,
                stock_quantity: 7,
                category_id: c5.id,
                image_url: "https://images9.kabum.com.br/produtos/fotos/476969/teclado-gamer-razer-blackwidow-v4-chroma-rgb-switch-green-layout-us-rz0304690200r3u_1700781469_gg.jpg",
                specifications: { switch: 'Razer Green', layout: 'ABNT2', illumination: 'Chroma RGB' }
            }
        ]);

        console.log('--- Dados semeados com sucesso! (10 produtos, 5 categorias) ---');
        process.exit();
    } catch (error) {
        console.error('Erro no seed:', error);
        process.exit(1);
    }
};

seed();