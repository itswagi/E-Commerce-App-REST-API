require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const sequelize = require('./db/db')
const { DataTypes } = require("sequelize");
const User = require('./models/users')(sequelize, DataTypes)
const Order = require('./models/orders')(sequelize, DataTypes)
const Product = require('./models/products')(sequelize, DataTypes)
const Billing = require('./models/billing')(sequelize, DataTypes)

const app = express()

//Middleware
app.use(bodyParser.json())
app.use(morgan('dev'))

app.listen(process.env.PORT, async () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    try{
        await sequelize.authenticate()
        await sequelize.sync(
            {force: true}
        )
        console.log('Connected to database')
    }catch(error){
        console.error(`Error: Cannot connect to database ${error}`)
    }
})