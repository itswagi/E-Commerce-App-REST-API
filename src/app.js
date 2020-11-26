require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const sequelize = require('./db/db')
const { DataTypes } = require("sequelize");
const passport = require('passport')
const session    = require('express-session');
const User = require('./models/users')(sequelize, DataTypes)
const Order = require('./models/orders')(sequelize, DataTypes)
const Product = require('./models/products')(sequelize, DataTypes)
const Billing = require('./models/billing')(sequelize, DataTypes)
const authRouter = require('./routes/auth')
require('./controllers/auth.controller')
const app = express()

//Middleware
app.use(bodyParser.json())
app.use(morgan('dev'))
//app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true}));
//app.use(passport.initialize())
//app.use(passport.session())

const authjwt = require('./routes/authjwt')

app.use('/', authjwt)
app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Reached Endpoint')
})
app.use('/auth', authRouter)

app.get('/', (req,res) => {
    res.send('Hello!')
})


app.listen(process.env.PORT, async () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    try{
        await sequelize.authenticate()
        await sequelize.sync(
            //{force: true}
        )
        console.log('Connected to database')
    }catch(error){
        console.error(`Error: Cannot connect to database ${error}`)
    }
})