const { DataTypes } = require("sequelize")
const sequelize = require('../db/db');

module.exports = function (sequelize, Sequelize){
    const Product = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sku: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true, //change to false for production
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
        },
        thumbnail: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
        }
    })
    return Product
}