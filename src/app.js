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
const cors = require('cors')
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = YAML.load('./swagger.yaml');
//const authRouter = require('./routes/auth')
require('./controllers/auth.controller')
const app = express()



//Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(morgan('dev'))
//Disabled for development
//app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true}));
//app.use(passport.initialize())
//app.use(passport.session())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const authRouter = require('./routes/authjwt')
const productsRouter = require('./routes/products.route')
const ordersRouter = require('./routes/orders.route')
const billingRouter = require('./routes/billing.route')

//User Signup and Login Routes
app.use('/', authRouter)
app.use(passport.authenticate('jwt', { session: false })) //Authorization Middleware
app.use('/products', productsRouter)
app.use('/order', ordersRouter)
app.use('/billing', billingRouter)
/*
app.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Reached Endpoint')
})*/
//Disabled for Development
//app.use('/auth', authRouter)


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