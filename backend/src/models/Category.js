const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome da categoria não pode ser vazio' },
            len: { args: [2, 100], msg: 'O nome deve ter entre 2 e 100 caracteres' }
        }
    },
    slug: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: 'O slug não pode ser vazio' },
            is: { args: /^[a-z0-9-]+$/, msg: 'O slug deve conter apenas letras minúsculas, números e hífens' }
        }
    }
}, {
    tableName: 'categories',
    underscored: true
});

module.exports = Category;