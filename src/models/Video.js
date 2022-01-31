const Sequelize = require("sequelize");
const sequelize = require("../sequelize.js").sequelize;

const Video = sequelize.define('video', {
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
    title: {
        type: Sequelize.STRING,
        validate: {
            min: {
                args: [5],
                msg: "Minimum 5 characters required in title"
            }
        }
    },
    url: {
        type: Sequelize.STRING,
        validate: {
            is: {
                args: ["^https:\\/\\/www\\.[a-z]*\\.[a-z]*", 'i']
            }
        }
    }
})

module.exports = Video;