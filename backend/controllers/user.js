const User = require('../models/user.js')

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
    createUser
}