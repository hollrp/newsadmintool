/*Array of data used by jqgrid*/
var mydata =[];

/*number of pages*/
var numberOfPages;

/*Logic for show used/unused and news get news of some category*/
if(getCookie("search_enabled")==1){
  find(getCookie("search_head"));
  setCookie("search_enabled",0,1);
} else {
  if(getCookie("news_group")==null || getCookie("news_group")=="all"){
    if(getCookie("news_actual")==null || getCookie("news_actual")==1){
      sendRequest("getAll","&from="+(null==getCookie("myc")?0:getCookie("myc"))+"&use_flag_param="+1);
    } else {
      sendRequest("getAll","&from="+(null==getCookie("myc")?0:getCookie("myc"))+"&use_flag_param="+0);
    }
  } else if(getCookie("news_group")=="group1"){
    if(getCookie("news_actual")==null || getCookie("news_actual")==1){
      sendRequest("getAll","&from="+(null==getCookie("myc")?0:getCookie("myc"))+"&group="+getCookie("news_group")+"&use_flag_param="+1);
    } else {
      sendRequest("getAll","&from="+(null==getCookie("myc")?0:getCookie("myc"))+"&group="+getCookie("news_group")+"&use_flag_param="+0);
    }
  }
  else if(getCookie("news_group")=="group2"){
    if(getCookie("news_actual")==null || getCookie("news_actual")==1){
      sendRequest("getAll","&from="+(null==getCookie("myc")?0:getCookie("myc"))+"&group="+getCookie("news_group")+"&use_flag_param="+1);
    } else {
      sendRequest("getAll","&from="+(null==getCookie("myc")?0:getCookie("myc"))+"&group="+getCookie("news_group")+"&use_flag_param="+0);
    }
  }
}


