const User = require("../models/user.js")

const login = async (req, res) => {
    const user = await User.findOne({
        where: {
            pin: req.body.pin
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    req.session.userId = user.uuid
    const uuid = user.uuid
    const name = user.name
    res.status(200).json({uuid, name})
}

const me = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon Login ke Akun Anda"})
    }
    const user = await User.findOne({
        attributes:["uuid", "name"],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User Tidak Ditemukan"})
    res.status(200).json(user)
}

const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak Dapat Logout"})
        res.status(200).json({msg: "Anda Telah Logout"})
    })
}

module.exports = {
    login,
    me,
    logOut
}