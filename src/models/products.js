const { DataTypes } = require("sequelize")
const sequelize = require('../db/db');
const Users = require('./users')(sequelize, DataTypes)

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
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
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
    },
    {
        timestamps: false,
        
    })
    return Product
}