jQuery(document).ready(function () {

    /*Logic for showing number of avaible pages*/
    if(getCookie("news_group")==null || getCookie("news_group")=="all"){
      if(getCookie("news_actual")==null || getCookie("news_actual")==1){
        getNumberOfPages(getCookie("news_group")+"&use_flag_param="+1);
      } else {
        getNumberOfPages(getCookie("news_group")+"&use_flag_param="+0);
      }
    } else if(getCookie("news_group")=="group1"){
      if(getCookie("news_actual")==null || getCookie("news_actual")==1){
        getNumberOfPages(getCookie("news_group")+"&use_flag_param="+1);
      } else {
        getNumberOfPages(getCookie("news_group")+"&use_flag_param="+0);
      }
    } else if(getCookie("news_group")=="group2"){
      if(getCookie("news_actual")==null || getCookie("news_actual")==1){
        getNumberOfPages(getCookie("news_group")+"&use_flag_param="+1);
      } else {
        getNumberOfPages(getCookie("news_group")+"&use_flag_param="+0);
      }
    }

//if(getCookie("img")!=null){
//  getBase64Image();

//}


  /*Parse respunse from server*/
  mydata=JSON.parse(mydata);

  /*Initialize grid*/
  var grid = $("#grid");

  /*Jqgdid presentation*/
  grid.jqGrid({
      data: mydata,
      datatype: "local",
      height: 580,
    autowidth:true,
     shrinkToFit:false,
      colNames:['Id','Head','Body','Picture','Use flag','News date','Group'],
      colModel:[
          {name:'id',
                  index:'id',hidden:true,
                  key: true,
                  width:75,
                  sorttype: "int"
                },
          {name:'head',
                 index:'head',
                 width:200,
           frozen:true
                },
          {name:'body',
                 index:'body',
                 width:450
                },
          {name:'picture',
                 index:'picture',
                 width:150,formatter:imageFormat, unformat:imageUnFormat
                },
          {name:'use_flag',
                 index:'use_flag',
                 width:75
                },
          {name:'news_date',
                 index:'news_date',formatoptions: { newformat: "Y-m-d" }, formatter: "date",
                  width:100
                },
          {name:'news_group',
                 index:'news_group',
                  width:70
                }
                ],
      pager: '#pager',
      pgtext:"",
      pgbuttons:false,
      pginput:true,
      recordpos:"left",
      sortname: 'id',
      sortorder: "asc",
      altRows: true,
      headertitles: true,
      rowNum: 10,
      multiselect: true,
      caption:"News admin page",
      /*enables / disables edit fields*/
      onSelectRow: function (id) {
        var ids = grid.jqGrid('getGridParam','selarrrow');
        if(ids.length==1){

          document.getElementById("head_edit").disabled = false;
          document.getElementById("body_edit").disabled = false;
          document.getElementById("use_flag_edit").disabled = false;
          document.getElementById("news_date_edit").disabled = false;
          document.getElementById("news_group_edit").disabled = false;
          document.getElementById("news_edit_button").disabled = false;
          var ids = grid.jqGrid('getGridParam','selarrrow');
          if(ids.length==1){

          //  document.getElementById("myimage").setAttribute("src", grid.jqGrid('getCell', ids[0], 'picture'));
          document.getElementById("head_edit").value=grid.jqGrid('getCell', ids[0], 'head');
          document.getElementById("body_edit").value=grid.jqGrid('getCell', ids[0], 'body');
          document.getElementById("hid").value=grid.jqGrid('getCell', ids[0], 'picture');
          document.getElementById("use_flag_edit").value=grid.jqGrid('getCell', ids[0], 'use_flag');
          document.getElementById("news_date_edit").value=grid.jqGrid('getCell', ids[0], 'news_date');
          document.getElementById("news_group_edit").value=grid.jqGrid('getCell', ids[0], 'news_group');
          }
        } else {
        document.getElementById("head_edit").disabled = true;
          document.getElementById("body_edit").disabled = true;
          document.getElementById("use_flag_edit").disabled = true;
          document.getElementById("news_date_edit").disabled = true;
          document.getElementById("news_group_edit").disabled = true;
          document.getElementById("news_edit_button").disabled = true;
        }
      }
  });
  $("#news_add_button").click(function(){
    var imageFile = document.getElementById("image-file").files[0];
      var formatreader = new FileReader();
      formatreader.onloadend = function(e){
        var imageData = e.target.result;
        var addNewsArray = {};
        var pictureAdd = base64x_pre_encode(imageData);
        if(pictureAdd.length>75000){
          alert("Picture is too big!");
          return;
        }
        var headAdd =  document.getElementById("head_add").value;
        var bodyAdd =   document.getElementById("body_add").value;
        var flagAdd = document.getElementById("use_flag_add").value;
        var dateAdd = document.getElementById("news_date_add").value;
        var newsGroupAdd = document.getElementById("news_group_add").value;
        var pattern = /^[12][90][0-9][0-9]\-[01]?[0-9]\-[0-3]?[0-9]$/;
        if(!pattern.test(dateAdd)){
          alert("Invalid format of date! It must be yyyy-mm-dd");
          return;
        }
        if(headAdd.length>99){
          alert("Head value is too long!");
          return;
        }

        if(newsGroupAdd.length>99){
          alert("News group value is too long!");
          return;
        }

        if(flagAdd!=1 && flagAdd!=0){
          alert("Invalid use flag!");
          return;
        }
        if(headAdd.length ==0 || newsGroupAdd.length ==0 || flagAdd.length ==0 || bodyAdd.length ==0 || newsGroupAdd.length ==0){
          alert("One or some of your fields is empty!");
          return;
        }
        if(newsGroupAdd!="group1" && newsGroupAdd!="group2"){
          alert("Invalid group name. It must be either group1 or group2!");
          return;
        }
        addNewsArray["head"] = headAdd;
        addNewsArray["body"] = bodyAdd;
        addNewsArray["picture"] = pictureAdd;
        addNewsArray["use_flag"] = flagAdd;
        addNewsArray["news_date"] = dateAdd;
        addNewsArray["news_group"] = newsGroupAdd;


        sendRequest("add","&text0="+JSON.stringify(addNewsArray));
        location.reload();
      }
  formatreader.readAsDataURL(imageFile);
  });
  $("#news_edit_button").click(function(){
    var imageFile = document.getElementById("image-file-edit").files[0];
    if(imageFile!=null){
      var formatreader = new FileReader();
      formatreader.onloadend = function(e){
        var imageData = e.target.result;
        var pictureEdit = base64x_pre_encode(imageData);
        if(pictureEdit.length>75000){
          alert("Picture is too big!");
          return;
        }
        var editNewsArray = {};

          editNewsArray["picture"] =  pictureEdit;



        var headEdit = document.getElementById("head_edit").value;
        var bodyEdit = document.getElementById("body_edit").value;
        var useFlagEdit = document.getElementById("use_flag_edit").value;
        var newsDateEdit = document.getElementById("news_date_edit").value;
        var newsGroupEdit = document.getElementById("news_group_edit").value;
        var pattern = /^[12][90][0-9][0-9]\-[01]?[0-9]\-[0-3]?[0-9]$/;
        if(!pattern.test(newsDateEdit)){
          alert("Invalid format of date! It must be yyyy-mm-dd");
          return;
        }
        if(headEdit.length>99){
          alert("Head value is too long!");
          return;
        }
        if(useFlagEdit.length>99){
          alert("News group value is too long!");
          return;
        }
        if(useFlagEdit!=1 && useFlagEdit!=0){
          alert("Invalid use flag!");
          return;
        }

        if(headEdit.length ==0 || newsGroupEdit.length ==0 || useFlagEdit.length ==0 || bodyEdit.length ==0){
          alert("One or some of your fields is empty!");
          return;
        }
        if(newsGroupEdit!="group1" && newsGroupEdit!="group2"){
          alert("Invalid group name. It must be either group1 or group2!");
          return;
        }


        editNewsArray["head"] = headEdit;
        editNewsArray["body"] = bodyEdit;
        editNewsArray["use_flag"] = useFlagEdit;
        editNewsArray["news_date"] = newsDateEdit;
        editNewsArray["news_group"] = newsGroupEdit;
        var ids = grid.jqGrid('getGridParam','selarrrow');
        editNewsArray["id"] = grid.jqGrid('getCell', ids[0], 'id');
        sendRequest("edit","&text0="+JSON.stringify(editNewsArray));
        location.reload();

      }
      formatreader.readAsDataURL(imageFile);
    } else {
        var editNewsArray = {};
        editNewsArray["picture"] =base64x_pre_encode(document.getElementById("hid").value);
        var headEdit = document.getElementById("head_edit").value;
        var bodyEdit = document.getElementById("body_edit").value;
        var useFlagEdit = document.getElementById("use_flag_edit").value;
        var newsDateEdit = document.getElementById("news_date_edit").value;
        var newsGroupEdit = document.getElementById("news_group_edit").value;
        var pattern = /^[12][90][0-9][0-9]\-[01]?[0-9]\-[0-3]?[0-9]$/;
        if(!pattern.test(newsDateEdit)){
          alert("Invalid format of date! It must be yyyy-mm-dd");
          return;
        }
        if(headEdit.length>99){
          alert("Head value is too long!");
          return;
        }
        if(useFlagEdit.length>99){
          alert("News group value is too long!");
          return;
        }
        if(useFlagEdit!=1 && useFlagEdit!=0){
          alert("Invalid use flag!");
          return;
        }

        if(headEdit.length ==0 || newsGroupEdit.length ==0 || useFlagEdit.length ==0 || bodyEdit.length ==0){
          alert("One or some of your fields is empty!");
          return;
        }
        if(newsGroupEdit!="group1" && newsGroupEdit!="group2"){
          alert("Invalid group name. It must be either group1 or group2!");
          return;
        }
        editNewsArray["head"] = headEdit;
        editNewsArray["body"] = bodyEdit;
        editNewsArray["use_flag"] = useFlagEdit;
        editNewsArray["news_date"] = newsDateEdit;
        editNewsArray["news_group"] = newsGroupEdit;
        var ids = grid.jqGrid('getGridParam','selarrrow');
        editNewsArray["id"] = grid.jqGrid('getCell', ids[0], 'id');
        sendRequest("edit","&text0="+JSON.stringify(editNewsArray));
        location.reload();
    }

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
  $("#page_input_button").click(function(){
      var pageNum = document.getElementById("page_input").value-1;
      if(pageNum<0 || pageNum>=numberOfPages){
        alert("Invalid page number! It must be greater than 0 and less than "+numberOfPages);
        return;
      }
      sendRequest("getAll","&from="+pageNum*10);
      setCookie("myc",pageNum*10,1);
      location.reload();
  });
  $("#search_button").click(function(){
    var searchHead = document.getElementById("search_input").value;
    setCookie("search_enabled",1,1);
    setCookie("search_head",searchHead,1);
    location.reload();
  });
  $("#group1_button").click(function(){
    setCookie("news_group","group1",1);
    location.reload();
  });
  $("#group2_button").click(function(){
    setCookie("news_group","group2",1);
    location.reload();
  });
  $("#all_button").click(function(){
    setCookie("news_group","all",1);
    location.reload();
  });
  $("#actual_button").click(function(){
    setCookie("news_actual",1,1);
    location.reload();
  });
  $("#not_actual_button").click(function(){
    setCookie("news_actual",0,1);
    location.reload();
  });
});




/*Loads XMLHttpRequest object*/
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

/*Sends request with some params*/
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

/*Sets cookie*/
function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

/*Gets cookie by name*/
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];

        while (c.charAt(0)==' ') c = c.substring(1,c.length);

        if (c.indexOf(nameEQ) == 0){
          return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

/*Gets number of records in db by some params*/
function getNumberOfPages(group){
  //document.querySelector('#page_number').innerHTML = '43';
  var xmlhttp = getXmlHttp();
  xmlhttp.open("POST", "http://localhost:3000?command=getRowsNum&group="+group,false);
  xmlhttp.onreadystatechange = function() {
  var  numberOfRecords = JSON.parse(xmlhttp.responseText).count;
  numberOfPages = Math.ceil(numberOfRecords/10);
  document.querySelector('#page_number').innerHTML = numberOfPages;
  document.querySelector('#records_number').innerHTML = numberOfRecords;
  };
  xmlhttp.send("sadasdsa");
  xmlhttp.abort();
}

/*Finds record in db by head parameter*/
function find(headParam)
{
  var xmlhttp = getXmlHttp();
  xmlhttp.open("POST", "http://localhost:3000?command=find&head_param="+headParam,false);
  xmlhttp.setRequestHeader("Content-type: text/html; charset=utf-8");
  xmlhttp.onreadystatechange = function() {
    /*document.querySelector('#status').innerHTML = xmlhttp.responseText;*/
    mydata = xmlhttp.responseText;
  };
  xmlhttp.send("sadasdsa");
  xmlhttp.abort();
}

/*var p;var canvas = document.createElement("canvas");
var img1;


function getBase64Image(path){

    var pp=path;
img1=document.getElementById("img");
img.crossOrigin = '';
    canvas.width = img1.width;
    canvas.height = img1.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img1, 0, 0);
    var dataURL = canvas.toDataURL("image/bmp");
    //document.getElementById("myimage").setAttribute("src",dataURL);
    return dataURL;
}

function previewFile() {

}*/
function imageFormat( cellvalue, options, rowObject ){
 return '<img src="'+base64x_pre_decode(cellvalue)+'" />';
}
function dateFormat(cellvalue, options, rowObject ){
  var now = new Date();
  now.parse('yyyy-mm-dd');
return now;
}

function dateUnformat(cellvalue, options, rowObject){
  return cellvalue;
}

function imageUnFormat( cellvalue, options, cell){
	return $('img', cell).attr('src');
}
