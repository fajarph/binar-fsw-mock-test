const { Sequelize } = require("sequelize");
const db = require("../config/Database.js")
const User = require("../models/user.js")

const { DataTypes } = Sequelize

const Task = db.define('tasks',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    summary:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    isDone:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
})

User.hasMany(Task)
Task.belongsTo(User, {foreignKey: "userId"})

module.exports = Task;