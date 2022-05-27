const fs = require('fs');
const path = require('path')


const express = require('express');
const app = express();

const PORT = process.env.port || 3000;

app.use(express.static(path.join(__dirname,'/public')))


app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('index',{title:'Index'})
});


app.listen(PORT,()=>{
    console.log("PS Project Running on port 3000!")
})