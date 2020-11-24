const { DataTypes } = require("sequelize")
const sequelize = require('../db/db')
const User = require('./users')(sequelize, DataTypes)
const Product = require('./products')(sequelize, DataTypes)

module.exports = function(sequelize, Sequelize) {
    const Order = sequelize.define('Orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
        },
    })
    return Order
}