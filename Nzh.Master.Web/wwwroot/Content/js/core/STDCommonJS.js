//数据绑定对象
function ZTEBindData(){
    var viewModel = {};
	
	//数据绑定方法，参数为JSON对象
	this.BindData = function(modelObj){
	    if (modelObj) {
			for (var item in modelObj) {
				viewModel[item] = ko.observable(modelObj[item]);
			}
			ko.applyBindings(viewModel);
		}
	};
	
	//绑定完毕之后的结果，JSON对象形式
	this.JsonResult = function(){
	    var jsonData = ko.toJS(viewModel);
		return jsonData;
	};
	
	//绑定完毕之后的结果，ViewModel对象形式
	this.ViewModel = function(){
	    return viewModel;
	};
}

//
function ZTESetData(){
    var viewModel = {};

	//从URL获得值，绑定到页面上
    this.BindDataFromUrl = function(){
	    var zteUrl = new ZTEUrl();
	    var url = location.href; 
	    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
		for (i=0; j=paraString[i]; i++){
		    var parName = paraString[i].substring(0, paraString[i].indexOf("="));
		    viewModel[parName] = ko.observable(zteUrl.GetQueryString(parName));
        }
		ko.applyBindings(viewModel);
	};
	
	//绑定完毕之后的结果，JSON对象形式
	this.JsonResult = function(){
	    var jsonData = ko.toJS(viewModel);
		return jsonData;
	};
	
	//绑定完毕之后的结果，ViewModel对象形式
	this.ViewModel = function(){
	    return viewModel;
	};
}

function ZTEUrl(){
    //从给定的URL中获得给定参数名的值
    this.GetQueryString = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg);
		if(r!=null){
			return  unescape(r[2]);
		}
		else{
			return null;
		}
	};
	
	//将URL中的值转成JSON对象形式
	this.Url2Json = function(){
	    var url = window.location.href;
		//获取？字符位置
		var index = url.indexOf('?');
		//截取url参数部分
		url = url.substr(index+1); 
		var arr = new Array();
		//将各参数分离
		arr = url.split('&'); 

		var str = '{';
		 //将参数数组部分转换为JSON数据
		for(var i=0;i<arr.length;i++){
			var index1 = arr[i].indexOf('=');
			//判断最后一个参数是否有值
			if(index1 == -1){
				str+=',"'+arr[i]+'":""';
				continue;
			}
			var key = arr[i].substr(0,index1);
			var val = arr[i].substr(index1+1);
			var str1= ',';
			if(i==0){
				str1 = '';
			}
			str+=str1+'\"'+key+'\":'+'\"'+val+'\"';
		}
	    return JSON.parse(str+'}');
	};
	
	//将JSON中的值转成URL形式
	this.Json2Url = function(param, key){
		var paramStr = ""; 
		if(param instanceof String || param instanceof Number || param instanceof Boolean){  
			paramStr += "&" + key + "=" + encodeURIComponent(param); 
		}
		else{
			$.each(param,function(i){ 
				var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i); 
				var temp = new ZTEUrl();
				paramStr += '&'+ temp.Json2Url(this, k);  
			});
		}
		return paramStr.substr(1);  
	};
}

//获得给定的ligerGrid的也行数
function GetPageSize(grid) {
    if (grid) {
        return $(".l-bar-selectpagesize select", grid.toolbar).val() - 0;
    } else {
        return 10;
    }
}

//获得给定的ligerGrid的也页码
function GetPageIndex(grid) {
    if (grid) {
        return $('.pcontrol input', grid.toolbar).val() - 0;
    } else {
        return 1;
    }
}

//从当前页面的URL中获得指定name参数的值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//获得一个GUID
function GetGuid() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
            guid += "-";
        }
    }
    return guid;
}

//JS页面跳转
function Redirect(url) {
    window.location.href = url;
}



/******************************uditor控件html内容的标签脚本编译与反编译处理*************************************************/
//html标签的dom脚本进行编译
this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
this.encodeHtml = function (s) {
    return (typeof s != "string") ? s :
    s.replace(this.REGX_HTML_ENCODE,
    function ($0) {
        //var c = $0.charCodeAt(0), r = ["&#"];
        var c = $0.charCodeAt(0), r = ["@#"];
        c = (c == 0x20) ? 0xA0 : c;
        r.push(c); r.push(";");
        return r.join("");
    });
};

//维护反编译码表
this.HTML_DECODE = {
    // Add more
    "@#38;": "&",
    "@#60;": "<",
    "@62;": ">",
    "@#34;": "\"",
    "@#160;": " "
};

//html标签的dom脚本编译结果进行反编译处理
//this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
this.REGX_HTML_DECODE = /@\w+;|@#(\d+);/g;
this.decodeHtml = function (s) {
    return (typeof s != "string") ? s :
    s.replace(this.REGX_HTML_DECODE,
    function ($0, $1) {
        var c = this.HTML_DECODE[$0]; // 尝试查表
        if (c === undefined) {
            // Maybe is Entity Number
            if (!isNaN($1)) {
                c = String.fromCharCode(($1 == 160) ? 32 : $1);
            } else {
                // Not Entity Number
                c = $0;
            }
        }
        return c;
    });
};

//反编译时去空格
this.trim = function (s) {
    s = (s != undefined) ? s : this.toString();
    return (typeof s != "string") ? s :
    s.replace(this.REGX_TRIM, "");
};
//查找反编译维护表是否存在该编码
this.hashCode = function () {
    var hash = this.__hash__, _char;
    if (hash == undefined || hash == 0) {
        hash = 0;
        for (var i = 0, len = this.length; i < len; i++) {
            _char = this.charCodeAt(i);
            hash = 31 * hash + _char;
            hash = hash & hash; // Convert to 32bit integer
        }
        hash = hash & 0x7fffffff;
    }
    this.__hash__ = hash;
    return this.__hash__;
};



//js日期格式转换
function formatTen(num) {
    return num > 9 ? num : "0" + num;
}
//日期格式化处理
function formatDate(value) {
    //var year = value.getFullYear();
    //var month = value.getMonth() + 1;
    //var date = value.getDate();
    //return year + "-" + formatTen(month) + "-" + formatTen(date);
    return value.split('T')[0];
}
