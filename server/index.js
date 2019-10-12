var app = require('express')();
var cors = require('cors');
var mysql  = require('mysql');

app.use(cors());
var pool = mysql.createPool({
    connectionLimit: 10,
    host     : 'localhost',
    user     : 'pos',
    password : 'pos',
    database: "pwcPos"
  });

//var result = [];
var list = [];

function getData(callback){
    pool.getConnection(function(err,connection){
        if(err){
            callback(err);
          
            return;
        }
      console.log('connected as id ' + connection.threadId);

     connection.query('SELECT *from products',function(error,results,fields){
        console.log("Result: ",results);
        callback(results);
     })
 
    connection.release();
  });
} 
app.get("/",function(req,res){
     
   getData(cb);
   function cb(data){
     console.log("Data:",data)
     res.send(data);
   }
  });


app.listen(3001, function(){
  console.log('listening on *:3000');
});