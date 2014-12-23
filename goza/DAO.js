var express =  require('express');
var fs = require("fs");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "",
    database:"test"
});
connection.connect();

var addNews=function(jsonString,response)
  {console.log("ololo add");

  var data = JSON.parse(jsonString);

  var query = "insert into news (head,body,picture,use_flag,news_date) values ('"+data.head+"','"+data.body+"','"+data.picture+"','"+data.use_flag+"','"+data.news_date+"')";
console.log(query);

  connection.query(query, function(err,rows,fields)
  {
    if(!err)
    {
      response.end(null,"UTF-8");
    }
    else
    {
      console.log("ERRRRRRROOOOORRRR!!!!!"+err);
    }
  });
//  connection.end();
}

var deleteNews=function(id,response){
  var query = "delete from news where id="+id;
  //connection.connect();
  connection.query(query, function(err,rows,fields)
  {
    if(!err)
      {
        response.end(null,"UTF-8");
      }
      else
      {
        console.log(err);
      }
  });
//  connection.end();
}


var editNews=function(jsonString,response){
  var data = JSON.parse(jsonString);
  console.log("ololo");
  var query = "update news set head='"+data.head+"',body='"+data.body+"',picture='"+data.picture+"',use_flag='"+data.use_flag+"',news_date='"+data.news_date+"' where id="+data.id;
//  connection.connect();
  connection.query(query, function(err,rows,fields)
  {
    if(!err){
      response.end(null,"UTF-8");
    }
    else
    {
      console.log(err);
    }
  });
//  connection.end();
};


var getListOfNews=function(response){
  var query = "select * from news";
  var emptyArray={};
  var arr = [];
//  connection.connect();
  connection.query(query, function(err,results)
  {
    if(!err)
    {
      for(var i=0;i<results.length;i++){
        var newsAdd = {};
        newsAdd["id"]=results[i].id;
      newsAdd["head"]=results[i].head;
        newsAdd["body"]=results[i].body;
        newsAdd["picture"]=results[i].picture;
        newsAdd["use_flag"]=results[i].use_flag;
      newsAdd["news_date"]=results[i].news_date;
      arr.push(newsAdd);
      }
      //console.log(arr);
      response.end(JSON.stringify(arr),"UTF-8");

    }
    else
    {
    console.log(err);
    }
  });
//  connection.end();
}


var getNewsById=function(id,response){
  var query = "select * from news where id="+id;
//  connection.connect();
  var arr = new Array;
  var resultJson;
  connection.query(query, function(err,results)
  {
    if(!err)
    {
      arr["id"]=results[0]['id'];
      arr["head"]=results[0]['head'];
      arr["body"]=results[0]['body'];
      arr["picture"]=results[0]['picture'];
      arr["use_flag"]=results[0]['use_flag'];
      arr["news_date"]=results[0]['news_date'];
      resultJson = JSON.stringify(arr);
      response.end(JSON.stringify(resultJson),"UTF-8");
    }
    else
    {
      console.log(err);
    }
  });
//  connection.end();
};


module.exports.addNews = addNews;
module.exports.editNews = editNews;
module.exports.deleteNews = deleteNews;
module.exports.getNewsById = getNewsById;
module.exports.getListOfNews = getListOfNews;
