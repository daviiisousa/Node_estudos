const { User, Address } = require('../models')

const createAddress = async (req, res) => {
    const {userId, street, city, state} = req.body

    if(!userId || !street || !city || !state){
        return res.status(400).json({error: "campos obrigatorios"})
    } 

    try {
        const user = await User.findByPk(userId)
        if(!user){
            return res.status(404).json({error: "usuario nao encopntrado"})
        }

        const newAddress = await Address.create({userId, street, city, state})
        res.status(201).json(newAddress)
    } catch (error) {
        res.status(500).json({error: "erro"})
    }
}

module.exports = {
    createAddress
}