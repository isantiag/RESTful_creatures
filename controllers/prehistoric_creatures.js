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

router.get("/edit/:idx", (req,res)=>{
    // get creatures data from json file
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    // Converter JSON file in Javascript - array
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = req.params.idx

    res.render('prehistoric_creatures/edit.ejs', {myCreature: creatureData[creatureIndex], creatureIdx: creatureIndex})
})

// show route
router.get('/:idx', (req,res)=>{
    // get creature data from json file
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    // Converter JSON file in Javascript - array
    let creaturesData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = req.params.idx

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

router.delete("/:idx", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creaturesData = JSON.parse(creatures)

    // remove the delete creature from the creatures array - 1st arg is start point, 2 snd lenght
    creaturesData.splice(req.params.idx,1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    
     res.redirect('/prehistoric_creatures')

})

router.put("/:idx", (req,res)=>{
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    let creaturesData = JSON.parse(creatures)

    // get array index from url parameter
    creaturesData[req.params.idx].type = req.body.type
    creaturesData[req.params.idx].img_url = req.body.img_url

     // save the new creature to the data.json file
     fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
    
     res.redirect('/prehistoric_creatures')
})

module.exports = router;