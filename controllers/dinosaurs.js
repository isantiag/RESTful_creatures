const express = require('express');
const router = express.Router();
const fs = require("fs")

// index route
router.get('/',(req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {myDinos:dinoData})
})

// get new dino form
router.get('/new', (req,res)=>{
    res.render('dinosaurs/new.ejs')
})

// show route
router.get('/:idx', (req,res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    // Converter JSON file in Javascript - array
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)

    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})

})

// post route
router.post('/', (req,res)=>{
    // console.log(req.body)
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to the array
    dinoData.push(req.body)

    // save new dinosaurs array to the json file (converter back to json first)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the GET /dinosaurs route
    res.redirect('/dinosaurs')
})







module.exports = router;