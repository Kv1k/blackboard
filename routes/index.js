var express = require('express');
var router = express.Router();

var articleModel = require('../models/articles');
var orderModel = require('../models/order');
var userModel= require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  let admin = await userModel.findOne({ _id:'5c52e4efaa4beef85aad5e52'});
  res.render('tasks', {admin });
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
  //5c52e4efaa4beef85aad5e52
  let admin = await userModel.findOne({ _id:'5c52e4efaa4beef85aad5e52'});
  console.log(admin);

  res.render('messages', { admin });
});

/* GET Messages page. */
router.get('/users-page', async function(req, res, next) {
  var users= await userModel.find({
    status:"customer"
  });

  res.render('users', { users });
});

/* GET Messages page. */
router.get('/catalog-page', async function(req, res, next) {
  var articlesData=  await articleModel.find();
  res.render('catalog', {articlesData});
});

/* GET Messages page. */
router.get('/orders-list-page', async function(req, res, next) {
  var orders = await orderModel.find()

  res.render('orders-list', { orders });
});

/* GET Messages page. */
router.get('/order-page', async function(req, res, next) {
  var order = await orderModel.findById(req.query.id)
  .populate('articles')
  .exec();
  res.render('order', { order });
});

router.get('/charts', async function(req, res, next) {
  var users = await userModel.find();
  for (let i =0 ; i<users.length; i++){
    if(users[i].gender==='male'){
      var aggregate = userModel.aggregate();
      aggregate.match({"gender": "male"})

      aggregate.group({ _id : "$gender", useraccount: { $sum:1}});
      var maleAgre = await aggregate.exec();
      var maleNum= maleAgre[0].useraccount;
     
    }
    if(users[i].gender==='female'){
      var aggregate = userModel.aggregate();
      aggregate.match({"gender": "female"})

      aggregate.group({ _id : "$gender", useraccount: { $sum:1}});
      var femaleAgre = await aggregate.exec();
      var femaleNum= femaleAgre[0].useraccount;
     
    }
  }
  let admin = await userModel.findOne({ _id:'5c52e4efaa4beef85aad5e52'});
  
  let lu=0;
  let nonlu=0;
  for (let i =0 ; i <admin.messages.length; i++){
    if(admin.messages[i].read === true){
      lu++;
     
    }
    if(admin.messages[i].read === false){
     nonlu++;
     
    }
  }

  var orders= await orderModel.find();

  for(let i= 0; i< orders.length; i++){

    if(orders[i].status_payment==="validated"){

      var aggregate = orderModel.aggregate();

      aggregate.match({"status_payment": "validated"})

      aggregate.group({ _id : "$status_payment", account: { $sum:1}});

      var orderVAgre = await aggregate.exec();
      var orderValidatedNum= orderVAgre[0].account;
    }
    if(orders[i].status_payment==="waiting"){
      var aggregate = orderModel.aggregate();
      aggregate.match({"status_payment": "waiting"})

      aggregate.group({ _id : "$status_payment", account: { $sum:1}});
      var orderWAgre = await aggregate.exec();
      var orderWaitingNum= orderWAgre[0].account;
    }
  }

  orders= await orderModel.find();

  for(let i= 0; i< orders.length; i++){

    if(orders[i].status_payment==="validated"){

      var aggregate = orderModel.aggregate(); 
      aggregate.match({"status_payment": "validated"})
      aggregate.group({ _id : {year:{$year:"$date_insert"},month: {$month:'$date_insert'}, CA: {$sum:"$total"} }, });
      aggregate.sort({_id:1});
      var ordersAgre = await aggregate.exec();
  
    }
 
  }
  res.render('charts',{femaleNum, maleNum, lu, nonlu, orderValidatedNum,orderWaitingNum, orders, ordersAgre});
});



module.exports = router;
