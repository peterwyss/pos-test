import io  from 'socket.io-client';
var socket = io('http://localhost:3000');
var articleList = [];

export function getList(cb){
    console.log("getList");
    socket.emit('articleList', function(res){
        console.log("res :"+res);
        socket.on('articleList' ,function(alist){
            articleList = alist;
        })      
      });
   console.log(articleList);   
   callback(articleList);
    
}