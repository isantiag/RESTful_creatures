const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override")


// middleware
app.set("view engine","ejs")
app.use(ejsLayouts)
// method-override middleware
app.use(methodOverride("_method"))

// allow to get the req.body
app.use(express.urlencoded({extended:false}))
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));



app.get('/',(req,res)=>{
    res.render('home')
})



app.listen(3000,()=>{
    console.log("on wednesday, we hang out in Port 3000")
})