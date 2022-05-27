const fs = require('fs');
const path = require('path')


const express = require('express');
const app = express();

const PORT = process.env.port || 3000;

app.use(express.static(path.join(__dirname,'/public')))


app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


const accountData = fs.readFileSync('src/json/accounts.json',options={encoding:'utf8'});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json',options={encoding:'utf8'});
const users = JSON.parse(userData);
console.log(users);
app.get('/',(req,res)=>{
    res.render('index',{title:'Account Summary',accounts:accounts})
});

app.get('/savings',(req,res)=>{
    res.render('account',{account:accounts.savings})
});

app.get('/credit',(req,res)=>{
    res.render('account',{account:accounts.credit})
});
app.get('/checking',(req,res)=>{
    res.render('account',{account:accounts.checking})
});

app.get('/profile',(req,res)=>{
    res.render('profile',{user:users[0]})
})


app.listen(PORT,()=>{
    console.log("PS Project Running on port 3000!")
})