const express = require('express')
const User = require('../models/users')(sequelize, DataTypes)
const userRouter = express.Router()

//Get all Users
/*
userRouter.get('/', (req, res, next) => {
    try{
        const users = await User.findAll()
        req.send(users)
    }catch(err){
        next(err)
    }
})*/

//Get User Information
userRouter.get('/', (req, res, next) => {
    if(!req.user){
        var err = {errors: [{message: 'Please Log in'}], status: 400}
        return next(err)
    }
    try{
        //SELECT * FROM users WHERE email = {user.email}
        const user = await User.findOne({where: {email: req.user.email}})
        res.send(user)
    }catch(err){
        next(err)
    }
})

//Update User Information
userRouter.put('/', (req, res, next) => {
    if(!req.user ||  ((JSON.stringify(req.body) === '{}'))){
        var err = {errors: [{message: 'Provide User ID and information'}], status: 400}
        return next(err)
    }
    try{
        //UPDATE TABLE users SET ({body.keys} = {values}, ..) WHERE email = {user.email}
        const user = await User.update(
            JSON.stringify(req.body), {
                where: {
                    email: req.user.email
                }
            }
            )
        res.send(user)
    }catch(err){
        next(err)
    }
})


module.exports = authRouter