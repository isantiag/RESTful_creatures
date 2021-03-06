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

router.get("/edit/:idx", (req,res)=>{
    // get dinosaur data from json file
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    // Converter JSON file in Javascript - array
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    res.render('dinosaurs/edit.ejs', {myDino: dinoData[dinoIndex], dinoIdx: dinoIndex})
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

router.delete("/:idx", (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs) 

    // remove the delete dinosaur from the dinosaurs array - 1st arg is start point, 2 snd lenght
    dinoData.splice(req.params.idx,1)

    // save the new dinosaurs to the data.json file
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    
    res.redirect('/dinosaurs')

})

router.put("/:idx", (req,res)=>{
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs) 

    // get array index from url parameter
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

     // save the new dinosaurs to the data.json file
     fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    
     res.redirect('/dinosaurs')
})



module.exports = router;