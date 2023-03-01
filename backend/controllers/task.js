const Task = require('../models/task.js')

const getTasks = async(req, res) => {
    try {
        const response = await Task.findAll({
            where: {
              userId: req.userId,
              isDone: false
            }
        });

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

const finishTask = async(req, res) => {
    try {
        await Task.update({
            isDone: true
        },{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Task Finished"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = {
    getTasks,
    createTask,
    finishTask
}