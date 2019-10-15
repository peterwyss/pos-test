var express = require('express');
var app = express();
var cors = require('cors');
var mysql  = require('mysql');
var bodyParser = require('body-parser');
var pool = require('./database');
var methodOverride = require('method-override');
  

var list = [];


var jsonParser = bodyParser.json()

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(cors());
app.use(methodOverride());

app.get("/",function(req,res){
      let query = "SELECT articleButtons.label, products.name , products.price from articleButtons,products where articleButtons.link = products.id";
      pool.query(query, function (error, results, fields) {
       if (error) throw error;
       console.log("-> ",results);
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
    app.post("/articleButton",  function(req,res){
      console.log("save articleButton")
      console.log(req.body);
      let query = "INSERT INTO articleButtons (label,category, link) VALUES ('"+req.body.label+"','"+req.body.category+"', '"+req.body.link+"') ";
      console.log(query);
      pool.query(query, function (error, results, fields) {
       if (error) throw error;
       //console.log(results)
       res.end(JSON.stringify(results));
      });
    });  


app.listen(3001, function(){
  console.log('listening on *:3000');
});