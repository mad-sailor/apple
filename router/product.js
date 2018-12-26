const express = require('express');
var router = express.Router();
var pool = require('../pool.js');

router.get('/list',(req,res)=>{
    var pno = req.query.pno;
    var where = req.query.where;
    var output = {};
    if(pno==undefined){
        pno = 1;
    }
    if(where==undefined){
        where = " ";
    }
    var sql = `SELECT count(mtitle) FROM mac_list ${where}`;
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        output["total"] = result[0]["count(mtitle)"];
        var start = (pno-1)*9;
        var sql = `SELECT * FROM mac_list ${where} limit ${start},9`;
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            output["data"] = result;
            output["pageCount"] = Math.ceil(output["total"]/9);
            output["pno"] = pno;
            res.send(output);
        });
    });
});

router.get('/add',(req,res)=>{
    var cid = req.query.cid;
    var uname = req.query.uname;
    var sql = "SELECT id,coun FROM cart WHERE uname=? AND cid=?";
    pool.query(sql,[uname,cid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var coun = parseInt(result[0]['coun']);
            var sql = `UPDATE cart SET coun=${coun+1} WHERE uname=? AND cid=?`;
        }else{
            var sql = "INSERT INTO cart (id,uname,coun,cid,selection) VALUES(null,?,1,?,0)";
        }
        pool.query(sql,[uname,cid],(err,result)=>{
            if(err) throw err;
            res.send({code:1});
        })
    });
    
    
});

module.exports = router;