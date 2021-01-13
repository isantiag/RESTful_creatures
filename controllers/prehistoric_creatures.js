const express = require('express');
const router = express.Router();
const fs = require("fs")

// index route
router.get('/',(req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creaturesData = JSON.parse(creatures)
    res.render('prehistoric_creatures/index.ejs', {myCreatures:creaturesData})
})

// get new creature form
router.get('/new', (req,res)=>{
    res.render('prehistoric_creatures/new.ejs')
})

// show route
router.get('/:idx', (req,res)=>{
    // get creature data from json file
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    // Converter JSON file in Javascript - array
    let creaturesData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)

    res.render('prehistoric_creatures/show.ejs', {creature: creaturesData[creatureIndex]})

})

// post route
router.post('/', (req,res)=>{
    // console.log(req.body)
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creaturesData = JSON.parse(creatures)

    // add new dino to the array
    creaturesData.push(req.body)

    // save new dinosaurs array to the json file (converter back to json first)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))

    // redirect to the GET /dinosaurs route
    res.redirect('/prehistoric_creatures')
})

module.exports = router;