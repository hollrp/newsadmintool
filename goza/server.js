var express = require('express')
var dao = require('DAO')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var site = "";
app.post('/', function (req, res) {
console.log("Params = ",req.param('text0'))
console.log("Body = ",req.body);

switch(req.param('command'))

{

var dataResponse;

case "add" :
	dataResponse = dao.addNews(req.body)
	break
case "delete" :
	dataResponse = dao.deleteNews(req.param('id'))
	break
case "edit" :
	dataResponse = dao.editNews(req.body)
	break
case "getAll" :
	dataResponse = dao.getListOfNews()
	break
case "getById" :
	dataResponse = dao.getNewsById(req.param('id'))
	break

	default:
	alert('Неправильный запрос')
}


}
  res.write(dataResponse);
})



		app.get('/', function (req, res) {
		site = "пишите сюда страницу!!!!!!";
		res.write(site);
		res.end()
		
})	
	
  

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port
  

  
  console.log('Example app listening at http://%s:%s', host, port)
 
})