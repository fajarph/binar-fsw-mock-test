const User = require('../models/user.js')

const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes:["uuid", "name", "pin"]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createUser = async(req, res) => {
    try {
        const {name, pin} = req.body;
        await User.create({
            name: name,
            pin: pin,
        })
        res.status(201).json({msg: "User Created"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = {
    getUsers,
    createUser
}