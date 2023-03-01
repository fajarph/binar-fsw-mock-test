const Task = require('../models/task.js')

const getTasks = async(req, res) => {
    try {
        const response = await Task.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const createTask = async(req, res) => {
    const {title, summary} = req.body
    try {
        await Task.create({
            title: title,
            summary: summary,
            userId: req.userId
        })
        res.status(201).json({msg: "Task Created Succesfully"})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    getTasks,
    createTask
}