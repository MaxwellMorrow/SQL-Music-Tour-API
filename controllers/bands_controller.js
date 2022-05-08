// DEPENDENCIES
// this is an express server we are using to route
const bands = require("express").Router();
// grabing the models folder here gives us access to all of the models
const db = require("../models");
// destructuring bands here to keep us from having to specify which db each time
const { Band } = db;


// FIND ALL BANDS
bands.get('/', async (req, res) => {
    try {
        // saving the found things to a variable.
        const foundBands = await Band.findAll()
        // including these res.status codes is best practice.
        res.status(200).json(foundBands)
    } 
    // this is a catch statement pretty standard for all of our request.
    catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND
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

// CREATE A BAND
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

// UPDATE A BAND
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

// DELETE A BAND
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
