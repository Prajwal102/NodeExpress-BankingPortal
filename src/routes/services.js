const express = require('express');
const router = express.Router();


const {accounts,writeJSON} = require('../data.js');

router.get('/transfer',(req,res)=>{
    res.render('transfer')
})

router.post('/transfer',(req,res)=>{
    from_acc = req.body.from;
    to_acc = req.body.to;
    amt = req.body.amount;

    accounts[from_acc]['balance'] -= amt;
    accounts[to_acc]['balance'] += parseInt(amt, 10);

    writeJSON();
    res.render('transfer',{message:"Transfer Completed"})

});

router.get('/payment',(req,res)=>{
    res.render('payment',{accounts:accounts.credit})
})

router.post('/payment', (req, res) => {
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount);
    writeJSON();
    res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});


module.exports = router;