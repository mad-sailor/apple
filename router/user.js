var express = require('express');
var pool = require('../pool');
var router = express.Router();

router.get('/login',(req,res)=>{
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    var reg=/^[a-zA-Z][a-zA-Z0-9]{2,8}$/;
    if(uname==undefined){
        res.send({code:-1,msg:"用户名不能为空!"});
        return ;
    }
    if(upwd==undefined){
        res.send({code:-1,msg:'密码不能为空!'});
        return ;
    }
    if(!reg.test(uname)){
        res.send({code:-1,msg:"用户名格式错误!"});
        return;
    }
    var reg=/^[a-zA-Z0-9]{6,16}$/;
    if(!reg.test(upwd)){
        res.send({code:-1,msg:"密码格式错误!"});
        return;
    }
    var sql = 'SELECT uid FROM users WHERE uname=? and upwd=?';
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw new Error(err);
        if(result.length==0){
            res.send({code:-1,msg:'用户名或密码错误!'});
        }else{
            req.session.uid = result[0].uid;
            res.send({code:1,msg:'登录成功!'});
        }
    });
});

router.get('/register',(req,res)=>{
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    var email = req.query.email;
    var reg=/^[a-zA-Z][a-zA-Z0-9]{2,8}$/;
    if(uname==undefined){
        res.send({code:-1,msg:"用户名不能为空!"});
        return ;
    }
    if(upwd==undefined){
        res.send({code:-1,msg:'密码不能为空!'});
        return ;
    }
    if(email==undefined){
        res.send({code:-1,msg:'邮箱不能为空!'});
    }
    if(!reg.test(uname)){
        res.send({code:-1,msg:"用户名格式错误!"});
        return;
    }
    var reg=/^[a-zA-Z0-9]{6,16}$/;
    if(!reg.test(upwd)){
        res.send({code:-1,msg:"密码格式错误!"});
        return;
    }
    var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if(!reg.test(email)){
        res.send({code:-1,msg:"邮箱格式错误!"});
        return;
    }
    var sql = "SELECT uid FROM users WHERE uname=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw new Error(err);
        if(result.length==0){
            var sql = "INSERT INTO users VALUES(null,?,?,?)";
            pool.query(sql,[uname,upwd,email],(err,result)=>{
            if(err) throw new Error(err);
                var sql = "SELECT uid FROM users WHERE uname=?";
                pool.query(sql,[uname],(err,result)=>{
                    req.session.uid = result[0].uid;
                    res.send({code:1,msg:'注册成功!'});
                });
            })
        }else{
            res.send({code:-1,msg:'用户名已存在!'});
        }
    })
    
});

router.get('/islogin',(req,res)=>{
    var uid = req.session.uid;
    if(uid){
        var sql = "SELECt uname FROM users WHERE uid=?";
        pool.query(sql,[uid],(err,result)=>{
            if(err) throw new Error(err);
            var uname=result[0].uname;
            res.send({code:1,uname});
        });
    }else{
        res.send({code:-1});
    }
})

router.get('/signout',(req,res)=>{
    delete req.session.uid;
    res.send({code:-1});
});

module.exports = router;