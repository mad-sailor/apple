var express = require('express');
var pool = require('../pool');
var router = express.Router();
router.get('/list',(req,res)=>{
    var uname=req.query.uname;
    var sql = "SELECT  a.uname,a.coun,a.selection,a.cid,b.mtitle,b.price,b.screen,b.pic FROM cart as a,mac_list as b where a.cid=b.cid and a.uname=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err) throw err
        res.send(result);       
    });
});

router.get('/cart/del',(req,res)=>{
    var $cid=req.query.cid
    var sql=`DELETE FROM cart WHERE cid=?`
    pool.query(sql,[$cid],(err,result)=>{
        if(err) throw err;
		res.end();
    });
});
router.get('/cart/up',(req,res)=>{
    var $cid=req.query.cid
    var $coun=req.query.coun
    var sql=`UPDATE cart SET coun=? WHERE cid=?`
    pool.query(sql,[$coun,$cid],(err,result)=>{
        if(err) throw err;
		res.end();
    });
});
router.get('/cart/upselect',(req,res)=>{
    var $cid=req.query.cid
    var $select=req.query.select
    var sql=`UPDATE cart SET selection=? WHERE cid=?`
    pool.query(sql,[$select,$cid],(err,result)=>{
        if(err) throw err;
		res.end();
    })
});

router.get('/checkAll',(req,res)=>{
    var uname = req.query.uname;
    var cks = req.query.cks;
    var sql = "update cart set selection=? where uname=?";
    pool.query(sql,[cks,uname],(err,result)=>{
        if(err) throw err;
		res.end();
    });
});

module.exports = router;