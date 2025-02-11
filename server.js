// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require("sequelize");

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ALL OF THE COMMENTED OUT CODE BELOW is no longer needed when using the sequelize CLI to instantiate the connection

// SEQUELIZE CONNECTION
// place this above anywhere the database is needed. 
// const sequelize = new Sequelize(process.env.PG_URI)

// try {
//     sequelize.authenticate() 
//     console.log(`Connected with Sequelize at ${process.env.PG_URI}`) 
// } catch(err) {
//     console.log(`Unable to connect to PG: ${err}`) 
// }

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
// this line specifies all request coming from the controller are from the /bands route
app.use('/bands', bandsController)


// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})