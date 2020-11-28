const express = require('express')
const sequelize = require('../db/db')
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
        next(err)
    }
})

//Get Products or by Category
productsRouter.get('/', async (req, res, next) => {
    try{
        //Return by category
        if(req.query.category){
            //SELECT * FROM products where category = {category}
            const product = await Products.findAll({
                where: {
                    category: req.query.category
                }
            })
            res.send(product)
        }else{
            //Return all products
            //SELECT * FROM products
            const product = await Products.findAll()
            res.send(product)
        }
    }catch(err){
        next(err)
    }
})

//Create Product
productsRouter.post('/', async (req, res, next) => {
    if(!req.body || (JSON.stringify(req.body) === '{}')){
        var err = {errors: [{message: 'Provide Product Information'}], status: 400}
        return next(err)
    }else{
        try{
            //INSERT INTO Product ({keys}) VALUES [{values}]
            const product = await Products.create( JSON.stringify(req.body) )
            /*const product = await Products.create({
                sku: req.body.sku,
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                thumbnail: req.body.thumbnail,
                image: req.body.image,
                category: req.body.category,
                stock: req.body.stock
            })*/
            res.status(201).send(product)
        }catch(err){
            next(err)
        }
    }
})

//update Product
productsRouter.put('/:productId', async (req, res, next) => {
    if(!req.params.productId || ((JSON.stringify(req.body) === '{}'))){
        var err = {errors: [{message: 'Provide Product Information'}], status: 400}
        return next(err)
    } else {
        try{
            //UPDATE products SET {key} = {value},... WHERE id = {productId}
            const product = await Products.update(
                JSON.stringify(req.body),
                {
                    where: {
                        id: req.params.productId
                    }
                }
            )
            res.status(200).send(product)
        } catch(err) {
            next(err)
        }
    }
})

//Delete Product
productsRouter.delete('/:productId', async (req, res, next) => {
    if(!req.params.id){
        var err = {errors: [{message: 'Provide Product ID'}], status: 400}
        return next(err)
    } else {
        try{
            //DELETE FROM products WHERE id = {productId}
            await Products.destroy({
                where: {
                    id: req.params.productId
                }
            })
            res.status(204).send()
        }catch(err){
            next(err)
        }
    }
})



module.exports = productsRouter