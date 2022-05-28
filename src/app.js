const fs = require('fs');
const path = require('path')

const {accounts,users,writeJSON} = require('./data.js');
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


app.get('/transfer',(req,res)=>{
    res.render('transfer')
})

app.post('/transfer',(req,res)=>{
    from_acc = req.body.from;
    to_acc = req.body.to;
    amt = req.body.amount;

    accounts[from_acc]['balance'] -= amt;
    accounts[to_acc]['balance'] += parseInt(amt, 10);

    writeJSON();
    res.render('transfer',{message:"Transfer Completed"})

});

app.get('/payment',(req,res)=>{
    res.render('payment',{accounts:accounts.credit})
})

app.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});


app.listen(PORT,()=>{
    console.log("PS Project Running on port 3000!")
})
