const { Sequelize } = require('sequelize');
require('dotenv').config();

const required = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST'];
required.forEach(key => {
  if (!process.env[key]) throw new Error(`Variável de ambiente ausente: ${key}`);
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        timezone: process.env.DB_TIMEZONE || '-03:00',
        retry: {
            max: 3
        },
        define: {
            timestamps: true,
            underscored: true
        },
        pool: {
            max: 10,
            min: 2,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = sequelize;