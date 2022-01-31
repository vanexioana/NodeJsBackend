const Sequelize = require("sequelize");



require('dotenv').config({})
let sequelize

if (process.env.NODE_ENV === "development"){
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.db'
    })}
else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
}

module.exports = {sequelize}