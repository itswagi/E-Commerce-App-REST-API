const express = require('express')
const sequelize = require('../db/db')
const { DataTypes, Op } = require("sequelize")
const User = require('../models/users')(sequelize, DataTypes)
const Order = require('../models/orders')(sequelize, DataTypes)
const ordersRouter = express.Router()

//Get Orders
ordersRouter.get('/', async (req, res, next) => {
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
ordersRouter.get('/:id', async (req, res, next) => {
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

//Create Order
ordersRouter.post('/', async (req, res, next) => {
    if(!req.body || (JSON.stringify(req.body) === '{}')){
        var err = {errors: [{message: 'Provide Order Information'}], status: 400}
        return next(err)
    }
    try{
        //SELECT id FROM users WHERE email = {req.user.email}
        const userId = await User.findOne({attributes: ['id']}, {where: {email: req.user.email}})
        req.body.user_id = userId
        const order = await Order.create(JSON.stringify(req.body))
        res.status(201).send(order)
    }catch(err){
        next(err)
    }
})

//Update Order
ordersRouter.put('/:id', async (req, res, next) => {
    if(!req.params.id || ((JSON.stringify(req.body) === '{}'))){
        var err = {errors: [{message: 'Provide Order Information'}], status: 400}
        return next(err)
    }
    try{
        const userId = await User.findOne({attributes: ['id']}, {where: {email: req.user.email}})
        req.body.user_id = userId
        const order = await Order.update(
            JSON.stringify(req.body), {
                where: {
                    [Op.and]: [
                        {id: req.params.id}, {user_id: userId}
                    ]
                }
            }
        )
        res.status(200).send(order)
    }catch(err){
        next(err)
    }
})

//Delete Order
ordersRouter.delete('/:id', async (req, res, next) => {
    try{
        await Order.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(204).send()
    }catch(err){
        next(err)
    }
})

module.exports = ordersRouter