const { DataTypes } = require("sequelize")
const sequelize = require('../db/db')
const User = require('./users')
const Product = require('./products')

module.exports = function(sequelize, Sequelize) {
    const Order = sequelize.define('Orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            references: {
                model: User,
                key: 'id'
            }
        },
        product_id: {
            references: {
                model: Product,
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['cart', 'confirmed', 'shipped'],
            defaultValue: 'cart' 
        }
    })
    return Order
}