const express = require('express')
const passport = require('passport')
const sequelize = require('../db/db');
const { DataTypes } = require("sequelize");
const User = require('../models/users')(sequelize, DataTypes)

const authRouter = express.Router()

const isLoggedIn = (req, res, next) => {
    if(!req.user){
        next()
    }
    else{
        var err = {errors: [{message: 'Already Logged in'}], status: 403}
        next(err)
    }
}

const isAuthenticated = (req,res,next) => {
    if(req.user)
       next()
    else{
        var err = {errors: [{message: 'UnAuthorized, Please Log In'}], status: 401}
        next(err)
    }
}

authRouter.post('/register', isLoggedIn, async (req, res, next) => {
    if (req.query.username === ''){
        var err = {errors: [{message: 'Invalid Password'}], status: 422}
        return next(err)
    }
    if (req.query.password === ''){
        var err = {errors: [{message: 'Invalid Password'}], status: 422}
        return next(err)
    }
    try{
        await User.create({email: req.query.username, password: req.query.password})
        res.status(201).json({message: 'Registered'})
    }catch(err){
        return next(err)
    }
})

authRouter.post('/login', isLoggedIn, passport.authenticate('local'), (req, res, next) => {
    res.status(200).json({message: 'Login Successful'})
})

authRouter.use(isAuthenticated)

authRouter.post('/logout', (req, res, next) => {
    req.logout()
    res.status(200).json({message: 'Log Out Successful'})
} )
//Error Handler
authRouter.use((err, req, res, next) => {
    res.status(err.status || 400).json({message: err.errors[0].message})
})



module.exports = authRouter