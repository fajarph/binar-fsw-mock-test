const { Sequelize } = require("sequelize");
const db = require("../config/Database.js")
const Users = require("../models/user.js")

const { DataTypes } = Sequelize

const Tasks = db.define('tasks',{
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

Users.hasMany(Tasks)
Tasks.belongsTo(Users, {foreignKey: "userId"})

module.exports = Tasks;