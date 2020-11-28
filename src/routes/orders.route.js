const express = require('express')
const sequelize = require('../db/db')
const { DataTypes, Op } = require("sequelize")
const User = require('../models/users')(sequelize, DataTypes)
const Order = require('../models/orders')(sequelize, DataTypes)
const ordersRouter = express.Router()

//Get Orders
ordersRouter.get('/', (req, res, next) => {
    try{
        //SELECT id FROM users WHERE email = {req.user.email}
        const userId = await User.findOne({attributes: ['id']}, {where: {email: req.user.email}})
        //SELECT * FROM orders WHERE (user_id = {userId} AND (status <> 'cart'))
        const orders = await Order.findAll({
                where: {
                    [Op.and]: [{user_id : userId}, {[Op.ne]: [{status: 'cart'}]}]
                }
            }
        )
        res.send(orders)
    }catch(err){
        next(err)
    }
})

//Get Order by id
ordersRouter.get('/:id', (req, res, next) => {
    try{
        //SELECT id FROM users WHERE email = {req.user.email}
        const userId = await User.findOne({attributes: ['id']}, {where: {email: req.user.email}})
        //SELECT * FROM orders WHERE user_id = {userId} AND id = {req.params.id}
        const order = await Order.findOne({
            where: {
                [Op.and]: [
                    {user_id: userId}, {id: req.params.id}
                ]
            }
        })
        res.send(order)
    }catch(err){
        next(err)
    }
})


//var err = {errors: [{message: 'Provide Product Information'}], status: 400}
//return next(err)
module.exports = ordersRouter