const { DataTypes } = require("sequelize")
const sequelize = require('../db/db')

module.exports = function(sequelize, Sequelize){
    const Billing = sequelize.define('Billing', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        service: {
            type: DataTypes.STRING
        },
        card: {
            type: DataTypes.INTEGER,
        },
        expiry: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
    })
    return Billing
}