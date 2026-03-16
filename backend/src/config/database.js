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
        define: {
            timestamps: true,
            underscored: true
        }
    }
);

module.exports = sequelize;