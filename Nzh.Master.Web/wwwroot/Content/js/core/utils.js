/**
* 模块名：共通脚本
* 程序名: 通用工具函数

**/

var utils = {};
 
/**
* 格式化字符串
* 用法:
.formatString("{0}-{1}","a","b");
*/
utils.formatString = function () {
    for (var i = 1; i < arguments.length; i++) {
        var exp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        arguments[0] = arguments[0].replace(exp, arguments[i]);
    }
    return arguments[0];
};

/**
* 格式化时间显示方式
* 用法:format="yyyy-MM-dd HH:mm:ss";
*/
utils.formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
     * 时间格式化 返回格式化的时间
     * @param date {object}  可选参数，要格式化的data对象，没有则为当前时间
     * @param fomat {string} 格式化字符串，例如：'YYYY年MM月DD日 hh时mm分ss秒 星期' 'YYYY/MM/DD week' (中文为星期，英文为week)
     * @return {string} 返回格式化的字符串
     * 
     * 例子:
     * formatDate(new Date("january 01,2012"));
     * formatDate(new Date());
     * formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD week');
     * formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY/MM/DD week');
     * 
     * 格式：   
     *    YYYY：4位年,如1993
　　 *　　YY：2位年,如93
　　 *　　MM：月份
　　 *　　DD：日期
　　 *　　hh：小时
　　 *　　mm：分钟
　　 *　　ss：秒钟
　　 *　　星期：星期，返回如 星期二
　　 *　　周：返回如 周二
　　 *　　week：英文星期全称，返回如 Saturday
　　 *　　www：三位英文星期，返回如 Sat
     */
utils.formatDateTime = function (date, format) {
    if (arguments.length < 2 && !date.getTime) {
        format = date;
        date = new Date();
    }
    typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
    return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function (a) {
        switch (a) {
            case "YYYY": return date.getFullYear();
            case "YY": return (date.getFullYear() + "").slice(2);
            case "MM": return date.getMonth() + 1;
            case "DD": return date.getDate();
            case "hh": return date.getHours();
            case "mm": return date.getMinutes();
            case "ss": return date.getSeconds();
            case "星期": return "星期" + week[date.getDay() + 7];
            case "周": return "周" + week[date.getDay() + 7];
            case "week": return week[date.getDay()];
            case "www": return week[date.getDay()].slice(0, 3);
        }
    });
}

utils.DateAdd = function (interval, number, date) {
    //確保為date類型:  
    date = utils.convertToDate(date);
    switch (interval.toLowerCase()) {
        case "y": return utils.formatDateTime(new Date(date.setFullYear(date.getFullYear() + number)),"YYYY-MM-DD hh:mm:ss");
        case "m": return utils.formatDateTime(new Date(date.setMonth(date.getMonth() + number)),"YYYY-MM-DD hh:mm:ss");
        case "d": return utils.formatDateTime(new Date(date.setDate(date.getDate() + number)),"YYYY-MM-DD hh:mm:ss");
        case "w": return utils.formatDateTime(new Date(date.setDate(date.getDate() + 7 * number)),"YYYY-MM-DD hh:mm:ss");
        case "h": return utils.formatDateTime(new Date(date.setHours(date.getHours() + number)),"YYYY-MM-DD hh:mm:ss");
        case "n": return utils.formatDateTime(new Date(date.setMinutes(date.getMinutes() + number)),"YYYY-MM-DD hh:mm:ss");
        case "s": return utils.formatDateTime(new Date(date.setSeconds(date.getSeconds() + number)),"YYYY-MM-DD hh:mm:ss");
        case "l": return utils.formatDateTime(new Date(date.setMilliseconds(date.getMilliseconds() + number)), "YYYY-MM-DD hh:mm:ss");
    }
};

//將日期類型格式的字符串轉化為日期類型:  
utils.convertToDate = function (expr) {
    if (typeof expr == 'string') {
        expr = expr.replaceAll('-', '/');//將字符中的-替換為/,原因是IE或其它瀏覽器不支持-符號的Date.parse()  
        return new Date(Date.parse(expr));
    } else {
        return expr;
    }
};

String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

Date.prototype.add = function (milliseconds) {
    var m = this.getTime() + milliseconds;
    return new Date(m);
};
Date.prototype.addSeconds = function (second) {
    return this.add(second * 1000);
};
Date.prototype.addMinutes = function (minute) {
    return this.addSeconds(minute * 60);
};
Date.prototype.addHours = function (hour) {
    return this.addMinutes(60 * hour);
};

Date.prototype.addDays = function (day) {
    return this.addHours(day * 24);
};

Date.isLeepYear = function (year) {
    return (year % 4 == 0 && year % 100 != 0)
};

Date.daysInMonth = function (year, month) {
    if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0)
            return 29;
        else
            return 28;
    }
    else if ((month <= 7 && month % 2 == 1) || (month > 7 && month % 2 == 0))
        return 31;
    else
        return 30;
};

