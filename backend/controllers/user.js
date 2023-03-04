const User = require('../models/user.js')

const createUser = async(req, res) => {
    try {
        const {name, pin} = req.body;
        const user = await User.findOne({
            where: {
                pin: pin
            }
        });

        console.log(user);

        if (user) return res.status(400).json({msg: "Pin sudah terdaftar"})

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