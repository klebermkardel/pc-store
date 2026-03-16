const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome do produto não pode ser vazio' },
            len: { args: [2, 150], msg: 'O nome deve ter entre 2 e 150 caracteres' }
        }
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: { args: [0], msg: 'O preço não pode ser negativo' }
        }
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: { args: [0], msg: 'O estoque não pode ser negativo' }
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    },
    image_url: {
        type: DataTypes.STRING(500),
        validate: {
            isUrl: { msg: 'A URL da imagem é inválida' }
        }
    },
    specifications: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'products',
    underscored: true
});

module.exports = Product;