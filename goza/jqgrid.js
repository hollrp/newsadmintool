var mydata =[];
sendRequest("getAll","");







jQuery(document).ready(function () {
  mydata=JSON.parse(mydata);

    var grid = $("#grid");
  grid.jqGrid({
      data: mydata,
      datatype: "local",
      // url: "data.json",
      // datatype: "json",
      height: 500,
      width: 500,
      colNames:['Id','Head','Body','Picture','Use flag','News date'],
      colModel:[
          {name:'id',
                  index:'id',hidden:true,
                  key: true,
                  width:50,
                  sorttype: "int"
                },
          {name:'head',
                 index:'head',
                 width:'20%',
           frozen:true
                },
          {name:'body',
                 index:'body',
                 width:'60%'
                },
          {name:'picture',
                 index:'picture',
                 width:'5%'
                },
          {name:'use_flag',
                 index:'use_flag',
                 width:'5%'
                },
          {name:'news_date',
                 index:'news_date',
                  width:'10%'
                }
                ],
      pager: '#pager',
      sortname: 'id',
      sortorder: "asc",
      altRows: true,
      headertitles: true,
      rowNum: 10,
      multiselect: true,
      caption:"News admin page",
      onSelectRow: function (id) {
        var ids = grid.jqGrid('getGridParam','selarrrow');
        if(ids.length==1){
          document.getElementById("head_edit").disabled = false;
          document.getElementById("body_edit").disabled = false;
          document.getElementById("picture_edit").disabled = false;
          document.getElementById("use_flag_edit").disabled = false;
          document.getElementById("news_date_edit").disabled = false;
          document.getElementById("news_edit_button").disabled = false;
          var ids = grid.jqGrid('getGridParam','selarrrow');
          if(ids.length==1){
          document.getElementById("head_edit").value=grid.jqGrid('getCell', ids[0], 'head');
          document.getElementById("body_edit").value=grid.jqGrid('getCell', ids[0], 'body');
          document.getElementById("picture_edit").value=grid.jqGrid('getCell', ids[0], 'picture');
          document.getElementById("use_flag_edit").value=grid.jqGrid('getCell', ids[0], 'use_flag');
          document.getElementById("news_date_edit").value=grid.jqGrid('getCell', ids[0], 'news_date');
          }
        } else {
        document.getElementById("head_edit").disabled = true;
          document.getElementById("body_edit").disabled = true;
          document.getElementById("picture_edit").disabled = true;
          document.getElementById("use_flag_edit").disabled = true;
          document.getElementById("news_date_edit").disabled = true;
          document.getElementById("news_edit_button").disabled = true;
        }


                //  curRowId = id;
                //  alert("test: " + curRowId);
              }
  });
  $("#news_add_button").click(function(){
    var addNewsArray = {};
    addNewsArray["head"] = document.getElementById("head_add").value;
    addNewsArray["body"] = document.getElementById("body_add").value;
    addNewsArray["picture"] = document.getElementById("picture_add").value;
    addNewsArray["use_flag"] = document.getElementById("use_flag_add").value;
    addNewsArray["news_date"] = document.getElementById("news_date_add").value;
    sendRequest("add","&text0="+JSON.stringify(addNewsArray));
    location.reload();
  });
  $("#news_edit_button").click(function(){
    var editNewsArray = {};
    editNewsArray["head"] = document.getElementById("head_edit").value;
    editNewsArray["body"] = document.getElementById("body_edit").value;
    editNewsArray["picture"] = document.getElementById("picture_edit").value;
    editNewsArray["use_flag"] = document.getElementById("use_flag_edit").value;
    editNewsArray["news_date"] = document.getElementById("news_date_edit").value;
    var ids = grid.jqGrid('getGridParam','selarrrow');
    editNewsArray["id"] = grid.jqGrid('getCell', ids[0], 'id');
  sendRequest("edit","&text0="+JSON.stringify(editNewsArray));
    location.reload();


  });
  $("#news_delete_button").click(function(){
    var ids = grid.jqGrid('getGridParam','selarrrow');
    if(ids.length == 0){
      alert("You must choose news to delete!");
      return;
    }

    for(var i = 0; i<ids.length; i++){
      sendRequest("delete","&id="+grid.jqGrid('getCell', ids[i], 'id'));
    }
    location.reload();
  });
});





function getXmlHttp(){
	var xmlhttp;
	if (window.XMLHttpRequest)
  	{
  		xmlhttp=new XMLHttpRequest();
  	}
	else
	{
  		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	return xmlhttp;
}


function sendRequest(command,postfix)
{
	var xmlhttp = getXmlHttp();
	xmlhttp.open("POST", "http://localhost:3000?command="+command+postfix,false);
	xmlhttp.onreadystatechange = function() {
		/*document.querySelector('#status').innerHTML = xmlhttp.responseText;*/
		mydata = xmlhttp.responseText;
	};
	xmlhttp.send("sadasdsa");
	xmlhttp.abort();
}
