
// sequelize helper methods
// 1. findAll()
// 2. findOne()
// 3. create()
// 4. update()
// 5. destroy()



// DEPENDENCIES
// this is an express server we are using to route
const bands = require("express").Router();
// grabing the models folder here gives us access to all of the models
const db = require("../models");
// destructuring bands here to keep us from having to specify which db each time
const { Band } = db;
const {Op} = require("sequelize")


// 1. FIND ALL BANDS
// this starts with bands.get because thats the server we are making a request on im not sure about this part.
bands.get('/', async (req, res) => {
    try {
        // saving the found things to a variable.
        // notice we use Band.findAll() here because we destructed the specific table we wanted above.
        const foundBands = await Band.findAll(
            // this syntax is confusing af definitely dont try and do this without documentation. 
            {
                // this is ordering our data fairly straightforward
            order: [["available_start_time", "ASC"]],
            where: {
                // this is using query params to get specific bands using a ternary
                // the ternary uses querry params if there are some and using an empty string iff query params are null.
                name: {[Op.like]: `%${req.query.name ? req.query.name : ""}%`}
            }
        })


        // including these res.status codes is best practice.
        res.status(200).json(foundBands)
    } 
    // this is a catch statement pretty standard for all of our request.
    catch (error) {
        res.status(500).json(error)
    }
})

// 2. FIND A SPECIFIC BAND
bands.get('/:id', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            // this is where we blend sequelize with what we already know about using req.params.id
            where: { band_id: req.params.id }
        })
        res.status(200).json(foundBand)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// 3. CREATE A BAND
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            // this is just a json response this might need to get more complicated for different apps.
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// 4. UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// 5. DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})




// EXPORT
module.exports = bands;
