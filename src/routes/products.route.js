const express = require('express')
const sequelize = require('../db/db');
const { DataTypes } = require("sequelize")
const Products = require('../models/products')(sequelize, DataTypes)
const {Op} = require('sequelize')
const productsRouter = express.Router()

//Get Product by ID
productsRouter.get('/:productId', async (req, res, next) => {
    try{
        //SELECT * FROM products WHERE id = {productId}
        const product = await Products.findOne(
            {
                where: {
                    id: req.params.productId
                }
            }
        )
        res.send(product)
    }catch(err){
        console.log(err)
    }
})



module.exports = productsRouter