const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAccessToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });

const generateRefreshToken = (id) =>
    jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });

const AuthController = {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios' });
            }

            if (password.length < 6) {
                return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({ error: 'Este e-mail já está cadastrado' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({
                name,
                email,
                password: hashedPassword
            });

            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken(user.id);

            await user.update({ refresh_token: refreshToken });

            return res.status(201).json({
                user: { id: user.id, name: user.name, email: user.email },
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return res.status(500).json({ error: 'Erro ao registrar usuário' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
            }

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const accessToken = generateAccessToken(user.id);
            const refreshToken = generateRefreshToken(user.id);

            await user.update({ refresh_token: refreshToken });

            return res.json({
                user: { id: user.id, name: user.name, email: user.email },
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return res.status(500).json({ error: 'Erro ao fazer login' });
        }
    },

    async me(req, res) {
        try {
            const user = await User.findByPk(req.userId, {
                attributes: ['id', 'name', 'email', 'created_at']
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.json(user);
        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
            return res.status(500).json({ error: 'Erro ao buscar perfil' });
        }
    },

    async refresh(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(401).json({ error: 'Refresh token não fornecido' });
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            const user = await User.findByPk(decoded.id);
            if (!user || user.refresh_token !== refreshToken) {
                return res.status(403).json({ error: 'Refresh token inválido' });
            }

            const newAccessToken = generateAccessToken(user.id);
            const newRefreshToken = generateRefreshToken(user.id);

            await user.update({ refresh_token: newRefreshToken });

            return res.json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(403).json({ error: 'Refresh token expirado, faça login novamente' });
            }
            console.error('Erro ao renovar token:', error);
            return res.status(403).json({ error: 'Refresh token inválido' });
        }
    },

    async logout(req, res) {
        try {
            const user = await User.findByPk(req.userId);
            if (user) {
                await user.update({ refresh_token: null });
            }
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            return res.status(500).json({ error: 'Erro ao fazer logout' });
        }
    }
};

module.exports = AuthController;