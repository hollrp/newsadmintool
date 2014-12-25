var express = require('express')
var dao = require('./DAO')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());

var site = "";
app.post('/', function (req, res) {
console.log("Params = ",req.param('text0'))
console.log("Body = ",req.body);
console.log("command = ",req.param('command'));
switch(req.param('command'))

{



case "add" :
	dao.addNews(req.param('text0'),res)
	break
case "delete" :
	dao.deleteNews(req.param('id'),res)
	break
case "edit" :
	dao.editNews(req.param('text0'),res)
	break
case "getAll" :
	dao.getListOfNews(req.param('from'),req.param('group'),req.param('use_flag_param'),res)
	break
case "getRowsNum" :
	dao.getRowsNum(req.param('group'),req.param('use_flag_param'),res)
	break
case "find" :
	dao.findNewsByHead(req.param('head_param'),res)
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

var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 0;

var mark = schedule.scheduleJob(rule, function(){
	dao.markAsOld();
    console.log('All old news marks old');
});

  console.log('Example app listening at http://%s:%s', host, port)

})
