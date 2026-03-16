const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome não pode ser vazio' },
            len: { args: [2, 100], msg: 'O nome deve ter entre 2 e 100 caracteres' }
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: { msg: 'O e-mail informado é inválido' },
            notEmpty: { msg: 'O e-mail não pode ser vazio' }
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'A senha não pode ser vazia' }
        }
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: 'users',
    underscored: true
});

module.exports = User;