const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const blogRoutes = require("./routes/articles.js")
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({ extended:false }))
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect('mongodb+srv://vinayaksharma07:Mongo$123@cluster0.4it5p.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use(methodOverride('_method'))

app.use("/",blogRoutes);


app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(3000,()=>{
    console.log(`Server is Running: http://localhost:3000`)
})