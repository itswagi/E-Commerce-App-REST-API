const express = require('express')
const User = require('../models/users')(sequelize, DataTypes)
const userRouter = express.Router()

//Get all Users
userRouter.get('/', (req, res, next) => {
    try{
        const users = await User.findAll()
        req.send(users)
    }catch(err){
        next(err)
    }
})

//Get User Information
userRouter.get('/:userId', (req, res, next) => {
    if(!req.params.userId){
        var err = {errors: [{message: 'Provide User ID'}], status: 400}
        return next(err)
    }
    try{
        const user = await User.findById(req.params.userId)
        res.send(user)
    }catch(err){
        next(err)
    }
})


module.exports = authRouter