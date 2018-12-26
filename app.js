var express=require("express");
var bodyParser=require("body-parser");
var user = require('./router/user');
var cart = require('./router/cart');
var product = require('./router/product');
const session = require('express-session');

var app=express();
app.listen(8888);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
app.all('*',(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1');
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});
app.use(session({
    secret:'随机字符串',
    cookie:{maxAge:60*1000*30},
    resave:false,
    saveUninitialized:true
}));

app.use('/user',user);
app.use('/product',product);
app.use('/cart',cart);