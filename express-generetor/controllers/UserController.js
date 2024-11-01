const { User } = require('../models');

const getAllUsers = async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
}

const createUser = async (req, res) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({error: "Nome, email e senha são obrigatórios"})
    }
    const {name, email, password} = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Nome, email e senha são obrigatórios." })
    }
    try {
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" })
    }
}

module.exports = {
    getAllUsers,
    createUser
}