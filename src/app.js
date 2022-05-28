const fs = require('fs');
const path = require('path')

const {accounts,users,writeJSON} = require('./data.js');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');
const express = require('express');
const { ap } = require('ramda');
const app = express();

const PORT = process.env.port || 3000;

app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended:true}))


app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('index',{title:'Account Summary',accounts:accounts})
});

app.use('/account',accountRoutes);
app.use('/services',servicesRoutes);

app.get('/profile',(req,res)=>{
    res.render('profile',{user:users[0]})
})




app.listen(PORT,()=>{
    console.log("PS Project Running on port 3000!")
})
