const { User, Address } = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv").config()


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

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "e-mail já cadastrado" })
        }

        const hasedPassowrd = await bcrypt.hash(password, 10)

        await User.create({ name, email, password: hasedPassowrd });
        res.status(201).json({ message: `Seja bem vindo ${name}` });

    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({error: 'email e senha são obrigatorios'})
    }

    try {
        const user = await User.findOne({where: {email}});
        if(!user) {
            return res.status(404).json({error: 'usuario nao encontrado'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({error: 'senha invalida'})
        }

        const token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET, {expiresIn: '1h'} ) 
        res.status(200).json({token})

    } catch (error) {
        res.status(500).json({error: 'erro no servidor'});
    }
}

const getUserWithAddres = async (req,res) => {
    try {
        const user = await User.findByPk( req.params.id, {
            include: [{ model: Address, as: 'addresses' }]
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" })
        }
        res.json(user);

    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário com endereços" })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getUserWithAddres
}