Date.prototype.addMonth = function () {
    var m = this.getMonth();
    if (m == 11) return new Date(this.getFullYear() + 1, 1, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());

    var daysInNextMonth = Date.daysInMonth(this.getFullYear(), this.getMonth() + 1);
    var day = this.getDate();
    if (day > daysInNextMonth) {
        day = daysInNextMonth;
    }
    return new Date(this.getFullYear(), this.getMonth() + 1, day, this.getHours(), this.getMinutes(), this.getSeconds());
};

Date.prototype.subMonth = function () {
    var m = this.getMonth();
    if (m == 0) return new Date(this.getFullYear() - 1, 12, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
    var day = this.getDate();
    var daysInPreviousMonth = Date.daysInMonth(this.getFullYear(), this.getMonth());
    if (day > daysInPreviousMonth) {
        day = daysInPreviousMonth;
    }
    return new Date(this.getFullYear(), this.getMonth() - 1, day, this.getHours(), this.getMinutes(), this.getSeconds());
};

Date.prototype.addMonths = function (addMonth) {
    var result = false;
    if (addMonth > 0) {
        while (addMonth > 0) {
            result = this.addMonth();
            addMonth--;
        }
    } else if (addMonth < 0) {
        while (addMonth < 0) {
            result = this.subMonth();
            addMonth++;
        }
    } else {
        result = this;
    }
    return result;
};

Date.prototype.addYears = function (year) {
    return new Date(this.getFullYear() + year, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
};
/* 
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* 返回精度为：秒，分，小时，天
*/

utils.GetDateDiff = function (startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime); //开始时间
    var eTime = new Date(endTime); //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}


/**  
* 格式化数字显示方式   
* 用法  
* formatNumber(12345.999,'#,##0.00');  
* formatNumber(12345.999,'#,##0.##');  
* formatNumber(123,'000000');
*/
utils.formatNumber = function (v, pattern) {
    if (v == null)
        return v;
    var strarr = v ? v.toString().split('.') : ['0'];
    var fmtarr = pattern ? pattern.split('.') : [''];
    var retstr = '';
    // 整数部分   
    var str = strarr[0];
    var fmt = fmtarr[0];
    var i = str.length - 1;
    var comma = false;
    for (var f = fmt.length - 1; f >= 0; f--) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                break;
            case '0':
                if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                else retstr = '0' + retstr;
                break;
            case ',':
                comma = true;
                retstr = ',' + retstr;
                break;
        }
    }
    if (i >= 0) {
        if (comma) {
            var l = str.length;
            for (; i >= 0; i--) {
                retstr = str.substr(i, 1) + retstr;
                if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
            }
        }
        else retstr = str.substr(0, i + 1) + retstr;
    }
    retstr = retstr + '.';
    // 处理小数部分   
    str = strarr.length > 1 ? strarr[1] : '';
    fmt = fmtarr.length > 1 ? fmtarr[1] : '';
    i = 0;
    for (var f = 0; f < fmt.length; f++) {
        switch (fmt.substr(f, 1)) {
            case '#':
                if (i < str.length) retstr += str.substr(i++, 1);
                break;
            case '0':
                if (i < str.length) retstr += str.substr(i++, 1);
                else retstr += '0';
                break;
        }
    }
    return retstr.replace(/^,+/, '').replace(/\.$/, '');
};
 
/** 
* json格式转树状结构 
* @param   {json}      json数据 
* @param   {String}    id的字符串 
* @param   {String}    父id的字符串 
* @param   {String}    children的字符串 
* @return  {Array}     数组 
*/
utils.toTreeData = function (a, idStr, pidStr, childrenStr) {
    var r = [], hash = {},len = (a||[]).length;
    for (var i=0; i < len; i++) {
        hash[a[i][idStr]] = a[i];
    }
    for (var j=0; j < len; j++) {
        var aVal = a[j], hashVP = hash[aVal[pidStr]];
        if (hashVP) {
            !hashVP[childrenStr] && (hashVP[childrenStr] = []);
            hashVP[childrenStr].push(aVal);
        } else {
            r.push(aVal);
        }
    }
    return r;
};
 
utils.eachTreeRow = function(treeData,eachHandler) {
    for (var i in treeData) {
        if (eachHandler(treeData[i]) == false) break;
        if (treeData[i].children)
            utils.eachTreeRow(treeData[i].children, eachHandler);
    }
};

utils.isInChild = function (treeData,pid,id) {
    var isChild = false;
    utils.eachTreeRow(treeData, function (curNode) {
        if (curNode.id == pid) {
            utils.eachTreeRow([curNode], function (row) {
                if (row.id == id) {
                    isChild = true;
                    return false;
                }
            });
            return false;
        }
    });
    return isChild;
};
 
utils.fnValueToText = function (list, value, text) {
    var map = {};
    for (var i in list) {
        map[list[i][value || 'value']] = list[i][text || 'text'];
    }
    var fnConvert = function (v, r) {
        return map[v];
    };
    return fnConvert;
};

