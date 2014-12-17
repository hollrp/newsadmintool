var express = require('express')
var dao = require('./DAO')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var site = "";
app.post('/', function (req, res) {
console.log("Params = ",req.param('text0'))
console.log("Body = ",req.body);

switch(req.param('command'))

{



case "add" :
	dao.addNews(req.param('text0'),res)
	break
case "delete" :
	dao.deleteNews(req.param('id'),res)
	break
case "edit" :
	dao.editNews(req.body,res)
	break
case "getAll" :
	dao.getListOfNews(res)
	break
case "getById" :
	dao.getNewsById(req.param('id'),res)
	break

	default:
	alert('������������ ������')
}


})



		app.get('/', function (req, res) {
		site = "������ ���� ��������!!!!!!";
		res.write(site);
		res.end()

})



var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port



  console.log('Example app listening at http://%s:%s', host, port)

})
