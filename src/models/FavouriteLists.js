const sequelize = require("../sequelize.js").sequelize
const Sequelize = require("sequelize")
const Video = require("./Video")

const FavouriteList = sequelize.define('favourite_list', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    description: {
        type: Sequelize.TEXT,
        validate: {
            min: {
                args: [5],
                msg: "Minimum 5 characters required in description"
            }
        }
    },
    date: {
        type: Sequelize.DATE
    }
})

FavouriteList.hasMany(Video)

module.exports = FavouriteList