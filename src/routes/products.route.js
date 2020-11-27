const express = require('express')

const productsRouter = express.Router()

//Create Product

productsRouter.get('/', (req, res, next) => {
    res.send('Allowed')
})

module.exports = productsRouter