const { DataTypes } = require("sequelize")
const sequelize = require('../db/db');
const bcrypt = require('bcrypt')
const Billing = require('./billing')(sequelize, DataTypes)

module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            notEmpty: true
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false,
            notEmpty: true,
        },
        billing_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Billing,
                key: 'id'
            }
        }
    }, 
    {
        timestamps: false,
        
    })

    User.prototype.validPassword = async function(password) {      
        return await bcrypt.compare(password, this.password)
    }
    User.beforeCreate(async (user, options) => {
        return user.password = await bcrypt.hash(user.password, 10)
    })
    User.beforeUpdate(async (user, options) => {
        console.log('1')
        return user.password = await bcrypt.hash(user.password, 10)
    })
    return User
}