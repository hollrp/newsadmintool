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
  {

  var data = JSON.parse(jsonString);

  var query = "insert into news (head,body,picture,use_flag,news_date,news_group) values ('"+data.head+"','"+data.body+"','"+data.picture+"','"+data.use_flag+"','"+data.news_date+"','"+data.news_group+"')";


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
  var query = "update news set head='"+data.head+"',body='"+data.body+"',picture='"+data.picture+"',use_flag='"+data.use_flag+"',news_date='"+data.news_date+"',news_group='"+data.news_group+"' where id="+data.id;
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


var getListOfNews=function(from,group,useFlag,response){
  if (group=="group1" || group=="group2"){
    var query = "select * from news where news_group='"+group+"'AND use_flag='"+useFlag+"' LIMIT "+from+", 10";
  } else {
    var query = "select * from news where use_flag='"+useFlag+"' LIMIT "+from+", 10";
  }

  console.log(query);
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
      newsAdd["news_group"]=results[i].news_group;
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


var getRowsNum=function(group,useFlag,response){
  if (group=="group1" || group=="group2"){
  var query = "SELECT COUNT(*) FROM news where news_group='"+group+"' and use_flag='"+useFlag+"'";
} else {
    var query = "SELECT COUNT(*) FROM news where use_flag='"+useFlag+"'";
}
//  connection.connect();
  var arr = {};
  var resultJson;
  connection.query(query, function(err,results)
  {
    if(!err)
    {
      arr["count"]=results[0]['COUNT(*)'];
      response.end( JSON.stringify(arr),"UTF-8");
    }
    else
    {
      console.log(err);
    }
  });
//  connection.end();
};


var findNewsByHead=function(headParam,response){
  var query = "SELECT * FROM news where head='"+headParam+"'";
console.log(query);
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
    newsAdd["news_group"]=results[i].news_group;
    arr.push(newsAdd);
    }
    console.log(arr);
    response.end(JSON.stringify(arr),"UTF-8");

  }
  else
  {
  console.log(err);
  }
});
//  connection.end();
};

/*Use this function!!!*/
var markAsOld=function(){
  var query = "SELECT * FROM news where use_flag=1";
  var emptyArray={};
  var arr = [];
  var idArray = [];
//  connection.connect();
  connection.query(query, function(err,results)
  {
    if(!err)
    {
      for(var i=0;i<results.length;i++){
      var date1 = results[i].news_date;
      var date2 = new Date();
      var daysOfNewsLive=(date2-date1)/(1000*60*60*24);
      if(daysOfNewsLive>7){
        idArray.push(results[i].id);
      }
      }

      for(var i=0;i<idArray.length;i++){
      markNewsAsUnused(idArray[i]);
      }
    }
    else
    {
    console.log(err);
    }
  });
}

function markNewsAsUnused(id){
  var query = "update news set use_flag='"+0+"' where id="+id;
  console.log(query);
//  connection.connect();
  connection.query(query, function(err,rows,fields)
  {
    if(err){
      console.log(err);
    }
  });
}

module.exports.markAsOld = markAsOld;
module.exports.findNewsByHead=findNewsByHead;
module.exports.addNews = addNews;
module.exports.editNews = editNews;
module.exports.deleteNews = deleteNews;
module.exports.getRowsNum = getRowsNum;
module.exports.getListOfNews = getListOfNews;
