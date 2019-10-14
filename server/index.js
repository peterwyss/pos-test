var app = require('express')();
var cors = require('cors');
var mysql  = require('mysql');
var pool = require('./database');
app.use(cors());

var list = [];



app.get("/",function(req,res){
      let query = "SELECT articleButtons.label as name, products.price from articleButtons,products where articleButtons.link = products.id";
      pool.query(query, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
      });
    });  
 
    app.get("/getArticle",function(req,res){
      let query = "SELECT * from products";
      pool.query(query, function (error, results, fields) {
       if (error) throw error;
       console.log(results)
       res.end(JSON.stringify(results));
      });
    });  


app.listen(3001, function(){
  console.log('listening on *:3000');
});