utils.compareObject = function (v1, v2) {
    var countProps = function (obj) {
        var count = 0;
        for (k in obj) if (obj.hasOwnProperty(k)) count++;
        return count;
    };

    if (typeof (v1) !== typeof (v2)) {
        return false;
    }

    if (typeof (v1) === "function") {
        return v1.toString() === v2.toString();
    }

    if (v1 instanceof Object && v2 instanceof Object) {
        if (countProps(v1) !== countProps(v2)) {
            return false;
        }
        var r = true;
        for (k in v1) {
            r = utils.compareObject(v1[k], v2[k]);
            if (!r) {
                return false;
            }
        }
        return true;
    } else {
        return v1 === v2;
    }
};

utils.minusArray = function (arr1, arr2) {
    var arr = [];
    for (var i in arr1) {
        var b = true;
        for (var j in arr2) {
            if (utils.compareObject(arr1[i],arr2[j])) {
                b = false;
                break;
            }
        }
        if (b) {
            arr.push(arr1[i]);
        }
    }
    return arr;
};

utils.diffrence = function (obj1, obj2, reserve,ignore) {
    var obj = {}, reserve = reserve || [], ignore = ignore || [], reserveMap = {}, ignoreMap = {};
    for (var i in reserve)
        reserveMap[reserve[i]] = true;

    for (var i in ignore)
        ignoreMap[ignore[i]] = true;

    for (var k in obj1) {
        if (!ignoreMap[k] && (obj1[k] != obj2[k] || reserveMap[k])) {
            obj[k] = obj1[k];
        }
    }
    return obj;
};

utils.filterProperties = function (obj, props, ignore) {
    var ret;
    if (obj instanceof Array || Object.prototype.toString.call(obj) === "[object Array]") {
        ret = [];
        for (var k in obj) {
            ret.push(utils.filterProperties(obj[k], props, ignore));
        }
    }
    else if (typeof obj === 'object') {
        ret = {};
        if (ignore) {
            var map = {};
            for (var k in props)
                map[props[k]] = true;

            for (var i in obj) {
                if (!map[i]) ret[i] = obj[i];
            }
        }
        else {
            for (var i in props) {
                var arr = props[i].split(" as ");
                ret[arr[1] || arr[0]] = obj[arr[0]];
            }
        }
    }
    else {
        ret = obj;
    }
    return ret;
};


utils.copyProperty = function (obj, sourcePropertyName, newPropertyName, overWrite) {
    if (obj instanceof Array || Object.prototype.toString.call(obj) === "[object Array]") {
        for (var k in obj) 
            utils.copyProperty(obj[k], sourcePropertyName, newPropertyName);
    }
    else if (typeof obj === 'object') {
        if (sourcePropertyName instanceof Array || Object.prototype.toString.call(sourcePropertyName) === "[object Array]") {
            for (var i in sourcePropertyName) {
                utils.copyProperty(obj, sourcePropertyName[i], newPropertyName[i]);
            }
        }
        else if (typeof sourcePropertyName === 'string') {
            if ((obj[newPropertyName] && overWrite) || (!obj[newPropertyName]))
                obj[newPropertyName] = obj[sourcePropertyName];
        }
    }
    return obj;
};

utils.clearIframe = function (context) {
    var frame = $('iframe', context).add(parent.$('iframe', context));
    if (frame.length > 0) {
        frame[0].contentWindow.document.write('');
        frame[0].contentWindow.close();
        frame.remove();
        if ($.browser.msie) {
            CollectGarbage();
        }
    }
};

utils.getThisIframe = function () {
    if (!parent) return null;
    var iframes = parent.document.getElementsByTagName('iframe');
    if (iframes.length == 0) return null;
    for (var i = 0; i < iframes.length; ++i) {
        var iframe = iframes[i];
        if (iframe.contentWindow === self) {
            return iframe;
        }
    }
    return null;
}

utils.functionComment = function(fn){
    return fn.toString().replace(/^.*\r?\n?.*\/\*|\*\/([.\r\n]*).+?$/gm,'');
};

utils.uuid = (function () { var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""); return function (b, f) { var h = a, e = [], d = Math.random; f = f || h.length; if (b) { for (var c = 0; c < b; c++) { e[c] = h[0 | d() * f]; } } else { var g; e[8] = e[13] = e[18] = e[23] = "-"; e[14] = "4"; for (var c = 0; c < 36; c++) { if (!e[c]) { g = 0 | d() * 16; e[c] = h[(c == 19) ? (g & 3) | 8 : g & 15]; } } } return e.join("").toLowerCase(); }; })();

utils.getRequest = function (name, url) {
    var url = url|| window.location.href;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.split("?")[1];
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest[name];
};

utils.getQueryString = function (key) {
    var search = location.search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("="); if (ar[0] == key) { return ar[1]; }
    }
    return "";
}

String.prototype.IsPicture = function () {
    //判断是否是图片 - strFilter必须是小写列举
    var strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic|"
    if (this.indexOf(".") > -1) {
        var p = this.lastIndexOf(".");
        //alert(p);
        //alert(this.length);
        var strPostfix = this.substring(p, this.length) + '|';
        strPostfix = strPostfix.toLowerCase();
        //alert(strPostfix);
        if (strFilter.indexOf(strPostfix) > -1) {
            //alert("True");
            return true;
        }
    }
    //alert('False');
    return false;
}