const { Sequelize } = require("sequelize")

const db = new Sequelize('binar_mock_test','postgres','27fajar03',{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = db;